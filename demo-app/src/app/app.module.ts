import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgxFormErrorsMessageService, NgxFormErrorsModule } from "@nationalbankbelgium/ngx-form-errors";
import { AppComponent } from "./app.component";
import { initializeTranslation } from "./translation.config";
import { LanguageSelectorComponent, SimpleFormErrorComponent, TranslatedFormErrorComponent } from "./components";
import { MatCardModule } from "@angular/material/card";

@NgModule({
	declarations: [AppComponent, LanguageSelectorComponent, SimpleFormErrorComponent, TranslatedFormErrorComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		MatButtonToggleModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		TranslateModule.forRoot(),
		NgxFormErrorsModule.forRoot({
			formErrorComponent: TranslatedFormErrorComponent
		})
	],
	exports: [LanguageSelectorComponent],
	providers: [],
	entryComponents: [SimpleFormErrorComponent, TranslatedFormErrorComponent],
	bootstrap: [AppComponent]
})
export class AppModule {
	public constructor(private translateService: TranslateService, private errorMessageService: NgxFormErrorsMessageService) {
		initializeTranslation(this.translateService);

		errorMessageService.addErrorMessages({
			required: "DEMO.FORM_VALIDATION.FULL_NAME.REQUIRED",
			"form-group.required": "DEMO.DEMO.BUTTON.TITLE",
			minlength: "DEMO.FORM_VALIDATION.FULL_NAME.MIN_LENGTH",
			maxlength: "DEMO.FORM_VALIDATION.FULL_NAME.MAX_LENGTH",
			pattern: "DEMO.FORM_VALIDATION.FULL_NAME.PATTERN"
		});

		errorMessageService.addFieldNames({
			"some-whatever-type.fullname": "DEMO.FIELDS.fullname2"
		});
	}
}
