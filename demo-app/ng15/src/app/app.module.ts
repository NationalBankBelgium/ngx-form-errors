import { BrowserModule, DomSanitizer } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatLegacyCardModule as MatCardModule } from "@angular/material/legacy-card";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacyListModule as MatListModule } from "@angular/material/legacy-list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NgxFormErrorsMessageService, NgxFormErrorsModule } from "@nationalbankbelgium/ngx-form-errors";
import { AppComponent } from "./app.component";
import { initializeTranslation } from "./translation.config";
import { AppRoutingModule } from "./app-routing.module";
import {
	CardComponent,
	LanguageSelectorComponent,
	NavigationComponent,
	SimpleFormErrorComponent,
	TranslatedFormErrorComponent
} from "./components";
import {
	NgxFormsExampleComponent,
	ReactiveFormsExampleComponent,
	TemplateDrivenFormsExampleComponent,
	TypedReactiveFormsExampleComponent
} from "./pages";

/* eslint-disable */
@NgModule({
	declarations: [
		AppComponent,
		LanguageSelectorComponent,
		SimpleFormErrorComponent,
		TranslatedFormErrorComponent,
		ReactiveFormsExampleComponent,
		NgxFormsExampleComponent,
		TemplateDrivenFormsExampleComponent,
		TypedReactiveFormsExampleComponent,
		NavigationComponent,
		CardComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCardModule,
		MatFormFieldModule,
		MatGridListModule,
		MatInputModule,
		MatToolbarModule,
		MatListModule,
		MatSidenavModule,
		MatIconModule,
		ReactiveFormsModule,
		TranslateModule.forRoot(),
		NgxFormErrorsModule.forRoot({
			formErrorComponent: TranslatedFormErrorComponent
		})
	],
	exports: [LanguageSelectorComponent],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
	public constructor(
		private translateService: TranslateService,
		private errorMessageService: NgxFormErrorsMessageService,
		iconRegistry: MatIconRegistry,
		sanitizer: DomSanitizer
	) {
		initializeTranslation(this.translateService);

		iconRegistry.addSvgIcon("github", sanitizer.bypassSecurityTrustResourceUrl("assets/img/github-icon.svg"));

		this.errorMessageService.addErrorMessages({
			required: "DEMO.FORM_VALIDATION.WITH_NGX_FORM_ERRORS.REQUIRED",
			"matchingPasswords.password.required": "DEMO.FORM_VALIDATION.WITH_NGX_FORM_ERRORS.PASSWORD_REQUIRED",
			minlength: "DEMO.FORM_VALIDATION.WITH_NGX_FORM_ERRORS.PASSWORD.MIN_LENGTH",
			maxlength: "DEMO.FORM_VALIDATION.WITH_NGX_FORM_ERRORS.PASSWORD.MAX_LENGTH",
			pattern: "DEMO.FORM_VALIDATION.WITH_NGX_FORM_ERRORS.PASSWORD.PATTERN"
		});

		this.errorMessageService.addFieldNames({
			username: "DEMO.FIELDS.USER_NAME",
			"matchingPasswords.password": "not used, the alias defined via the directive takes precedence over this",
			"matchingPasswords.confirmPassword": "DEMO.FIELDS.CONFIRM_PASSWORD"
		});
	}
}
