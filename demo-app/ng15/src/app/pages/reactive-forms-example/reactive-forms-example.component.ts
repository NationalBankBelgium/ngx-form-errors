/* eslint-disable @angular-eslint/template/use-track-by-function, @angular-eslint/template/cyclomatic-complexity */
import { Component } from "@angular/core";
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { PasswordValidator } from "../../password-validator";
import { ParentErrorStateMatcher } from "../../parent-error-state-matcher";

@Component({
	selector: "app-reactive-forms-example",
	templateUrl: "./reactive-forms-example.component.html",
	styleUrls: ["./reactive-forms-example.component.scss"]
})
export class ReactiveFormsExampleComponent {
	public formGroup: UntypedFormGroup;
	public validationMessages: { [key: string]: { type: string; message: string }[] };
	public parentErrorStateMatcher: ErrorStateMatcher = new ParentErrorStateMatcher();
	public passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$";
	public showValidationDetails = false;
	public showValidationSummary = true;

	public constructor(private formBuilder: UntypedFormBuilder) {
		this.formGroup = this.formBuilder.group({
			username: [undefined, Validators.required],
			matchingPasswords: new UntypedFormGroup(
				{
					password: new UntypedFormControl(
						"",
						Validators.compose([
							Validators.minLength(3),
							Validators.maxLength(10),
							Validators.required,
							Validators.pattern(this.passwordPattern) // this is for the letters (both uppercase and lowercase) and numbers validation
						])
					),
					confirmPassword: new UntypedFormControl("", Validators.required)
				},
				{
					validators: (formGroup: AbstractControl): ValidationErrors | null =>
						PasswordValidator.areEqual(<UntypedFormGroup>formGroup)
				}
			)
		});

		this.validationMessages = {
			username: [
				{
					type: "required",
					message: "DEMO.FORM_VALIDATION.WITHOUT_NGX_FORM_ERRORS.USER_NAME.REQUIRED"
				},
				{ type: "unique", message: "DEMO.FORM_VALIDATION.WITHOUT_NGX_FORM_ERRORS.USER_NAME.UNIQUE" }
			],
			password: [
				{
					type: "required",
					message: "DEMO.FORM_VALIDATION.WITHOUT_NGX_FORM_ERRORS.PASSWORD.REQUIRED"
				},
				{
					type: "minlength",
					message: "DEMO.FORM_VALIDATION.WITHOUT_NGX_FORM_ERRORS.PASSWORD.MIN_LENGTH"
				},
				{ type: "pattern", message: "DEMO.FORM_VALIDATION.WITHOUT_NGX_FORM_ERRORS.PASSWORD.PATTERN" }
			],
			confirmPassword: [
				{
					type: "required",
					message: "DEMO.FORM_VALIDATION.WITHOUT_NGX_FORM_ERRORS.CONFIRM_PASSWORD.REQUIRED"
				},
				{
					type: "areEqual",
					message: "DEMO.FORM_VALIDATION.WITHOUT_NGX_FORM_ERRORS.CONFIRM_PASSWORD.ARE_EQUAL"
				}
			]
		};
	}

	public toggleValidationDetails(): void {
		this.showValidationDetails = !this.showValidationDetails;
	}

	public toggleValidationSummary(): void {
		this.showValidationSummary = !this.showValidationSummary;
	}

	public onSubmitUserDetails(formGroup: UntypedFormGroup): void {
		console.log("Submitted form:", formGroup.value);
	}

	public getFormStatus(): void {
		console.log("Form status", this.formGroup);
	}
}
