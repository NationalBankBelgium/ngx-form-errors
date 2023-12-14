import { BrowserModule, DomSanitizer } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
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
import { NgxFormsExampleComponent, ReactiveFormsExampleComponent, TemplateDrivenFormsExampleComponent } from "./pages";

@NgModule({
	declarations: [
		AppComponent,
		LanguageSelectorComponent,
		SimpleFormErrorComponent,
		TranslatedFormErrorComponent,
		ReactiveFormsExampleComponent,
		NgxFormsExampleComponent,
		TemplateDrivenFormsExampleComponent,
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
	entryComponents: [SimpleFormErrorComponent, TranslatedFormErrorComponent],
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
