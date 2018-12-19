/*tslint:disable:completed-docs trackBy-function use-host-property-decorator*/
import { Component, OnInit } from "@angular/core";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { NgxFormErrorComponent, NgxFormFieldError } from "@nationalbankbelgium/ngx-form-errors";

@Component({
	selector: "app-translated-form-error",
	templateUrl: "./translated-form-error.component.html",
	// TODO use @HostBinding instead
	host: { class: "translated-form-error" }
})
export class TranslatedFormErrorComponent implements NgxFormErrorComponent, OnInit {
	public errors: NgxFormFieldError[] = [];
	public errors$: Observable<NgxFormFieldError[]>;
	public fieldName: string;

	public constructor(public translateService: TranslateService) {}

	public ngOnInit(): void {
		this.translateService.onLangChange.subscribe((_ev: LangChangeEvent) => {
			this.translateFieldName();
		});
	}

	public checkForErrors(): void {
		this.errors$.subscribe((errors: NgxFormFieldError[]) => {
			// the formField can be retrieved from the "fieldName" param of any of the errors
			if (errors.length) {
				this.fieldName = errors[0].params.fieldName;
			}

			this.errors = errors;
			this.translateFieldName();
		});
	}

	public translateFieldName(): void {
		for (const error of this.errors) {
			console.log("-------- translating error.params.fieldName", this.fieldName);
			error.params = { ...error.params, fieldName: this.translateService.instant(this.fieldName) };
		}
	}

	public getErrorClass(): string {
		return this.errors.length > 2 ? "maximum-height" : "small-height";
	}
}
