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

/**
 * Implicit context of the ngxFormErrors structural directive
 */
interface NgxValidationErrorContext {
	/**
	 * The map of errors returned from failed Angular validation checks
	 */
	$implicit: ValidationErrors;
}

/**
 * Directive that creates dynamically an Error component when there are validation errors in the form control bound to it.
 * The Error component should be defined via the forRoot() method of the NgxFormErrorsModule and it should be included in the
 * entryComponents of your app/feature NgModule so that it can be dynamically created.
 */
@Directive({
	selector: "[ngxFormErrors]",
	exportAs: "ngxFormErrors"
})
export class NgxFormErrorsDirective implements OnInit, OnChanges, OnDestroy {
	/* tslint:disable:no-input-rename */
	/**
	 * The name of the form control to be bound to this directive
	 */
	@Input("ngxFormErrors")
	public formControlName: string;

	/**
	 * The name to be displayed for the form control bound to this directive
	 */
	@Input("ngxFormErrorsFieldName")
	public fieldName: string;

	/**
	 * The form control bound to this directive
	 */
	protected formControl: AbstractControl;

	/**
	 * Subject used as source to emit the validation errors from the form control
	 */
	public controlErrorsSubj: BehaviorSubject<NgxFormFieldError[]>;

	/**
	 * Observable that the created Error component will subscribe to in order to get all the validation errors from the bound form control
	 */
	public controlErrors$: Observable<NgxFormFieldError[]>;

	/**
	 * The factory to be used to dynamically create the specified Error component
	 */
	public componentFactory: ComponentFactory<NgxFormErrorComponent>;

	/**
	 * Represents a component created by a `ComponentFactory`.
	 */
	public componentRef: ComponentRef<NgxFormErrorComponent>;

	/**
	 * Context of the ngxFormErrors structural directive
	 */
	public context: NgxValidationErrorContext;

	/**
	 * Subscripton to the changes observable of the form control bound to this directive
	 */
	public controlChangesSubscription: Subscription;

	/**
	 * Class constructor
	 * @param form - The Angular formGroup that contains the form control bound to this directive
	 * @param templateRef - The embedded template that can be used to instantiate embedded views
	 * @param viewContainer - The container where the Error component view(s) can be attached
	 * @param componentFactoryResolver - Resolver that returns Angular component factories
	 * @param formErrorsGroup - The NgxFormErrorsGroupDirective that wraps (if any) the form control bound to this directive
	 * @param formErrorsMessageService - The NgxFormErrorsMessageService to add and retrieve error messages for the different validation errors
	 * @param formErrorsConfig - Configuration object for the NgxFormErrors module
	 */
	public constructor(
		public form: FormGroupDirective,
		public templateRef: TemplateRef<any>,
		public viewContainer: ViewContainerRef,
		componentFactoryResolver: ComponentFactoryResolver,
		public formErrorsGroup: NgxFormErrorsGroupDirective,
		private formErrorsMessageService: NgxFormErrorsMessageService,
		@Inject(NGX_FORM_ERRORS_CONFIG) private formErrorsConfig: NgxFormErrorsConfig
	) {
		this.context = { $implicit: {} };
		this.controlErrorsSubj = new BehaviorSubject<NgxFormFieldError[]>([]);
		this.controlErrors$ = this.controlErrorsSubj.asObservable();
		let component: Type<NgxFormErrorComponent>;
		if (this.formErrorsConfig.formErrorComponent) {
			component = this.formErrorsConfig.formErrorComponent;
		} else {
			throw new Error("ngxFormErrors directive: no form error component provided");
		}
		this.componentFactory = componentFactoryResolver.resolveComponentFactory(component);
	}

	/**
	 * Directive's lifecycle hook
	 */
	public ngOnInit(): void {
		this.viewContainer.createEmbeddedView(this.templateRef, this.context);
		this.componentRef = this.viewContainer.createComponent(this.componentFactory);
		/// this.componentRef = this.componentFactory.create(this.injector);
		/// this.componentView = this.componentRef.hostView;
		/// this.viewContainer.insert(this.componentView);

		this.componentRef.instance.errors$ = this.controlErrors$;
		// TODO: how to avoid calling a function in the component so that it subscribes to the controlErrors$ observable?
		this.componentRef.instance.checkForErrors();
	}

