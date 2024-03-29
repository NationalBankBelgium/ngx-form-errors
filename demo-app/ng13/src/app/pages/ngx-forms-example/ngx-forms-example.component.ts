/* eslint-disable @angular-eslint/template/use-track-by-function, @angular-eslint/template/cyclomatic-complexity */
import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { ParentErrorStateMatcher } from "../../parent-error-state-matcher";
import { PasswordValidator } from "../../password-validator";

@Component({
	selector: "app-ngx-forms-example",
	templateUrl: "./ngx-forms-example.component.html",
	styleUrls: ["./ngx-forms-example.component.scss"]
})
export class NgxFormsExampleComponent {
	public formGroup: FormGroup;
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
					validators: (formGroup: AbstractControl): ValidationErrors | null => PasswordValidator.areEqual(<FormGroup>formGroup)
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

	public onSubmitUserDetails(formGroup: FormGroup): void {
		console.log("Submitted form:", formGroup.value);
	}

	public getFormStatus(): void {
		console.log("Form status", this.formGroup);
	}
}
