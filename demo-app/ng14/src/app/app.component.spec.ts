import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";

describe("AppComponent", () => {
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(waitForAsync(() => {
		return TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [AppComponent],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
	});

	it("should create the app", () => {
		const app: AppComponent = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});

	it("should render title in a h1 tag", () => {
		fixture.detectChanges();
		const compiled: HTMLElement = fixture.debugElement.nativeElement;
		const h1Element = compiled.querySelector("h1");
		expect(h1Element).toBeTruthy();
		// tslint:disable-next-line:no-non-null-assertion
		expect(h1Element!.textContent).toContain("Ngx-Form-Errors");
	});
});
