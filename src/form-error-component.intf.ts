import { NgxFormFieldError } from "./form-error.intf";
import { Observable } from "rxjs";

/**
 * Describes an Error component to be dynamically created by the ngxFormErrors directive.
 * `IMPORTANT:` The Error component should be provided in the {@link NgxFormErrorsModule}.forRoot() method and must implement this interface.
 */
export interface NgxFormErrorComponent {
	/**
	 * An observable that emits the validation errors of the form control whenever the control changes
	 */
	errors$: Observable<NgxFormFieldError[]>;

	/**
	 * Method to be called by the ngxFormErrors directive only.
	 * It must contain the necessary logic to subscribe to the errors$ observable to update the current validation errors
	 * from the form control
	 */
	subscribeToErrors(): void;
}
