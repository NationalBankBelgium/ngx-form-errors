import { Injectable } from "@angular/core";

/**
 * Object containing a set of validation error messages where the key is the validation errors (Angular validator name)
 * and the value is the validation is the error message
 */
export interface NgxValidationErrorMessages {
	[validationError: string]: string;
}

/**
 * Object containing a set of field names where the key is the field name (Angular form control name)
 * and the value is the name to be displayed for that field
 */
export interface NgxValidationErrorFieldNames {
	[fieldName: string]: string;
}

/**
 * Service to add and retrieve error messages for the different validation errors returned by the {@link NgxFormErrorsDirective}
 */
@Injectable()
export class NgxFormErrorsMessageService {
	/**
	 * @ignore
	 */
	protected errorMessages: NgxValidationErrorMessages = {};
	/**
	 * @ignore
	 */
	protected fieldNames: NgxValidationErrorFieldNames = {};

	/**
	 * Adds the given error messages to the set of messages known by this service
	 * @param messages - An object containing the set of messages to be added
	 */
	public addErrorMessages(messages: NgxValidationErrorMessages): void {
		this.errorMessages = { ...this.errorMessages, ...messages };
	}

	/**
	 * Returns an object containing all the messages known by this service
	 */
	public getErrorMessages(): NgxValidationErrorMessages {
		return this.errorMessages;
	}

	/**
	 * Tries to find the error message matching the given validation error. Additionally, the form control name and/or the model group
	 * can be specified to return the error message matching those as well as the validation error.
	 * This method does its best to find the message that fulfills all or some of the given parameters with the following precedence:
	 *
	 * 1.- errorMessages[groupName.formControlName.errorKey]
	 * 2.- errorMessages[formControlName.errorKey]
	 * 3.- errorMessages[groupName.errorKey]
	 * 4.- errorMessages[errorKey]
	 *
	 * It returns `undefined` if no message matching any of those params is found.
	 * @param error - The validation error (Angular validator name)
	 * @param formControlName - The name of the FormControl
	 * @param group - The model group to find a match for (if any)
	 */
	public findErrorMessage(error: string, formControlName?: string, group?: string): string | undefined {
		return (
			(group && formControlName && this.errorMessages[`${group}.${formControlName}.${error}`]) ||
			(formControlName && this.errorMessages[`${formControlName}.${error}`]) ||
			(group && this.errorMessages[`${group}.${error}`]) ||
			this.errorMessages[error]
		);
	}

	/**
	 * Add the given field names to the set of field names known by this service
	 * @param fieldNames - An object containing the set of field names to be added
	 */
	public addFieldNames(fieldNames: NgxValidationErrorFieldNames): void {
		this.fieldNames = { ...this.fieldNames, ...fieldNames };
	}

	/**
	 * Returns an object containing all the field names known by this service
	 */
	public getFieldNames(): NgxValidationErrorFieldNames {
		return this.fieldNames;
	}

	/**
	 * Returns the field name matching the given name. Additionally, the model group can be specified to return the field name
	 * matching that group and the name. If no field name matches both, than it returns the one matching the given name.
	 * Otherwise it returns undefined.
	 * @param fieldName - The field name (Angular form control name)
	 * @param group - The model group to find a match for (if any)
	 */
	public getFieldName(fieldName: string, group?: string): string | undefined {
		let fieldNameKey: string = fieldName;

		if (group) {
			fieldNameKey = `${group}.${fieldName}`; // concatenating group + field name with a "."
		}

		if (this.fieldNames.hasOwnProperty(fieldNameKey)) {
			return this.fieldNames[fieldNameKey];
		} else if (this.fieldNames.hasOwnProperty(fieldName)) {
			return this.fieldNames[fieldName];
		} else {
			return undefined;
		}
	}
}
