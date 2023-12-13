import { Component, ViewChild } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed } from "@angular/core/testing";
import { NgxFormErrorsGroupDirective } from "./form-errors-group.directive";

describe("NgxFormErrorsGroupDirective", () => {
	const groupName = "dummy-group";

	@Component({
		selector: "test-component",
		template: getTemplate("ngxFormErrorsGroup='{{ dummyGroup }}'")
	})
	class TestComponent {
		public dummyGroup: string = groupName;

		@ViewChild(NgxFormErrorsGroupDirective, { static: false })
		public formErrorGroup!: NgxFormErrorsGroupDirective;
	}

	let fixture: ComponentFixture<TestComponent>;
	let component: TestComponent;

	function getTemplate(formErrorsGroupDirective: string): string {
		return "<div " + formErrorsGroupDirective + "></div>";
	}

	function initializeComponentFixture(): void {
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		// trigger initial data binding
		fixture.detectChanges();
	}

	beforeEach(() => {
		return TestBed.configureTestingModule({
			declarations: [NgxFormErrorsGroupDirective, TestComponent]
		});
	});

	describe("when group is defined", () => {
		beforeEach(fakeAsync(() => {
			// compile template and css
			return TestBed.compileComponents();
		}));

		beforeEach(() => {
			initializeComponentFixture();
		});

		it("should set the group correctly", () => {
			expect(component.dummyGroup).toBe(groupName);
			expect(component.formErrorGroup).toBeDefined();
			expect(component.formErrorGroup.group).toBe(groupName);
		});
	});

	describe("when group is not defined", () => {
		beforeEach(fakeAsync(() => {
			// the directive should not be used with square brackets "[]" because the input is an string literal!
			const newTemplate: string = getTemplate("ngxFormErrorsGroup");

			TestBed.overrideTemplate(TestComponent, newTemplate);

			// compile template and css
			return TestBed.compileComponents();
		}));

		it("should throw an error", () => {
			expect(() => initializeComponentFixture()).toThrowError(/no group/);
		});
	});
});
