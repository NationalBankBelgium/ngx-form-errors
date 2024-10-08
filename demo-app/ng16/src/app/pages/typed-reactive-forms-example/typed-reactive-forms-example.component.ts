/* eslint-disable @angular-eslint/template/use-track-by-function, @angular-eslint/template/cyclomatic-complexity */
import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { PasswordValidator } from "../../password-validator";
import { ParentErrorStateMatcher } from "../../parent-error-state-matcher";
import { MatchingPassword } from "./matching-password";

@Component({
	selector: "app-reactive-forms-example",
	templateUrl: "./typed-reactive-forms-example.component.html",
	styleUrls: ["./typed-reactive-forms-example.component.scss"]
})
export class TypedReactiveFormsExampleComponent {
	public formGroup: FormGroup;
	public validationMessages: { [key: string]: { type: string; message: string }[] };
	public parentErrorStateMatcher: ErrorStateMatcher = new ParentErrorStateMatcher();
	public passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$";
	public showValidationDetails = false;
	public showValidationSummary = true;

	public constructor(private formBuilder: FormBuilder) {
		this.formGroup = this.formBuilder.group({
			username: [undefined, Validators.required],
			matchingPasswords: new FormGroup(
				{
					password: new FormControl(
						"",
						Validators.compose([
							Validators.minLength(3),
							Validators.maxLength(10),
							Validators.required,
							Validators.pattern(this.passwordPattern) // this is for the letters (both uppercase and lowercase) and numbers validation
						])
					),
					confirmPassword: new FormControl("", Validators.required)
				},
				{
					validators: (formGroup: AbstractControl<MatchingPassword>): ValidationErrors | null =>
						PasswordValidator.areEqualTyped(formGroup)
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
			matchingPasswords: [
				{
					type: "areEqual",
					message: "DEMO.FORM_VALIDATION.WITHOUT_NGX_FORM_ERRORS.CONFIRM_PASSWORD.ARE_EQUAL"
				}
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

	public onSubmitUserDetails(formGroup: FormGroup): void {
		console.log("Submitted form:", formGroup.value);
	}

	public getFormStatus(): void {
		console.log("Form status", this.formGroup);
	}
}
