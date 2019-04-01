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

	describe("getErrorMessage", () => {
		const anotherErrorKey: string = "another-error";
		const anotherErrorMessage: string = "another message";

		it("should return the right message for the given error or undefined if the error does not exist", () => {
			formErrorMessageService.errorMessages = {
				...initialMessages,
				...dummyErrorMessage,
				[anotherErrorKey]: anotherErrorMessage
			};

			expect(formErrorMessageService.getErrorMessage(initialErrorKey, "test")).toBe(initialMessages[initialErrorKey]);
			expect(formErrorMessageService.getErrorMessage(dummyErrorKey, "test")).toBe(dummyErrorMessage[dummyErrorKey]);
			expect(formErrorMessageService.getErrorMessage(anotherErrorKey, "test")).toBe(anotherErrorMessage);
			expect(formErrorMessageService.getErrorMessage("any-other-error", "test")).toBeUndefined();
		});

		it("should return the right message for the given group.controlName.error tuple or for the given controlName.error tuple or for the given group.error tuple or for the given error only or undefined if nothing related to that error exists", () => {
			const customRequiredErrorMessage: string = "some required message";
			const customGroupRequiredErrorMessage: string = "some required group message";
			const customControlNameRequiredErrorMessage: string = "some required controlName message";
			const customGroupControlNameRequiredErrorMessage: string = "some required group controlName message";
			const groupName: string = "custom-group";
			const controlName: string = "custom-control-name";
			const controlNameNoMsg: string = "control-name-without-linked-message";
			const requiredErrorKey: string = "required";

			formErrorMessageService.errorMessages = {
				["some-group." + initialErrorKey]: initialMessages[initialErrorKey],
				["dummy-group." + dummyErrorKey]: dummyErrorMessage[dummyErrorKey],
				[anotherErrorKey]: anotherErrorMessage,
				[requiredErrorKey]: customRequiredErrorMessage,
				[`${controlName}.${requiredErrorKey}`]: customControlNameRequiredErrorMessage,
				[`${groupName}.${requiredErrorKey}`]: customGroupRequiredErrorMessage,
				[`${groupName}.${controlName}.${requiredErrorKey}`]: customGroupControlNameRequiredErrorMessage
			};

			expect(formErrorMessageService.getErrorMessage(initialErrorKey, "test")).toBeUndefined();
			expect(formErrorMessageService.getErrorMessage(initialErrorKey, "test", "some-group")).toBe(initialMessages[initialErrorKey]);
			expect(formErrorMessageService.getErrorMessage(requiredErrorKey, controlName)).toBe(customControlNameRequiredErrorMessage);
			expect(formErrorMessageService.getErrorMessage(requiredErrorKey, controlName, groupName)).toBe(
				customGroupControlNameRequiredErrorMessage
			);
			expect(formErrorMessageService.getErrorMessage(requiredErrorKey, controlNameNoMsg)).toBe(customRequiredErrorMessage);
			expect(formErrorMessageService.getErrorMessage(requiredErrorKey, controlNameNoMsg, groupName)).toBe(
				customGroupRequiredErrorMessage
			);
			expect(formErrorMessageService.getErrorMessage(dummyErrorKey, "test")).toBeUndefined();
			expect(formErrorMessageService.getErrorMessage(dummyErrorKey, "test", "dummy-group")).toBe(dummyErrorMessage[dummyErrorKey]);
			expect(formErrorMessageService.getErrorMessage(anotherErrorKey, "test")).toBe(anotherErrorMessage);
			expect(formErrorMessageService.getErrorMessage(anotherErrorKey, "test", "another-group")).toBe(anotherErrorMessage); // returns the message for the generic error
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

		it("should return the right message for the given group.formControlName tuple or for the given formControlName only or undefined if nothing related to that formControlName exists", () => {
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
