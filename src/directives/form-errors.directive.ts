import {
	ComponentFactory,
	ComponentFactoryResolver,
	ComponentRef,
	Directive,
	Inject,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Optional,
	SimpleChanges,
	TemplateRef,
	Type,
	ViewContainerRef
} from "@angular/core";
import { AbstractControl, FormGroupDirective, ValidationErrors } from "@angular/forms";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { NgxFormErrorComponent } from "../form-error-component.intf";
import { NgxFormErrorsMessageService } from "../services";
import { NgxFormErrorsGroupDirective } from "./form-errors-group.directive";
import { NGX_FORM_ERRORS_CONFIG, NgxFormErrorsConfig } from "../form-errors-config.intf";
import { NgxFormFieldError } from "../form-error.intf";

export type FormControlState = "untouched" | "touched" | "pristine" | "dirty" | string;

/**
 * Directive that creates dynamically an Error component when there are validation errors in the form control bound to it.
 * The Error component should be provided via the {@link NgxFormErrorsModule}.forRoot() method and it should be included in the
 * entryComponents of your app/feature NgModule so that it can be dynamically created.
 */
@Directive({
	selector: "[ngxFormErrors]",
	exportAs: "ngxFormErrors"
})
export class NgxFormErrorsDirective implements OnInit, OnChanges, OnDestroy {
	/**
	 * The name of the form control to be bound to this directive
	 */
	/* tslint:disable-next-line:no-input-rename */
	@Input("ngxFormErrors")
	public formControlName!: string;

	/**
	 * The field name or alias to be displayed in the validation messages instead of the form control's name.
	 * This alias will be sent in the `params.fieldName` property of the {@link NgxFormFieldError}(s) emitted by this directive
	 */
	/* tslint:disable-next-line:no-input-rename */
	@Input("ngxFormErrorsFieldName")
	public fieldName?: string;

	/**
	 * The form control bound to this directive
	 */
	public _formControl!: AbstractControl;

	/**
	 * Subject used as source to emit the validation errors from the form control
	 */
	private _controlErrorsSubj: BehaviorSubject<NgxFormFieldError[]>;

	/**
	 * Observable that the created Error component will subscribe to in order to get all the validation errors from the bound form control
	 */
	public _controlErrors$: Observable<NgxFormFieldError[]>;

	/**
	 * The factory to be used to dynamically create the specified Error component
	 */
	private _componentFactory: ComponentFactory<NgxFormErrorComponent>;

	/**
	 * Represents a component created by a `ComponentFactory`.
	 */
	public _componentRef!: ComponentRef<NgxFormErrorComponent>;

	/**
	 * Subscription to the changes observable of the form control bound to this directive
	 */
	private _controlChangesSubscription!: Subscription;

	/**
	 * Class constructor
	 * @param _form - The Angular formGroup that contains the form control bound to this directive
	 * @param _templateRef - The embedded template that can be used to instantiate embedded views
	 * @param _viewContainer - The container where the Error component view(s) can be attached
	 * @param componentFactoryResolver - Resolver that returns Angular component factories
	 * @param formErrorsGroup - The NgxFormErrorsGroupDirective that wraps (if any) the form control bound to this directive
	 * @param _formErrorsMessageService - The NgxFormErrorsMessageService to add and retrieve error messages for the different validation errors
	 * @param formErrorsConfig - Configuration object for the NgxFormErrors module
	 */
	public constructor(
		private _form: FormGroupDirective,
		private _templateRef: TemplateRef<any>,
		private _viewContainer: ViewContainerRef,
		componentFactoryResolver: ComponentFactoryResolver,
		@Optional() public formErrorsGroup: NgxFormErrorsGroupDirective,
		private _formErrorsMessageService: NgxFormErrorsMessageService,
		@Inject(NGX_FORM_ERRORS_CONFIG) formErrorsConfig: NgxFormErrorsConfig
	) {
		this._controlErrorsSubj = new BehaviorSubject<NgxFormFieldError[]>([]);
		this._controlErrors$ = this._controlErrorsSubj.asObservable();
		let component: Type<NgxFormErrorComponent>;
		if (formErrorsConfig.formErrorComponent) {
			component = formErrorsConfig.formErrorComponent;
		} else {
			throw new Error("ngxFormErrors directive: no form error component provided");
		}
		this._componentFactory = componentFactoryResolver.resolveComponentFactory(component);
	}

