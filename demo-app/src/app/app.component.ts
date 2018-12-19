/*tslint:disable:completed-docs trackBy-function template-cyclomatic-complexity*/
import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { ParentErrorStateMatcher } from "./parent-error-state-matcher";
import { PasswordValidator } from "./password-validator";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
	public formMatError: FormGroup;
	public formNgxError: FormGroup;
	public validationMessages: object;
	public errors: object;
	public parentErrorStateMatcher: ErrorStateMatcher = new ParentErrorStateMatcher();
	public passwordPattern: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$";

	public constructor(private formBuilder: FormBuilder) {}

	public ngOnInit(): void {
		// user details form validations
		this.formMatError = this.formBuilder.group({
			fullname: ["John Doe", Validators.required],
			matchingPasswords: new FormGroup(
				{
					password: new FormControl(
						"",
						Validators.compose([
							Validators.minLength(5),
							Validators.maxLength(25),
							Validators.required,
							Validators.pattern(this.passwordPattern) // this is for the letters (both uppercase and lowercase) and numbers validation
						])
					),
					confirmPassword: new FormControl("", Validators.required)
				},
				(formGroup: AbstractControl) => {
					return PasswordValidator.areEqual(<FormGroup>formGroup);
				}
			)
		});

		this.formNgxError = this.formBuilder.group({
			fullname: ["John Smith", Validators.required],
			matchingPasswords: new FormGroup(
				{
					password: new FormControl(
						"",
						Validators.compose([
							Validators.minLength(5),
							Validators.maxLength(25),
							Validators.required,
							Validators.pattern(this.passwordPattern) // this is for the letters (both uppercase and lowercase) and numbers validation
						])
					),
					confirmPassword: new FormControl("", Validators.required)
				},
				(formGroup: AbstractControl) => {
					return PasswordValidator.areEqual(<FormGroup>formGroup);
				}
			)
		});

		this.validationMessages = {
			fullname: [
				{ type: "required", message: "DEMO.FORM_VALIDATION.FULL_NAME.REQUIRED", rules: ["touched", "dirty"] },
				{ type: "minlength", message: "DEMO.FORM_VALIDATION.FULL_NAME.MIN_LENGTH", rules: ["touched", "dirty"] },
				{ type: "maxlength", message: "DEMO.FORM_VALIDATION.FULL_NAME.MAX_LENGTH", rules: ["touched", "dirty"] },
				{ type: "pattern", message: "DEMO.FORM_VALIDATION.FULL_NAME.PATTERN", rules: ["touched", "dirty"] },
				{ type: "unique", message: "DEMO.FORM_VALIDATION.FULL_NAME.UNIQUE", rules: ["touched", "dirty"] }
			],
			password: [
				{ type: "required", message: "DEMO.FORM_VALIDATION.PASSWORD.REQUIRED", rules: ["touched", "dirty"] },
				{ type: "minlength", message: "DEMO.FORM_VALIDATION.PASSWORD.MIN_LENGTH", rules: ["touched", "dirty"] },
				{ type: "pattern", message: "DEMO.FORM_VALIDATION.PASSWORD.PATTERN", rules: ["touched", "dirty"] }
			],
			confirmPassword: [
				{ type: "required", message: "DEMO.FORM_VALIDATION.CONFIRM_PASSWORD.REQUIRED", rules: ["touched", "dirty"] },
				{ type: "areEqual", message: "DEMO.FORM_VALIDATION.CONFIRM_PASSWORD.ARE_EQUAL", rules: ["touched", "dirty"] }
			]
		};
	}

	public onSubmitUserDetails(value: FormGroup): void {
		console.log("CCR==========> onSubmitUserDetails value", value);
	}

	public getFormStatus(): void {
		console.log("CCR==========> form status", this.formMatError);
	}
}
