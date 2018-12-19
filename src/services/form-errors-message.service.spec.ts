import { NgxFormErrorsMessageService } from "./form-errors-message.service";

describe("NgxFormErrorsMessageService", () => {
	let formErrorMessageService: NgxFormErrorsMessageService;

	beforeEach(() => {
		formErrorMessageService = new NgxFormErrorsMessageService();
	});

	it("should be correctly constructed", () => {
		expect(formErrorMessageService).not.toBeNull();
		expect(formErrorMessageService).toBeDefined();
	});
});
