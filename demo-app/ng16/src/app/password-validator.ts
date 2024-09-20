import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors } from "@angular/forms";
import { MatchingPassword } from "./pages";

export class PasswordValidator {
	// Inspired on: http://plnkr.co/edit/Zcbg2T3tOxYmhxs7vaAm?p=preview
	public static areEqual(formGroup: UntypedFormGroup): ValidationErrors | null {
		let value: string | undefined;
		let valid = true;
		for (const key in formGroup.controls) {
			/* eslint-disable-next-line no-prototype-builtins */
			if (formGroup.controls.hasOwnProperty(key)) {
				const control: UntypedFormControl = <UntypedFormControl>formGroup.controls[key];

				if (value === undefined) {
					value = control.value;
				} else {
					if (value !== control.value) {
						valid = false;
						break;
					}
				}
			}
		}

		if (valid) {
			/* eslint-disable-next-line no-null/no-null */
			return null;
		}

		return {
			areEqual: true
		};
	}

	public static areEqualTyped(formGroup: AbstractControl<MatchingPassword>): ValidationErrors | null {
		const matchingPassword = formGroup.value;

		if (matchingPassword.password === matchingPassword.confirmPassword) {
			/* eslint-disable-next-line no-null/no-null */
			return null;
		}
		return {
			areEqual: true
		};
	}
}
