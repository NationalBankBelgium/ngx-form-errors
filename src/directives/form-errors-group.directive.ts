import { Directive, Input } from "@angular/core";

/**
 * Directive that defines the group of the form model to be validated.
 * The directive exposes the group through the controller to allow access to it by wrapped ngxFormErrors directives.
 */
@Directive({
	selector: "[ngxFormErrorsGroup]"
})
export class NgxFormErrorsGroupDirective {
	/**
	 * The group of the form model
	 * @param value - The group name
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
	private _formErrorsGroup: string;

	/**
	 * Class constructor
	 */
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
}
