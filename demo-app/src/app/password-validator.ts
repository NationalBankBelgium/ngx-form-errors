/*tslint:disable:completed-docs*/
import { FormControl, FormGroup, ValidationErrors } from "@angular/forms";

export class PasswordValidator {
	// Inspired on: http://plnkr.co/edit/Zcbg2T3tOxYmhxs7vaAm?p=preview
	public static areEqual(formGroup: FormGroup): ValidationErrors | null {
		let value: string | undefined;
		let valid: boolean = true;
		for (const key in formGroup.controls) {
			if (formGroup.controls.hasOwnProperty(key)) {
				const control: FormControl = <FormControl>formGroup.controls[key];

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
			return null;
		}

		return {
			areEqual: true
		};
	}
}
