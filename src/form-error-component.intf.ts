import { NgxFormFieldError } from "./form-error.intf";
import { Observable } from "rxjs";

/**
 * Describes an Error component to be dynamically created by the ngxFormErrors directive
 */
export interface NgxFormErrorComponent {
	/**
	 * An observable that emits the validation errors of the form control whenever the control changes
	 */
	errors$: Observable<NgxFormFieldError[]>;

	/**
	 * Method to be called by the ngxFormErrors directive only. It subscribes to the errors$ observable to update
	 * the current validation errors from the form control
	 */
	checkForErrors(): void;
}