	/**
	 * Directive's lifecycle hook
	 */
	public ngOnInit(): void {
		this._viewContainer.createEmbeddedView(this._templateRef);
		this._componentRef = this._viewContainer.createComponent(this._componentFactory);
		/// this._componentRef = this._componentFactory.create(this.injector);
		/// this.componentView = this._componentRef.hostView;
		/// this.viewContainer.insert(this.componentView);

		this._componentRef.instance.errors$ = this._controlErrors$;
		// TODO: how to avoid calling a function in the component so that it subscribes to the _controlErrors$ observable?
		this._componentRef.instance.subscribeToErrors();
	}

	/**
	 * Directive's lifecycle hook
	 * @param _changes - The changed inputs
	 */
	public ngOnChanges(_changes: SimpleChanges): void {
		const control: AbstractControl | undefined = this._form.control.get(this.formControlName) || undefined;

		if (control) {
			if (this._formControl) {
				this._controlChangesSubscription.unsubscribe();
			}
			this._formControl = control;
		} else {
			throw new Error(`Control '${this.formControlName}' not found in Form`);
		}

		this._controlChangesSubscription = this._formControl.statusChanges
			.pipe(map<string, ValidationErrors>(() => this._formControl.errors || {}))
			.subscribe((errors: ValidationErrors) => {
				const fieldErrors: NgxFormFieldError[] = [];

				/* tslint:disable-next-line:forin */
				for (const errorKey in errors) {
					const formError: NgxFormFieldError = this.constructFieldError(errorKey, errors[errorKey]);
					fieldErrors.push(formError);
				}

				this._controlErrorsSubj.next(fieldErrors);
			});

		// trigger initial validation in case the field is already invalid
		if (this._formControl.invalid) {
			this._formControl.updateValueAndValidity({ onlySelf: true, emitEvent: true });
		}
	}

	/**
	 * Directive's lifecycle hook
	 */
	public ngOnDestroy(): void {
		this._controlErrorsSubj.complete();
		if (this._controlChangesSubscription) {
			this._controlChangesSubscription.unsubscribe();
		}
	}

	/**
	 * @ignore
	 * @param errorKey - The type of error (Angular validator name)
	 * @param error - The Angular validation error
	 */
	private constructFieldError(errorKey: string, error: any): NgxFormFieldError {
		const errorGroup: string | undefined = this.formErrorsGroup && this.formErrorsGroup.group ? this.formErrorsGroup.group : undefined;
		const validationMessage: string | undefined = this._formErrorsMessageService.findErrorMessage(
			errorKey,
			this.formControlName,
			errorGroup
		);
		let fieldName: string | undefined = this._formErrorsMessageService.getFieldName(this.formControlName, errorGroup);

		// the alias provided via the directive will always take precedence
		if (this.fieldName) {
			fieldName = this.fieldName;
		}

		return {
			error: errorKey, // TODO: already implicit in the property name of the errorObj object... remove?
			formControlName: this.formControlName, // TODO trim path or not?
			message: typeof validationMessage !== "undefined" ? validationMessage : errorKey, // the errorKey is used as default message if no message defined
			params: {
				fieldName: typeof fieldName !== "undefined" ? fieldName : this.formControlName, // the formControlName is used as default fieldName if no custom fieldName is defined
				...error
			}
		};
	}

	/**
	 * An object containing any errors generated by failing validation, or null if there are no errors
	 */
	public get errors(): ValidationErrors | null {
		if (!this._formControl) {
			/* tslint:disable-next-line:no-null-keyword */
			return null;
		}
		return this._formControl.errors;
	}

	/**
	 * Whether the form control has any validation error
	 */
	public get hasErrors(): boolean {
		return !!this.errors;
	}

	/**
	 * Whether the form control has any error for the given validation
	 * @param name - The name of the validation error to be checked
	 */
	public hasError(name: string): boolean {
		if (!this._formControl) {
			return false; // false by default
		}
		return this._formControl.hasError(name);
	}

	/**
	 * Return the error (if any) of this form control corresponding to the given validation, or null in case the form control passed the given validation
	 * @param name - The name of the validation error to be returned
	 */
	public getError(name: string): any | null {
		if (!this._formControl) {
			/* tslint:disable-next-line:no-null-keyword */
			return null;
		}
		return this._formControl.getError(name);
	}

	/**
	 * Whether the form control has the given state
	 * @param state - The state of the form control to be checked
	 */
	public hasState(state: FormControlState): boolean {
		if (!this._formControl) {
			return false; // false by default
		}
		if (typeof this._formControl[state] === "undefined") {
			throw new Error("ngxFormErrors directive: form control has no '" + state + "' state defined");
		}
		return this._formControl[state];
	}
}
