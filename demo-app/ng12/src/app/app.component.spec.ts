import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { RouterTestingModule } from "@angular/router/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("AppComponent", () => {
	let fixture: ComponentFixture<AppComponent>;
	let component: AppComponent;

	beforeEach(waitForAsync(() => {
		return TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [AppComponent],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create the app", () => {
		expect(fixture).toBeDefined();
		expect(component).toBeDefined();
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
