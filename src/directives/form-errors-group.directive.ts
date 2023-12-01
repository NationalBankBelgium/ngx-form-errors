import { Directive, Input, OnInit } from "@angular/core";

/**
 * Directive that defines the group of the form model to be validated.
 * The directive exposes the group through the controller to allow access to it by wrapped {@link NgxFormErrorsDirective}(s).
 */
@Directive({
	selector: "[ngxFormErrorsGroup]"
})
export class NgxFormErrorsGroupDirective implements OnInit {
	/**
	 * The group of the form model
	 */
	@Input("ngxFormErrorsGroup")
	public set group(value: string) {
		this._formErrorsGroup = value;
	}

	public get group(): string {
		return this._formErrorsGroup;
	}

	/**
	 * @ignore
	 */
	private _formErrorsGroup!: string;

	/**
	 * Class constructor
	 */
	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	public constructor() {
		// TODO: how to prevent multiple ngxFormErrorsGroup on the same <form> element?
		// if ((<HTMLElement>elementRef.nativeElement).attributes["ngxFormErrorsGroup"]) {
		// 	throw new Error(
		// 		"NgxFormErrorsGroupDirective is already applied to this element: " +
		// 			(<HTMLElement>elementRef.nativeElement).tagName +
		// 			". Add this directive to an element only once"
		// 	);
		// }
	}

	/**
	 * Directive's lifecycle hook
	 */
	public ngOnInit(): void {
		if (!this.group) {
			throw new Error("NgxFormErrorsGroupDirective: no group provided.");
		}
	}
}
