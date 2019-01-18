/**
 * Error object describing the validation errors from a form control
 */
export interface NgxFormFieldError {
	/**
	 * The type of validation (Angular validator name)
	 */
	error: string;

	/**
	 * The name of the FormControl whose validation has failed
	 */
	formControlName: string;

	/**
	 * The validation error message
	 */
	message: string;

	/**
	 * Additional parameters
	 */
	params: {
		/**
		 * Alias of the validated field. Defined via the "ngxFormErrorsFieldName" attribute of the {@link NgxFormErrorsDirective}
		 * If no alias is defined for the field then this is the FormControl's name
		 */
		fieldName: string;
		/**
		 * Any parameters passed to the actual Angular validator
		 */
		[p: string]: any;
	};
}
