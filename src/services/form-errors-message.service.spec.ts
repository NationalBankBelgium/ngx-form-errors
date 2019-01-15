/* tslint:disable:completed-docs */
import { NgxFormErrorsMessageService, NgxValidationErrorFieldNames, NgxValidationErrorMessages } from "./form-errors-message.service";

describe("NgxFormErrorsMessageService", () => {
	let formErrorMessageService: NgxFormErrorsMessageServiceHelper;
	const initialErrorKey: string = "some-error";
	const initialMessages: NgxValidationErrorMessages = { [initialErrorKey]: "some message" };
	const dummyErrorKey: string = "dummy-error";
	const dummyErrorMessage: NgxValidationErrorMessages = { [dummyErrorKey]: "dummy error message" };
	const initialFieldName: string = "some-field";
	const initialFieldNames: NgxValidationErrorFieldNames = { [initialFieldName]: "some field alias" };
	const dummyFieldNameKey: string = "dummy-field";
	const dummyFieldName: NgxValidationErrorFieldNames = { [dummyFieldNameKey]: "dummy field alias" };

	beforeEach(() => {
		formErrorMessageService = new NgxFormErrorsMessageServiceHelper();
	});

	describe("addErrorMessages", () => {
		it("should append the given messages to the current error messages", () => {
			formErrorMessageService.errorMessages = initialMessages;
			expect(formErrorMessageService.errorMessages).toEqual({ ...initialMessages });

			formErrorMessageService.addErrorMessages(dummyErrorMessage);
			expect(formErrorMessageService.errorMessages).toEqual({ ...initialMessages, ...dummyErrorMessage });
		});

		it("should overwrite an existing message with the given message if the error key is the same", () => {
			const newErrorMessage: NgxValidationErrorMessages = {
				[initialErrorKey]: dummyErrorMessage[dummyErrorKey]
			};

			formErrorMessageService.errorMessages = initialMessages;
			expect(formErrorMessageService.errorMessages).toEqual({ ...initialMessages });

			formErrorMessageService.addErrorMessages(newErrorMessage);
			expect(formErrorMessageService.errorMessages).toEqual({ ...newErrorMessage });
		});
	});

	describe("getErrorMessages", () => {
		it("should return the content of the errorMessages property as is", () => {
			const errorMessages: NgxValidationErrorMessages = { ...initialMessages, ...dummyErrorMessage };

			formErrorMessageService.errorMessages = errorMessages;
			expect(formErrorMessageService.getErrorMessages()).toBe(errorMessages);
		});
	});

	describe("getMessageForError", () => {
		const anotherErrorKey: string = "another-error";
		const anotherErrorMessage: string = "another message";

		it("should return the right message for the given error or undefined if the error does not exist", () => {
			formErrorMessageService.errorMessages = {
				...initialMessages,
				...dummyErrorMessage,
				[anotherErrorKey]: anotherErrorMessage
			};

			expect(formErrorMessageService.getMessageForError(initialErrorKey)).toBe(initialMessages[initialErrorKey]);
			expect(formErrorMessageService.getMessageForError(dummyErrorKey)).toBe(dummyErrorMessage[dummyErrorKey]);
			expect(formErrorMessageService.getMessageForError(anotherErrorKey)).toBe(anotherErrorMessage);
			expect(formErrorMessageService.getMessageForError("any-other-error")).toBeUndefined();
		});

		it("should return the right message for the given group.error tuple or for the given error only or undefined if nothing related to that error exists", () => {
			formErrorMessageService.errorMessages = {
				["some-group." + initialErrorKey]: initialMessages[initialErrorKey],
				["dummy-group." + dummyErrorKey]: dummyErrorMessage[dummyErrorKey],
				[anotherErrorKey]: anotherErrorMessage
			};

			expect(formErrorMessageService.getMessageForError(initialErrorKey)).toBeUndefined();
			expect(formErrorMessageService.getMessageForError(initialErrorKey, "some-group")).toBe(initialMessages[initialErrorKey]);
			expect(formErrorMessageService.getMessageForError(dummyErrorKey)).toBeUndefined();
			expect(formErrorMessageService.getMessageForError(dummyErrorKey, "dummy-group")).toBe(dummyErrorMessage[dummyErrorKey]);
			expect(formErrorMessageService.getMessageForError(anotherErrorKey)).toBe(anotherErrorMessage);
			expect(formErrorMessageService.getMessageForError(anotherErrorKey, "another-group")).toBe(anotherErrorMessage); // returns the message for the generic error
		});
	});

	describe("addFieldNames", () => {
		it("should append the given field names to the current field names", () => {
			formErrorMessageService.fieldNames = initialFieldNames;
			expect(formErrorMessageService.fieldNames).toEqual({ ...initialFieldNames });

			formErrorMessageService.addFieldNames(dummyFieldName);
			expect(formErrorMessageService.fieldNames).toEqual({ ...initialFieldNames, ...dummyFieldName });
		});

		it("should overwrite an existing message with the given message if the error key is the same", () => {
			const newErrorFieldName: NgxValidationErrorFieldNames = {
				[initialFieldName]: dummyErrorMessage[dummyErrorKey]
			};

			formErrorMessageService.fieldNames = initialFieldNames;
			expect(formErrorMessageService.fieldNames).toEqual({ ...initialFieldNames });

			formErrorMessageService.addFieldNames(newErrorFieldName);
			expect(formErrorMessageService.fieldNames).toEqual({ ...newErrorFieldName });
		});
	});

	describe("getFieldNames", () => {
		it("should return the content of the fieldNames property as is", () => {
			const fieldNames: NgxValidationErrorFieldNames = { ...initialFieldNames, ...dummyFieldName };

			formErrorMessageService.fieldNames = fieldNames;
			expect(formErrorMessageService.getFieldNames()).toBe(fieldNames);
		});
	});

	describe("getFieldName", () => {
		const anotherFieldKey: string = "another-field";
		const anotherFieldAlias: string = "another field alias";

		it("should return the right field name for the given field or undefined if the field does not exist", () => {
			formErrorMessageService.fieldNames = {
				...initialFieldNames,
				...dummyFieldName,
				[anotherFieldKey]: anotherFieldAlias
			};

			expect(formErrorMessageService.getFieldName(initialFieldName)).toBe(initialFieldNames[initialFieldName]);
			expect(formErrorMessageService.getFieldName(dummyFieldNameKey)).toBe(dummyFieldName[dummyFieldNameKey]);
			expect(formErrorMessageService.getFieldName(anotherFieldKey)).toBe(anotherFieldAlias);
			expect(formErrorMessageService.getFieldName("any-other-field")).toBeUndefined();
		});

		it("should return the right message for the given group.fieldName tuple or for the given fieldName only or undefined if nothing related to that fieldName exists", () => {
			formErrorMessageService.fieldNames = {
				["some-group." + initialErrorKey]: initialFieldNames[initialFieldName],
				["dummy-group." + dummyFieldNameKey]: dummyFieldName[dummyFieldNameKey],
				[anotherFieldKey]: anotherFieldAlias
			};

			expect(formErrorMessageService.getFieldName(initialErrorKey)).toBeUndefined();
			expect(formErrorMessageService.getFieldName(initialErrorKey, "some-group")).toBe(initialFieldNames[initialFieldName]);
			expect(formErrorMessageService.getFieldName(dummyFieldNameKey)).toBeUndefined();
			expect(formErrorMessageService.getFieldName(dummyFieldNameKey, "dummy-group")).toBe(dummyFieldName[dummyFieldNameKey]);
			expect(formErrorMessageService.getFieldName(anotherFieldKey)).toBe(anotherFieldAlias);
			expect(formErrorMessageService.getFieldName(anotherFieldKey, "another-group")).toBe(anotherFieldAlias);
		});
	});
});

class NgxFormErrorsMessageServiceHelper extends NgxFormErrorsMessageService {
	public errorMessages: NgxValidationErrorMessages;

	public fieldNames: NgxValidationErrorFieldNames;

	public constructor() {
		super();
	}
}
