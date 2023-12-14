import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

/** Error when invalid control is dirty, touched, or submitted. */
export class ParentErrorStateMatcher implements ErrorStateMatcher {
	public isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = !!(form && form.submitted);
		const formGroupValid = !!(form && form.valid);

		return !!((control && control.invalid && (control.dirty || control.touched)) || isSubmitted || formGroupValid);
	}
}
