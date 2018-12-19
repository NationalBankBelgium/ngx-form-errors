/**
 * Error object describing the validation errors from a form control
 */
export interface NgxFormFieldError {
	/**
	 * The type of validation (Angular validator name)
	 */
	error: string;

	/**
	 * The name of the field whose validation has failed
	 */
	fieldName: string;

	/**
	 * The validation error message
	 */
	message: string;

	/**
	 * Additional parameters
	 */
	params: {
		/**
		 * Name of the validated field
		 */
		fieldName: string;
		/**
		 * Parameters passed to the actual Angular validator
		 */
		[p: string]: any;
	};
}