	/**
	 * Directive's lifecycle hook
	 * @param _changes - The changed inputs
	 */
	public ngOnChanges(_changes: SimpleChanges): void {
		const control: AbstractControl | undefined = this.form.control.get(this.formControlName) || undefined;

		if (control) {
			if (this.formControl) {
				this.controlChangesSubscription.unsubscribe();
			}
			this.formControl = control;
		} else {
			throw new Error(`Control '${this.formControlName}' not found in Form`);
		}

		this.controlChangesSubscription = this.formControl.statusChanges
			.pipe(map<ValidationErrors | null, ValidationErrors>(() => this.formControl.errors || {}))
			.subscribe((errors: ValidationErrors) => {
				const fieldErrors: NgxFormFieldError[] = [];
				this.context.$implicit = {}; // clean all errors

				/* tslint:disable-next-line:forin */
				for (const errorKey in errors) {
					const formError: NgxFormFieldError = this.constructFieldError(errorKey, errors[errorKey]);
					this.context.$implicit[errorKey] = formError;
					fieldErrors.push(formError);
				}

				this.controlErrorsSubj.next(fieldErrors);
				/// if (this.componentRef) {
				/// 	this.componentRef.changeDetectorRef.detectChanges();
				/// }
			});

		// trigger initial validation in case the field is untouched
		if (this.formControl.untouched) {
			this.formControl.updateValueAndValidity({ onlySelf: true, emitEvent: true });
		}
	}

	/**
	 * Directive's lifecycle hook
	 */
	public ngOnDestroy(): void {
		this.controlErrorsSubj.complete();
		if (this.controlChangesSubscription) {
			this.controlChangesSubscription.unsubscribe();
		}
	}

	/**
	 * @ignore
	 * @param errorKey - The type of error (Angular validator name)
	 * @param error - The Angular validation error
	 */
	private constructFieldError(errorKey: string, error: any): NgxFormFieldError {
		const validationMessage: string | undefined = this.formErrorsMessageService.getMessageForError(
			errorKey,
			this.formErrorsGroup.group
		);
		let fieldName: string | undefined = this.formErrorsMessageService.getFieldName(this.formControlName, this.formErrorsGroup.group);

		if (this.fieldName) {
			fieldName = this.fieldName;
		}

		return {
			error: errorKey, // TODO: already implicit in the property name of the errorObj object... remove?
			fieldName: this.formControlName, // FIXME trim path or not?
			message: typeof validationMessage !== "undefined" ? validationMessage : errorKey, // the errorKey is used as default message if no message defined
			params: {
				fieldName: typeof fieldName !== "undefined" ? fieldName : this.formControlName, // the formControlName is uses as default fieldName if no custom name defined
				...error
			}
		};
	}

	/**
	 * An object containing any errors generated by failing validation, or null if there are no errors
	 */
	public get errors(): ValidationErrors | null {
		if (!this.formControl) {
			return null;
		}
		return this.formControl.errors;
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
		if (!this.formControl) {
			return false; // false by default
		}
		return this.formControl.hasError(name);
	}

	/**
	 * Whether the form control has no errors for the given validation
	 * @param name - The name of the validation error to be checked
	 */
	public isValid(name: string): boolean {
		if (!this.formControl) {
			return true; // true by default
		}
		return !this.formControl.hasError(name);
	}

	/**
	 * Return the error (if any) of this form control corresponding to the given validation, or null in case the form control passed the given validation
	 * @param name - The name of the validation error to be returned
	 */
	public getError(name: string): any | null {
		if (!this.formControl) {
			return null;
		}
		return this.formControl.getError(name);
	}

	/**
	 * Whether the form control has the given state
	 * @param state - The state of the form control to be checked
	 */
	public hasState(state: string): boolean {
		if (typeof this.formControl[state] === "undefined") {
			throw new Error("ngxFormErrors directive: form control has no '" + state + "' state defined");
		}
		return this.formControl[state];
	}
}
