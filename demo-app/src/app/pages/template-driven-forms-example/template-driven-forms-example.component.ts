/*tslint:disable:trackBy-function template-cyclomatic-complexity*/
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { ParentErrorStateMatcher } from "../../parent-error-state-matcher";

@Component({
	selector: "app-template-driven-forms-example",
	templateUrl: "./template-driven-forms-example.component.html",
	styleUrls: ["./template-driven-forms-example.component.scss"]
})
export class TemplateDrivenFormsExampleComponent implements OnInit {
	public username: string;
	public password: string;
	public confirmPassword: string;

	public parentErrorStateMatcher: ErrorStateMatcher = new ParentErrorStateMatcher();
	public passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$";
	public validationMessages: { [key: string]: { type: string; message: string }[] };
	public showValidationDetails = false;
	public showValidationSummary = true;

	public constructor() {
		/*empty*/
	}

	public ngOnInit(): void {
		this.validationMessages = {
			username: [
				{
					type: "required",
					message: "DEMO.FORM_VALIDATION.WITHOUT_NGX_FORM_ERRORS.USER_NAME.REQUIRED"
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

	public onSubmitUserDetails(ngForm: NgForm): void {
		console.log("Submitted form:", ngForm.value);
	}

	public getFormStatus(ngForm: NgForm): void {
		console.log("Form status", ngForm);
	}
}
