/*tslint:disable:completed-docs trackBy-function use-host-property-decorator*/
import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { NgxFormErrorComponent, NgxFormFieldError } from "@nationalbankbelgium/ngx-form-errors";

@Component({
	selector: "app-simple-form-error",
	templateUrl: "./simple-form-error.component.html",
	// TODO use @HostBinding instead
	host: { class: "simple-form-error" }
})
export class SimpleFormErrorComponent implements NgxFormErrorComponent {
	public errors: NgxFormFieldError[] = [];
	public errors$: Observable<NgxFormFieldError[]>;

	public constructor() {
		/* empty constructor */
	}

	public checkForErrors(): void {
		this.errors$.subscribe((errors: NgxFormFieldError[]) => {
			this.errors = errors;
		});
	}
}
