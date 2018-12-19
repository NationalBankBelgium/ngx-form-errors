/*tslint:disable:completed-docs*/
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { TranslateModule } from "@ngx-translate/core";
import { NgxFormErrorsModule } from "@nationalbankbelgium/ngx-form-errors";
import { AppComponent } from "./app.component";
import { LanguageSelectorComponent } from "./components/language-selector";
import { SimpleFormErrorComponent } from "./components/simple-form-error";

describe("AppComponent", () => {
	beforeEach(async(() => {
		return TestBed.configureTestingModule({
			declarations: [AppComponent, LanguageSelectorComponent, SimpleFormErrorComponent],
			imports: [
				FormsModule,
				ReactiveFormsModule,
				MatButtonToggleModule,
				MatCardModule,
				MatFormFieldModule,
				MatInputModule,
				NoopAnimationsModule,
				NgxFormErrorsModule.forRoot({
					formErrorComponent: SimpleFormErrorComponent
				}),
				TranslateModule.forRoot()
			]
		})
			.overrideModule(BrowserDynamicTestingModule, {
				set: {
					entryComponents: [SimpleFormErrorComponent]
				}
			})
			.compileComponents();
	}));

	it("should create the app", () => {
		const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
		const app: AppComponent = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});

	it("should render title in a h1 tag", () => {
		const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const compiled: HTMLElement = fixture.debugElement.nativeElement;
		expect(compiled.querySelector("h1").textContent).toContain("Ngx-Form-Errors");
	});
});
