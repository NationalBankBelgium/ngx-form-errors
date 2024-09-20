import { UntypedFormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

/** Error when invalid control is dirty, touched, or submitted. */
export class ParentErrorStateMatcher implements ErrorStateMatcher {
	public isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = !!(form && form.submitted);
		const formGroupValid = !!(form && form.valid);

		return !!control && (control.invalid || !formGroupValid) && (control.dirty || control.touched || isSubmitted);
	}
}
