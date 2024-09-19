/* eslint-disable @angular-eslint/template/use-track-by-function, @angular-eslint/template/cyclomatic-complexity */
import { Component } from "@angular/core";
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { ParentErrorStateMatcher } from "../../parent-error-state-matcher";
import { PasswordValidator } from "../../password-validator";

@Component({
	selector: "app-ngx-forms-example",
	templateUrl: "./ngx-forms-example.component.html",
	styleUrls: ["./ngx-forms-example.component.scss"]
})
export class NgxFormsExampleComponent {
	public formGroup: UntypedFormGroup;
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
