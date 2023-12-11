import { Component, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ComponentFixture, fakeAsync, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { Observable, Observer } from "rxjs";
import { NgxFormErrorsGroupDirective } from "./form-errors-group.directive";
import { NgxFormErrorsDirective } from "./form-errors.directive";
import { NgxFormErrorsMessageService } from "../services";
import { NGX_FORM_ERRORS_CONFIG, NgxFormErrorsConfig } from "../form-errors-config.intf";
import { NgxFormErrorComponent } from "../form-error-component.intf";
import { NgxFormFieldError } from "../form-error.intf";
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

describe("NgxFormErrorsDirective", () => {
	const templateWithFormControl = `
			<form [formGroup]="formNgxError" class="form-group">
				<input matInput placeholder="Full Name" [formControlName]="formControlName"/>
				<ng-template [ngxFormErrors]="formControlName"></ng-template>
			</form>
		`;

	const templateWithLazyFormErrorDirective = `
			<form [formGroup]="formNgxError" class="form-group">
				<input matInput placeholder="Full Name" [formControlName]="formControlName"/>
				<ng-template [ngxFormErrors]="formControlName"></ng-template>
				<ng-template [ngxFormErrors]="formControlName" *ngIf="instantiateLazyFormErrorDirective"></ng-template>
			</form>
		`;

	const templateWithInvalidFormControlName = `
			<form [formGroup]="formNgxError" class="form-group">
				<input matInput placeholder="Full Name" [formControlName]="formControlName"/>
				<ng-template ngxFormErrors="whatever"></ng-template>
			</form>
		`;

	const templateWithFormControlAndAlias = `
			<form [formGroup]="formNgxError" class="form-group">
				<input matInput placeholder="Full Name" [formControlName]="formControlName"/>
				<ng-template [ngxFormErrors]="formControlName" [ngxFormErrorsFieldName]="formControlAlias"></ng-template>
			</form>
		`;

	const templateWithFormControlAndFormGroup = `
			<form [formGroup]="formNgxError" class="form-group" ngxFormErrorsGroup="test-form-group">
				<input matInput placeholder="Full Name" [formControlName]="formControlName"/>
				<ng-template [ngxFormErrors]="formControlName"></ng-template>
			</form>
		`;

	const formControlName = "fullName";
	const formControlAlias = "complete name";
	const subFormGroupName = "person";
	const minlengthErrorMessage = "the value should not contain less than X chars";
	const requiredErrorMessage = "the field is mandatory";

	@Component({
		selector: "test-component",
		template: templateWithFormControl
	})
	class TestComponent {
		public formNgxError: FormGroup;
		public formControlName: string = formControlName;
		public formControlAlias: string = formControlAlias;
		public instantiateLazyFormErrorDirective = false;

		@ViewChild(NgxFormErrorsDirective, { static: false })
		public formErrorsDirective!: NgxFormErrorsDirective;

		public constructor(public formBuilder: FormBuilder) {
			this.formNgxError = this.formBuilder.group({
				[this.formControlName]: [
					"John Doe",
					Validators.compose([Validators.minLength(3), Validators.maxLength(8), Validators.required])
				]
			});
		}
	}

	@Component({
		selector: "test-with-sub-formgroup-component",
		template: `
			<form [formGroup]="formNgxError" class="form-group">
				<form [formGroupName]="subFormGroupName" [ngxFormErrorsGroup]="subFormGroupName">
					<input matInput placeholder="Full Name" [formControlName]="formControlName" />
					<ng-template [ngxFormErrors]="formControlName"></ng-template>
				</form>
			</form>
		`
	})
	class TestWithSubFormGroupComponent {
		public formNgxError: FormGroup;
		public formControlName: string = formControlName;
		public subFormGroupName: string = subFormGroupName;

		@ViewChild(NgxFormErrorsDirective, { static: false })
		public formErrorsDirective!: NgxFormErrorsDirective;

		public constructor(public formBuilder: FormBuilder) {
			this.formNgxError = this.formBuilder.group({
				[this.subFormGroupName]: this.formBuilder.group({
					[this.formControlName]: [
						"John Doe",
						Validators.compose([Validators.minLength(3), Validators.maxLength(8), Validators.required])
					]
				})
			});
		}
	}

	@Component({
		selector: "form-error",
		template: `
			<div>some content here</div>
		`
	})
	class FormErrorComponent implements NgxFormErrorComponent {
		public errors$!: Observable<NgxFormFieldError[]>;

		public subscribeToErrors(): void {
			/*empty*/
		}
	}

	let fixture: ComponentFixture<TestComponent>;
	let component: TestComponent;
	let mockFormErrorsMessageService: SpyObj<NgxFormErrorsMessageService>;
	let mockFormErrorsConfig: NgxFormErrorsConfig;
	let mockObserver: SpyObj<Observer<any>>;
	
	const invalidValues: any[] = ["na", "too long value", "", undefined];

	function initializeComponentFixture(): void {
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		// trigger initial data binding
		fixture.detectChanges();
	}

	beforeEach(() => {
		mockFormErrorsMessageService = createSpyObj<NgxFormErrorsMessageService>("NgxFormErrorsMessageServiceMock", [
			"addErrorMessages",
			"getErrorMessages",
			"findErrorMessage",
			"addFieldNames",
			"getFieldNames",
			"getFieldName"
		]);

		mockFormErrorsConfig = { formErrorComponent: FormErrorComponent };

		mockObserver = createSpyObj<Observer<any>>("observerSpy", ["next", "error", "complete"]);

		return TestBed.configureTestingModule({
			declarations: [
				NgxFormErrorsDirective,
				NgxFormErrorsGroupDirective,
				TestComponent,
				TestWithSubFormGroupComponent,
				FormErrorComponent
			],
			imports: [FormsModule, ReactiveFormsModule],
			providers: [
				{ provide: NgxFormErrorsMessageService, useValue: mockFormErrorsMessageService },
				{ provide: NGX_FORM_ERRORS_CONFIG, useValue: mockFormErrorsConfig }
			]
		}).overrideModule(BrowserDynamicTestingModule, {
			// add entryComponent to TestingModule (suggested in https://github.com/angular/angular/issues/12079)
			set: { entryComponents: [FormErrorComponent] }
		});
	});

	describe("on initialization", () => {
		describe("success", () => {
			beforeEach(fakeAsync(() => {
				// compile template and css
				return TestBed.compileComponents();
			}));

			beforeEach(() => {
				initializeComponentFixture();
			});

			it("should bind the form group correctly", () => {
				expect(component.formNgxError).toBeDefined();
				expect(component.formErrorsDirective).toBeDefined();

				const formErrorsDirective: NgxFormErrorsDirective = component.formErrorsDirective;

				expect(formErrorsDirective._formControl).toBeDefined();
				expect(formErrorsDirective._formControl).toBe(component.formNgxError.controls[formControlName]);
			});

			it("should dynamically create the formErrorComponent", () => {
				const formErrorsDirective: NgxFormErrorsDirective = component.formErrorsDirective;
				expect(formErrorsDirective._componentRef).toBeDefined();
				expect(formErrorsDirective._componentRef.instance).toBeDefined();
				expect(formErrorsDirective._componentRef.instance instanceof FormErrorComponent).toBe(true);
			});

			it("should make the formErrorComponent to subscribe to the controlErrors observable", () => {
				const formErrorsDirective: NgxFormErrorsDirective = component.formErrorsDirective;

				expect(formErrorsDirective._componentRef.instance.errors$).toBe(formErrorsDirective._controlErrors$);
				// TODO: how to check whether the component has subscribed to the observable?
			});
		});

		describe("failure", () => {
			describe("when config is invalid", () => {
				beforeEach(fakeAsync(() => {
					TestBed.overrideProvider(NGX_FORM_ERRORS_CONFIG, { useValue: {} });
					// compile template and css
					return TestBed.compileComponents();
				}));

				it("should throw an error when the formErrorComponent in the NgxFormErrorsConfig object is not provided", () => {
					expect(() => initializeComponentFixture()).toThrowError(/no form error/);
				});
			});

			describe("when form control is invalid", () => {
				beforeEach(fakeAsync(() => {
					TestBed.overrideTemplate(TestComponent, templateWithInvalidFormControlName);
					// compile template and css
					return TestBed.compileComponents();
				}));

				it("should throw an error when a form control with the given name cannot be found", () => {
					expect(() => initializeComponentFixture()).toThrowError(/Control .* not found in Form/);
				});
			});
		});
	});

	describe("on form control changes", () => {
		beforeEach(fakeAsync(() => {
			// compile template and css
			return TestBed.compileComponents();
		}));

		beforeEach(() => {
			initializeComponentFixture();
		});

		it("should emit the validation errors every time the value of the form control changes", () => {
			const formErrorsDirective: NgxFormErrorsDirective = component.formErrorsDirective;
			formErrorsDirective._controlErrors$.subscribe(mockObserver);

			const formControl: FormControl = <FormControl>component.formNgxError.controls[formControlName]; /// or <FormControl>formErrorsDirective.formControl;
			const valueChanges: any[] = ["first", "second", ...invalidValues];

			for (const value of valueChanges) {
				formControl.setValue(value);
			}

			expect(mockObserver.next).toHaveBeenCalledTimes(7); // initial emit + 6 value changes
			expect(mockObserver.next.calls.argsFor(0)[0]).toEqual([]); // initial emit
			for (let idx = 0; idx < valueChanges.length; idx++) {
				const emittedValidationErrors: NgxFormFieldError[] = mockObserver.next.calls.argsFor(idx + 1)[0];
				if (invalidValues.indexOf(valueChanges[idx]) !== -1) {
					expect(emittedValidationErrors.length).toBeGreaterThan(0);
				} else {
					expect(emittedValidationErrors).toEqual([]); // no validation errors
				}
			}

			expect(mockObserver.error).not.toHaveBeenCalled();
			expect(mockObserver.complete).not.toHaveBeenCalled(); // the changes observable should never complete!
		});

		it("should emit the validation errors array containing NgxFormFieldError objects", () => {
			const formErrorsDirective: NgxFormErrorsDirective = component.formErrorsDirective;
			formErrorsDirective._controlErrors$.subscribe(mockObserver);

			const formControl: FormControl = <FormControl>component.formNgxError.controls[formControlName];
			const valueChanges: any[] = [...invalidValues]; // just invalid values

			for (const value of valueChanges) {
				formControl.setValue(value);
			}

			expect(mockObserver.next).toHaveBeenCalledTimes(5); // initial emit + 4 value changes
			expect(mockObserver.next.calls.argsFor(0)[0]).toEqual([]); // initial emit

			const expectedValidationErrors: NgxFormFieldError[] = [
				{
					error: "minlength",
					formControlName: formControlName,
					message: "minlength",
					params: { fieldName: formControlName, requiredLength: 3, actualLength: 2 }
				},
				{
					error: "maxlength",
					formControlName: formControlName,
					message: "maxlength",
					params: { fieldName: formControlName, requiredLength: 8, actualLength: 14 }
				},
				{
					error: "required",
					formControlName: formControlName,
					message: "required",
					params: { fieldName: formControlName }
				},
				{
					error: "required",
					formControlName: formControlName,
					message: "required",
					params: { fieldName: formControlName }
				}
			];

			for (let idx = 0; idx < valueChanges.length; idx++) {
				const emittedValidationErrors: NgxFormFieldError[] = mockObserver.next.calls.argsFor(idx + 1)[0];
				expect(emittedValidationErrors.length).toBe(1);
				expect(emittedValidationErrors[0]).toEqual(expectedValidationErrors[idx]);
			}

			expect(mockObserver.error).not.toHaveBeenCalled();
			expect(mockObserver.complete).not.toHaveBeenCalled(); // the changes observable should never complete!
		});
	});

	describe("emitted validation errors", () => {
		describe("when no error group is defined", () => {
			beforeEach(fakeAsync(() => {
				// compile template and css
				return TestBed.compileComponents();
			}));

			beforeEach(() => {
				initializeComponentFixture();
			});

			it("should contain the message defined via the NgxFormErrorsMessageService for that specific validation or just the validation name if no message defined", () => {
				const formErrorsDirective: NgxFormErrorsDirective = component.formErrorsDirective;
				formErrorsDirective._controlErrors$.subscribe(mockObserver);

				const errorMessages: object = {
					minlength: minlengthErrorMessage,
					[`${formControlName}.required`]: requiredErrorMessage
				};

				mockFormErrorsMessageService.findErrorMessage.and.callFake((errorKey: string, formCtrlName: string, errorGroup: string) => {
					expect(errorGroup).toBeUndefined();
					expect(formCtrlName).toBe(formControlName);
					return errorMessages[`${formCtrlName}.${errorKey}`] || errorMessages[errorKey] || undefined;
				});

				const formControl: FormControl = <FormControl>component.formNgxError.controls[formControlName];
				const valueChanges: any[] = [...invalidValues]; // just invalid values

				for (const value of valueChanges) {
					formControl.setValue(value);
				}

				expect(mockObserver.next).toHaveBeenCalledTimes(5); // initial emit + 4 value changes
				expect(mockObserver.next.calls.argsFor(0)[0]).toEqual([]); // initial emit

				const expectedValidationErrors: NgxFormFieldError[] = [
					{
						error: "minlength",
						formControlName: formControlName,
						message: errorMessages["minlength"],
						params: { fieldName: formControlName, requiredLength: 3, actualLength: 2 }
					},
					{
						error: "maxlength",
						formControlName: formControlName,
						message: "maxlength", // no message defined via the service
						params: { fieldName: formControlName, requiredLength: 8, actualLength: 14 }
					},
					{
						error: "required",
						formControlName: formControlName,
						message: errorMessages[`${formControlName}.required`],
						params: { fieldName: formControlName }
					},
					{
						error: "required",
						formControlName: formControlName,
						message: errorMessages[`${formControlName}.required`],
						params: { fieldName: formControlName }
					}
				];

				for (let idx = 0; idx < valueChanges.length; idx++) {
					const emittedValidationErrors: NgxFormFieldError[] = mockObserver.next.calls.argsFor(idx + 1)[0];
					expect(emittedValidationErrors.length).toBe(1);
					expect(emittedValidationErrors[0]).toEqual(expectedValidationErrors[idx]);
				}

				expect(mockObserver.error).not.toHaveBeenCalled();
				expect(mockObserver.complete).not.toHaveBeenCalled(); // the changes observable should never complete!
			});

			it("should contain the field name (alias) defined via the NgxFormErrorsMessageService for the form control or just the control name if no alias defined", () => {
				const formErrorsDirective: NgxFormErrorsDirective = component.formErrorsDirective;
				formErrorsDirective._controlErrors$.subscribe(mockObserver);

				const fieldNames: object = {
					[formControlName]: formControlAlias
				};

				mockFormErrorsMessageService.getFieldName.and.callFake((fieldName: string, errorGroup: string) => {
					expect(errorGroup).toBeUndefined();
					return fieldNames[fieldName] || undefined;
				});

				const formControl: FormControl = <FormControl>component.formNgxError.controls[formControlName];
				const valueChanges: any[] = [...invalidValues]; // just invalid values

				for (const value of valueChanges) {
					formControl.setValue(value);
				}

				expect(mockObserver.next).toHaveBeenCalledTimes(5); // initial emit + 4 value changes
				expect(mockObserver.next.calls.argsFor(0)[0]).toEqual([]); // initial emit

				const expectedValidationErrors: NgxFormFieldError[] = [
					{
						error: "minlength",
						formControlName: formControlName,
						message: "minlength",
						params: { fieldName: fieldNames[formControlName], requiredLength: 3, actualLength: 2 }
					},
					{
						error: "maxlength",
						formControlName: formControlName,
						message: "maxlength",
						params: { fieldName: fieldNames[formControlName], requiredLength: 8, actualLength: 14 }
					},
					{
						error: "required",
						formControlName: formControlName,
						message: "required",
						params: { fieldName: fieldNames[formControlName] }
					},
					{
						error: "required",
						formControlName: formControlName,
						message: "required",
						params: { fieldName: fieldNames[formControlName] }
					}
				];

				for (let idx = 0; idx < valueChanges.length; idx++) {
					const emittedValidationErrors: NgxFormFieldError[] = mockObserver.next.calls.argsFor(idx + 1)[0];
					expect(emittedValidationErrors.length).toBe(1);
					expect(emittedValidationErrors[0]).toEqual(expectedValidationErrors[idx]);
				}

				delete fieldNames[formControlName]; // deleting the existing field name
				formControl.reset();
				mockObserver.next.calls.reset();

				for (const value of valueChanges) {
					formControl.setValue(value);
				}

				expect(mockObserver.next).toHaveBeenCalledTimes(4); // 4 value changes
				for (let idx = 0; idx < valueChanges.length; idx++) {
					const expectedValidationErrorParams: object = expectedValidationErrors[idx].params;
					// reset the fieldName to the form control name
					const expectedValidationError: NgxFormFieldError = {
						...expectedValidationErrors[idx],
						params: {
							...expectedValidationErrorParams,
							fieldName: expectedValidationErrors[idx].formControlName
						}
					};

					const emittedValidationErrors: NgxFormFieldError[] = mockObserver.next.calls.argsFor(idx)[0];
					expect(emittedValidationErrors.length).toBe(1);
					expect(emittedValidationErrors[0]).toEqual(expectedValidationError);
				}

				expect(mockObserver.error).not.toHaveBeenCalled();
				expect(mockObserver.complete).not.toHaveBeenCalled(); // the changes observable should never complete!
			});
		});

		describe("when error group is defined", () => {
			const formErrorGroup = "test-form-group";

			beforeEach(fakeAsync(() => {
				TestBed.overrideTemplate(TestComponent, templateWithFormControlAndFormGroup);
				// compile template and css
				return TestBed.compileComponents();
			}));

			beforeEach(() => {
				initializeComponentFixture();
			});

			it("should contain the message defined via the NgxFormErrorsMessageService for that specific validation or just the validation name if no message defined", () => {
				const formErrorsDirective: NgxFormErrorsDirective = component.formErrorsDirective;
				formErrorsDirective._controlErrors$.subscribe(mockObserver);

				const errorMessages: object = {
					minlength: "should not be used",
					required: requiredErrorMessage,
					[`${formErrorGroup}.minlength`]: minlengthErrorMessage
				};

				mockFormErrorsMessageService.findErrorMessage.and.callFake((errorKey: string, formCtrlName: string, errorGroup: string) => {
					expect(errorGroup).toBe(formErrorGroup);
					expect(formCtrlName).toBe(formControlName);
					return errorMessages[`${errorGroup}.${errorKey}`] || errorMessages[errorKey] || undefined;
				});

				const formControl: FormControl = <FormControl>component.formNgxError.controls[formControlName];
				const valueChanges: any[] = [...invalidValues]; // just invalid values

				for (const value of valueChanges) {
					formControl.setValue(value);
				}

				expect(mockObserver.next).toHaveBeenCalledTimes(5); // initial emit + 4 value changes
				expect(mockObserver.next.calls.argsFor(0)[0]).toEqual([]); // initial emit

				const expectedValidationErrors: NgxFormFieldError[] = [
					{
						error: "minlength",
						formControlName: formControlName,
						message: errorMessages[`${formErrorGroup}.minlength`],
						params: { fieldName: formControlName, requiredLength: 3, actualLength: 2 }
					},
					{
						error: "maxlength",
						formControlName: formControlName,
						message: "maxlength", // no message defined via the service
						params: { fieldName: formControlName, requiredLength: 8, actualLength: 14 }
					},
					{
						error: "required",
						formControlName: formControlName,
						message: errorMessages["required"], // generic message (not group specific)
						params: { fieldName: formControlName }
					},
					{
						error: "required",
						formControlName: formControlName,
						message: errorMessages["required"], // generic message (not group specific)
						params: { fieldName: formControlName }
					}
				];

				for (let idx = 0; idx < valueChanges.length; idx++) {
					const emittedValidationErrors: NgxFormFieldError[] = mockObserver.next.calls.argsFor(idx + 1)[0];
					expect(emittedValidationErrors.length).toBe(1);
					expect(emittedValidationErrors[0]).toEqual(expectedValidationErrors[idx]);
				}

				expect(mockObserver.error).not.toHaveBeenCalled();
				expect(mockObserver.complete).not.toHaveBeenCalled(); // the changes observable should never complete!
			});

			it("should contain the field name (alias) defined via the NgxFormErrorsMessageService for the form control or just the control name if no alias defined", () => {
				const formErrorsDirective: NgxFormErrorsDirective = component.formErrorsDirective;
				formErrorsDirective._controlErrors$.subscribe(mockObserver);

				const fieldNames: object = {
					[formControlName]: formControlAlias
				};

				mockFormErrorsMessageService.getFieldName.and.callFake((fieldName: string, errorGroup: string) => {
					expect(errorGroup).toBe(formErrorGroup);
					return fieldNames[fieldName] || undefined;
				});

				const formControl: FormControl = <FormControl>component.formNgxError.controls[formControlName];
				const valueChanges: any[] = [...invalidValues]; // just invalid values

				for (const value of valueChanges) {
					formControl.setValue(value);
				}

				expect(mockObserver.next).toHaveBeenCalledTimes(5); // initial emit + 4 value changes
				expect(mockObserver.next.calls.argsFor(0)[0]).toEqual([]); // initial emit

				const expectedValidationErrors: NgxFormFieldError[] = [
					{
						error: "minlength",
						formControlName: formControlName,
						message: "minlength",
						params: { fieldName: fieldNames[formControlName], requiredLength: 3, actualLength: 2 }
					},
					{
						error: "maxlength",
						formControlName: formControlName,
						message: "maxlength",
						params: { fieldName: fieldNames[formControlName], requiredLength: 8, actualLength: 14 }
					},
					{
						error: "required",
						formControlName: formControlName,
						message: "required",
						params: { fieldName: fieldNames[formControlName] }
					},
					{
						error: "required",
						formControlName: formControlName,
						message: "required",
						params: { fieldName: fieldNames[formControlName] }
					}
				];

				for (let idx = 0; idx < valueChanges.length; idx++) {
					const emittedValidationErrors: NgxFormFieldError[] = mockObserver.next.calls.argsFor(idx + 1)[0];
					expect(emittedValidationErrors.length).toBe(1);
					expect(emittedValidationErrors[0]).toEqual(expectedValidationErrors[idx]);
				}

				delete fieldNames[formControlName]; // deleting the existing field name
				formControl.reset();
				mockObserver.next.calls.reset();

				for (const value of valueChanges) {
					formControl.setValue(value);
				}

				expect(mockObserver.next).toHaveBeenCalledTimes(4); // 4 value changes
				for (let idx = 0; idx < valueChanges.length; idx++) {
					const expectedValidationErrorParams: object = expectedValidationErrors[idx].params;
					// reset the fieldName to the form control name
					const expectedValidationError: NgxFormFieldError = {
						...expectedValidationErrors[idx],
						params: {
							...expectedValidationErrorParams,
							fieldName: expectedValidationErrors[idx].formControlName
						}
					};

					const emittedValidationErrors: NgxFormFieldError[] = mockObserver.next.calls.argsFor(idx)[0];
					expect(emittedValidationErrors.length).toBe(1);
					expect(emittedValidationErrors[0]).toEqual(expectedValidationError);
				}

				expect(mockObserver.error).not.toHaveBeenCalled();
				expect(mockObserver.complete).not.toHaveBeenCalled(); // the changes observable should never complete!
			});
		});

		describe("when sub-formGroup is defined", () => {
			let fixtureWithSubFormGroup: ComponentFixture<TestWithSubFormGroupComponent>;
			let componentWithSubFormGroup: TestWithSubFormGroupComponent;

			beforeEach(() => {
				fixtureWithSubFormGroup = TestBed.createComponent(TestWithSubFormGroupComponent);
				componentWithSubFormGroup = fixtureWithSubFormGroup.componentInstance;
				// trigger initial data binding
				fixtureWithSubFormGroup.detectChanges();
			});

			it("should contain the message defined via the NgxFormErrorsMessageService for that specific validation or just the validation name if no message defined", () => {
				const formErrorsDirective: NgxFormErrorsDirective = componentWithSubFormGroup.formErrorsDirective;
				formErrorsDirective._controlErrors$.subscribe(mockObserver);

				const errorMessages: object = {
					minlength: "should not be used",
					required: requiredErrorMessage,
					[`${subFormGroupName}.minlength`]: minlengthErrorMessage
				};

				mockFormErrorsMessageService.findErrorMessage.and.callFake((errorKey: string, formCtrlName: string, errorGroup: string) => {
					expect(errorGroup).toBe(subFormGroupName);
					expect(formCtrlName).toBe(formControlName);
					return errorMessages[`${errorGroup}.${errorKey}`] || errorMessages[errorKey] || undefined;
				});

				const formControl: FormControl = <FormControl>componentWithSubFormGroup.formNgxError.get(`${subFormGroupName}.${formControlName}`);
				const valueChanges: any[] = [...invalidValues]; // just invalid values

				for (const value of valueChanges) {
					formControl.setValue(value);
				}

				expect(mockObserver.next).toHaveBeenCalledTimes(5); // initial emit + 4 value changes
				expect(mockObserver.next.calls.argsFor(0)[0]).toEqual([]); // initial emit

				const expectedValidationErrors: NgxFormFieldError[] = [
					{
						error: "minlength",
						formControlName: formControlName,
						message: errorMessages[`${subFormGroupName}.minlength`],
						params: { fieldName: formControlName, requiredLength: 3, actualLength: 2 }
					},
					{
						error: "maxlength",
						formControlName: formControlName,
						message: "maxlength", // no message defined via the service
						params: { fieldName: formControlName, requiredLength: 8, actualLength: 14 }
					},
					{
						error: "required",
						formControlName: formControlName,
						message: errorMessages["required"], // generic message (not group specific)
						params: { fieldName: formControlName }
					},
					{
						error: "required",
						formControlName: formControlName,
						message: errorMessages["required"], // generic message (not group specific)
						params: { fieldName: formControlName }
					}
				];

				for (let idx = 0; idx < valueChanges.length; idx++) {
					const emittedValidationErrors: NgxFormFieldError[] = mockObserver.next.calls.argsFor(idx + 1)[0];
					expect(emittedValidationErrors.length).toBe(1);
					expect(emittedValidationErrors[0]).toEqual(expectedValidationErrors[idx]);
				}

				expect(mockObserver.error).not.toHaveBeenCalled();
				expect(mockObserver.complete).not.toHaveBeenCalled(); // the changes observable should never complete!
			});

			it("should contain the field name (alias) defined via the NgxFormErrorsMessageService for the form control or just the control name if no alias defined", () => {
				const formErrorsDirective: NgxFormErrorsDirective = componentWithSubFormGroup.formErrorsDirective;
				formErrorsDirective._controlErrors$.subscribe(mockObserver);

				const fieldNames: object = {
					[formControlName]: formControlAlias
				};

				mockFormErrorsMessageService.getFieldName.and.callFake((fieldName: string, errorGroup: string) => {
					expect(errorGroup).toBe(subFormGroupName);
					return fieldNames[fieldName] || undefined;
				});

				const formControl: FormControl = <FormControl>componentWithSubFormGroup.formNgxError.get(`${subFormGroupName}.${formControlName}`);
				const valueChanges: any[] = [...invalidValues]; // just invalid values

				for (const value of valueChanges) {
					formControl.setValue(value);
				}

				expect(mockObserver.next).toHaveBeenCalledTimes(5); // initial emit + 4 value changes
				expect(mockObserver.next.calls.argsFor(0)[0]).toEqual([]); // initial emit

				const expectedValidationErrors: NgxFormFieldError[] = [
					{
						error: "minlength",
						formControlName: formControlName,
						message: "minlength",
						params: { fieldName: fieldNames[formControlName], requiredLength: 3, actualLength: 2 }
					},
					{
						error: "maxlength",
						formControlName: formControlName,
						message: "maxlength",
						params: { fieldName: fieldNames[formControlName], requiredLength: 8, actualLength: 14 }
					},
					{
						error: "required",
						formControlName: formControlName,
						message: "required",
						params: { fieldName: fieldNames[formControlName] }
					},
					{
						error: "required",
						formControlName: formControlName,
						message: "required",
						params: { fieldName: fieldNames[formControlName] }
					}
				];

				for (let idx = 0; idx < valueChanges.length; idx++) {
					const emittedValidationErrors: NgxFormFieldError[] = mockObserver.next.calls.argsFor(idx + 1)[0];
					expect(emittedValidationErrors.length).toBe(1);
					expect(emittedValidationErrors[0]).toEqual(expectedValidationErrors[idx]);
				}

				delete fieldNames[formControlName]; // deleting the existing field name
				formControl.reset();
				mockObserver.next.calls.reset();

				for (const value of valueChanges) {
					formControl.setValue(value);
				}

				expect(mockObserver.next).toHaveBeenCalledTimes(4); // 4 value changes
				for (let idx = 0; idx < valueChanges.length; idx++) {
					const expectedValidationErrorParams: object = expectedValidationErrors[idx].params;
					// reset the fieldName to the form control name
					const expectedValidationError: NgxFormFieldError = {
						...expectedValidationErrors[idx],
						params: {
							...expectedValidationErrorParams,
							fieldName: expectedValidationErrors[idx].formControlName
						}
					};

					const emittedValidationErrors: NgxFormFieldError[] = mockObserver.next.calls.argsFor(idx)[0];
					expect(emittedValidationErrors.length).toBe(1);
					expect(emittedValidationErrors[0]).toEqual(expectedValidationError);
				}

				expect(mockObserver.error).not.toHaveBeenCalled();
				expect(mockObserver.complete).not.toHaveBeenCalled(); // the changes observable should never complete!
			});
		});

		describe("when an alias is provided in the directive", () => {
			beforeEach(fakeAsync(() => {
				TestBed.overrideTemplate(TestComponent, templateWithFormControlAndAlias);
				// compile template and css
				return TestBed.compileComponents();
			}));

			beforeEach(() => {
				initializeComponentFixture();
			});

			it("should take precedence over the alias provided via the NgxFormErrorsMessageService", () => {
				const formErrorsDirective: NgxFormErrorsDirective = component.formErrorsDirective;
				formErrorsDirective._controlErrors$.subscribe(mockObserver);

				const fieldNames: object = {
					[formControlName]: "some alias that should be overridden"
				};

				mockFormErrorsMessageService.getFieldName.and.callFake((fieldName: string, errorGroup: string) => {
					expect(errorGroup).toBeUndefined();
					return fieldNames[fieldName] || undefined;
				});

				const formControl: FormControl = <FormControl>component.formNgxError.controls[formControlName];
				const valueChanges: any[] = [...invalidValues]; // just invalid values

				for (const value of valueChanges) {
					formControl.setValue(value);
				}

				expect(mockObserver.next).toHaveBeenCalledTimes(5); // initial emit + 4 value changes
				expect(mockObserver.next.calls.argsFor(0)[0]).toEqual([]); // initial emit

				const expectedValidationErrors: NgxFormFieldError[] = [
					{
						error: "minlength",
						formControlName: formControlName,
						message: "minlength",
						params: { fieldName: formControlAlias, requiredLength: 3, actualLength: 2 }
					},
					{
						error: "maxlength",
						formControlName: formControlName,
						message: "maxlength",
						params: { fieldName: formControlAlias, requiredLength: 8, actualLength: 14 }
					},
					{
						error: "required",
						formControlName: formControlName,
						message: "required",
						params: { fieldName: formControlAlias }
					},
					{
						error: "required",
						formControlName: formControlName,
						message: "required",
						params: { fieldName: formControlAlias }
					}
				];

				for (let idx = 0; idx < valueChanges.length; idx++) {
					const emittedValidationErrors: NgxFormFieldError[] = mockObserver.next.calls.argsFor(idx + 1)[0];
					expect(emittedValidationErrors.length).toBe(1);
					expect(emittedValidationErrors[0]).toEqual(expectedValidationErrors[idx]);
				}

				delete fieldNames[formControlName]; // deleting the existing field name
				formControl.reset();
				mockObserver.next.calls.reset();

				for (const value of valueChanges) {
					formControl.setValue(value);
				}

				expect(mockObserver.next).toHaveBeenCalledTimes(4); // 4 value changes
				// the field name should still be the alias defined via the directive
				for (let idx = 0; idx < valueChanges.length; idx++) {
					const emittedValidationErrors: NgxFormFieldError[] = mockObserver.next.calls.argsFor(idx)[0];
					expect(emittedValidationErrors.length).toBe(1);
					expect(emittedValidationErrors[0]).toEqual(expectedValidationErrors[idx]);
				}

				expect(mockObserver.error).not.toHaveBeenCalled();
				expect(mockObserver.complete).not.toHaveBeenCalled(); // the changes observable should never complete!
			});
		});
	});

	describe("errors", () => {
		beforeEach(fakeAsync(() => {
			TestBed.overrideTemplate(TestComponent, templateWithLazyFormErrorDirective);
			// compile template and css
			return TestBed.compileComponents();
		}));

		beforeEach(() => {
			initializeComponentFixture();
		});

		it("should return all the Angular validation errors 'as is' from the form control", () => {
			const formErrorsDirective: NgxFormErrorsDirective = component.formErrorsDirective;
			formErrorsDirective._controlErrors$.subscribe(mockObserver);

			const formControl: FormControl = <FormControl>component.formNgxError.controls[formControlName];
			const valueChanges: any[] = ["first", "second", ...invalidValues];

			for (const value of valueChanges) {
				mockObserver.next.calls.reset();
				formControl.setValue(value);

				expect(mockObserver.next).toHaveBeenCalledTimes(1);

				if (invalidValues.indexOf(value) !== -1) {
					expect(formErrorsDirective.errors).not.toBeNull();
				} else {
					expect(formErrorsDirective.errors).toBeNull(); // no errors
				}
				expect(formErrorsDirective.errors).toBe(formControl.errors);
			}

			expect(mockObserver.error).not.toHaveBeenCalled();
			expect(mockObserver.complete).not.toHaveBeenCalled(); // the changes observable should never complete!
		});

		it("should return all the Angular validation errors from the form control even if when the directive is instantiated after the form control has already validation errors", () => {
			let formErrorComponentElements = fixture.debugElement.queryAll(By.directive(FormErrorComponent));
			expect(formErrorComponentElements.length).toBe(1);

			const expectedValidationErrors: NgxFormFieldError[] = [
				{
					error: "minlength",
					formControlName: formControlName,
					message: "minlength",
					params: { fieldName: formControlName, requiredLength: 3, actualLength: 2 }
				}
			];

			const formErrorsDirective: NgxFormErrorsDirective = component.formErrorsDirective;
			formErrorsDirective._controlErrors$.subscribe(mockObserver);

			const formControl: FormControl = <FormControl>component.formNgxError.controls[formControlName];
			formControl.setValue(invalidValues[0]);
			formControl.markAsTouched(); // simulate the form control has been touched (although it does not really matter)

			expect(mockObserver.next).toHaveBeenCalledTimes(2);
			expect(mockObserver.next.calls.argsFor(0)[0]).toEqual([]);
			expect(mockObserver.next.calls.argsFor(1)[0]).toEqual(expectedValidationErrors);
			expect(mockObserver.error).not.toHaveBeenCalled();
			expect(mockObserver.complete).not.toHaveBeenCalled(); // the changes observable should never complete!

			component.instantiateLazyFormErrorDirective = true;
			fixture.detectChanges();

			formErrorComponentElements = fixture.debugElement.queryAll(By.directive(FormErrorComponent));
			expect(formErrorComponentElements.length).toBe(2);
			expect(formErrorComponentElements[0].componentInstance).toBe(formErrorsDirective._componentRef.instance);
			expect(formErrorComponentElements[1].componentInstance).not.toBe(formErrorsDirective._componentRef.instance);

			const errorComponent: FormErrorComponent = formErrorComponentElements[1].componentInstance;
			expect(errorComponent.errors$).toBeDefined();

			mockObserver.next.calls.reset();
			errorComponent.errors$.subscribe(mockObserver);

			expect(mockObserver.next).toHaveBeenCalledTimes(1);
			expect(mockObserver.next).toHaveBeenCalledWith(expectedValidationErrors);
			expect(mockObserver.error).not.toHaveBeenCalled();
			expect(mockObserver.complete).not.toHaveBeenCalled(); // the changes observable should never complete!
		});

		it("should return null when the form control is not defined", () => {
			const formErrorsDirective: NgxFormErrorsDirective = component.formErrorsDirective;
			expect(formErrorsDirective._formControl).toBeDefined();
			expect(formErrorsDirective.errors).toBeNull(); // initially the form control passes all validations

			formErrorsDirective._formControl = <any>undefined;

			expect(formErrorsDirective._formControl).toBeUndefined();
			expect(formErrorsDirective.errors).toBeNull();
		});
	});

	describe("hasErrors", () => {
		beforeEach(fakeAsync(() => {
			// compile template and css
			return TestBed.compileComponents();
		}));

		beforeEach(() => {
			initializeComponentFixture();
		});

		it("should return true only when the form control has any Angular validation error", () => {
			const formErrorsDirective: NgxFormErrorsDirective = component.formErrorsDirective;
			formErrorsDirective._controlErrors$.subscribe(mockObserver);

			const formControl: FormControl = <FormControl>component.formNgxError.controls[formControlName];
			const valueChanges: any[] = ["first", "second", ...invalidValues];

			for (const value of valueChanges) {
				mockObserver.next.calls.reset();
				formControl.setValue(value);

				expect(mockObserver.next).toHaveBeenCalledTimes(1);

				if (invalidValues.indexOf(value) !== -1) {
					expect(formErrorsDirective.hasErrors).toBe(true);
				} else {
					expect(formErrorsDirective.hasErrors).toBe(false);
				}
			}

			expect(mockObserver.error).not.toHaveBeenCalled();
			expect(mockObserver.complete).not.toHaveBeenCalled(); // the changes observable should never complete!
		});

		it("should return false if the form control is not defined", () => {
			const formErrorsDirective: NgxFormErrorsDirective = component.formErrorsDirective;
			expect(formErrorsDirective._formControl).toBeDefined();
			expect(formErrorsDirective.hasErrors).toBe(false); // initially the form control passes all validations

			formErrorsDirective._formControl = <any>undefined;

			expect(formErrorsDirective._formControl).toBeUndefined();
			expect(formErrorsDirective.hasErrors).toBe(false);
		});
	});

	describe("hasError", () => {
		beforeEach(fakeAsync(() => {
			// compile template and css
			return TestBed.compileComponents();
		}));

		beforeEach(() => {
			initializeComponentFixture();
		});

		it("should return true only when the form control has any error for the given validation", () => {
			const formErrorsDirective: NgxFormErrorsDirective = component.formErrorsDirective;
			formErrorsDirective._controlErrors$.subscribe(mockObserver);

			const formControl: FormControl = <FormControl>component.formNgxError.controls[formControlName];
			const invalidValuesObj: object[] = [
				{ minlength: "na" },
				{ maxlength: "too long value" },
				{ required: "" },
				{ required: undefined }
			];
			const invalidValuesArray: any[] = invalidValuesObj.map((valueObj: object) => Object.values(valueObj)[0]);
			const valueChanges: any[] = ["first", "second", ...invalidValuesArray];
			let idx = 0;

			for (const value of valueChanges) {
				mockObserver.next.calls.reset();
				formControl.setValue(value);

				expect(mockObserver.next).toHaveBeenCalledTimes(1);

				if (invalidValuesArray.indexOf(value) !== -1) {
					const validationError: string = Object.keys(invalidValuesObj[idx])[0];
					expect(formErrorsDirective.hasError(validationError)).toBe(true);
					idx++;
				} else {
					expect(formErrorsDirective.hasError("minlength")).toBe(false);
					expect(formErrorsDirective.hasError("maxlength")).toBe(false);
					expect(formErrorsDirective.hasError("required")).toBe(false);
				}
			}

			expect(mockObserver.error).not.toHaveBeenCalled();
			expect(mockObserver.complete).not.toHaveBeenCalled(); // the changes observable should never complete!
		});

		it("should return false when the form control is not defined", () => {
			const formErrorsDirective: NgxFormErrorsDirective = component.formErrorsDirective;
			expect(formErrorsDirective._formControl).toBeDefined();

			const validationErrors: string[] = ["minlength", "maxlength", "required"];

			for (const error of validationErrors) {
				expect(formErrorsDirective.hasError(error)).toBe(false); // initially the form control passes all validations
			}

			formErrorsDirective._formControl = <any>undefined;

			expect(formErrorsDirective._formControl).toBeUndefined();
			for (const error of validationErrors) {
				expect(formErrorsDirective.hasError(error)).toBe(false);
			}
		});
	});

	describe("getError", () => {
		beforeEach(fakeAsync(() => {
			// compile template and css
			return TestBed.compileComponents();
		}));

		beforeEach(() => {
			initializeComponentFixture();
		});

		it("should return the Angular validation error for the given validation or null if the form control doesn't have such error", () => {
			const formErrorsDirective: NgxFormErrorsDirective = component.formErrorsDirective;
			const formControl: FormControl = <FormControl>component.formNgxError.controls[formControlName];
			const invalidValuesObj: object[] = [
				{ minlength: "na" },
				{ maxlength: "too long value" },
				{ required: "" },
				{ required: undefined }
			];
			const invalidValuesArray: any[] = invalidValuesObj.map((valueObj: object) => Object.values(valueObj)[0]);
			const valueChanges: any[] = ["first", "second", ...invalidValuesArray];
			let idx = 0;

			for (const value of valueChanges) {
				formControl.setValue(value);

				if (invalidValuesArray.indexOf(value) !== -1) {
					const validationError: string = Object.keys(invalidValuesObj[idx])[0];
					expect(formErrorsDirective.getError(validationError)).not.toBeNull();
					expect(formErrorsDirective.getError(validationError)).toBe(formControl.getError(validationError));
					idx++;
				} else {
					expect(formErrorsDirective.getError("minlength")).toBeNull();
					expect(formErrorsDirective.getError("maxlength")).toBeNull();
					expect(formErrorsDirective.getError("required")).toBeNull();
				}
			}
		});

		it("should return null when the form control is not defined", () => {
			const formErrorsDirective: NgxFormErrorsDirective = component.formErrorsDirective;
			expect(formErrorsDirective._formControl).toBeDefined();

			const validationErrors: string[] = ["minlength", "maxlength", "required"];

			for (const error of validationErrors) {
				expect(formErrorsDirective.getError(error)).toBeNull(); // initially the form control passes all validations
			}

			formErrorsDirective._formControl = <any>undefined;

			expect(formErrorsDirective._formControl).toBeUndefined();
			for (const error of validationErrors) {
				expect(formErrorsDirective.getError(error)).toBeNull();
			}
		});
	});

	describe("hasState", () => {
		beforeEach(fakeAsync(() => {
			// compile template and css
			return TestBed.compileComponents();
		}));

		beforeEach(() => {
			initializeComponentFixture();
		});

		it("should return true only when the form control has the given state", () => {
			const formErrorsDirective: NgxFormErrorsDirective = component.formErrorsDirective;

			expect(formErrorsDirective.hasState("pristine")).toBe(true); // right after initialization
			expect(formErrorsDirective.hasState("untouched")).toBe(true); // right after initialization
			expect(formErrorsDirective.hasState("dirty")).toBe(false);
			expect(formErrorsDirective.hasState("touched")).toBe(false);

			const formControl: FormControl = <FormControl>component.formNgxError.controls[formControlName];

			formControl.markAsDirty();
			expect(formErrorsDirective.hasState("dirty")).toBe(true);
			expect(formErrorsDirective.hasState("untouched")).toBe(true); // right after initialization
			expect(formErrorsDirective.hasState("pristine")).toBe(false); // automatically disabled when marked as pristine
			expect(formErrorsDirective.hasState("touched")).toBe(false);

			formControl.markAsTouched();
			expect(formErrorsDirective.hasState("dirty")).toBe(true);
			expect(formErrorsDirective.hasState("touched")).toBe(true);
			expect(formErrorsDirective.hasState("pristine")).toBe(false);
			expect(formErrorsDirective.hasState("untouched")).toBe(false);

			formControl.markAsUntouched();
			expect(formErrorsDirective.hasState("dirty")).toBe(true);
			expect(formErrorsDirective.hasState("touched")).toBe(false); // automatically disabled when marked as untouched
			expect(formErrorsDirective.hasState("pristine")).toBe(false);
			expect(formErrorsDirective.hasState("untouched")).toBe(true);

			formControl.markAsPristine();
			expect(formErrorsDirective.hasState("dirty")).toBe(false); // automatically disabled when marked as pristine
			expect(formErrorsDirective.hasState("touched")).toBe(false);
			expect(formErrorsDirective.hasState("pristine")).toBe(true);
			expect(formErrorsDirective.hasState("untouched")).toBe(true);
		});

		it("should throw an error when the requested state is not a valid Angular state", () => {
			const formErrorsDirective: NgxFormErrorsDirective = component.formErrorsDirective;
			expect(formErrorsDirective._formControl).toBeDefined();

			expect(() => formErrorsDirective.hasState("whatever-state")).toThrowError(/has no .* state defined/);
		});

		it("should return false when the form control is not defined", () => {
			const formErrorsDirective: NgxFormErrorsDirective = component.formErrorsDirective;
			expect(formErrorsDirective._formControl).toBeDefined();

			const controlStates: string[] = ["dirty", "touched", "pristine", "untouched"];

			for (const state of controlStates) {
				if (state === "pristine" || state === "untouched") {
					expect(formErrorsDirective.hasState(state)).toBe(true); // right after initialization
				} else {
					expect(formErrorsDirective.hasState(state)).toBe(false);
				}
			}

			formErrorsDirective._formControl = <any>undefined;

			expect(formErrorsDirective._formControl).toBeUndefined();
			for (const state of controlStates) {
				expect(formErrorsDirective.hasState(state)).toBe(false);
			}
		});
	});
});
