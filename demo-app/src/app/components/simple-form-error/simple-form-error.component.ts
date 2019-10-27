import { Component, HostBinding } from "@angular/core";
import { Observable } from "rxjs";
import { NgxFormErrorComponent, NgxFormFieldError } from "@nationalbankbelgium/ngx-form-errors";

@Component({
	selector: "app-simple-form-error",
	templateUrl: "./simple-form-error.component.html"
})
export class SimpleFormErrorComponent implements NgxFormErrorComponent {
	@HostBinding("class")
	public cssClass = "simple-form-error";

	public errors: NgxFormFieldError[] = [];
	public errors$!: Observable<NgxFormFieldError[]>;

	public constructor() {
		/* empty constructor */
	}

	public subscribeToErrors(): void {
		this.errors$.subscribe((errors: NgxFormFieldError[]) => {
			this.errors = errors;
		});
	}

	public trackError(index: number): number {
		return index;
	}
}
