import { Inject, ModuleWithProviders, NgModule, Optional } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxFormErrorsDirective, NgxFormErrorsGroupDirective } from "./directives";
import { NgxFormErrorsMessageService } from "./services";
import { NGX_FORM_ERRORS_CONFIG, NgxFormErrorsConfig } from "./form-errors-config.intf";

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	declarations: [NgxFormErrorsDirective, NgxFormErrorsGroupDirective],
	exports: [NgxFormErrorsDirective, NgxFormErrorsGroupDirective]
})
export class NgxFormErrorsModule {
	/**
	 * Instantiates the services only once since they should be singletons
	 * so the forRoot() should be called only by the AppModule
	 * @see https://angular.io/guide/singleton-services#forroot
	 * @param formErrorsConfig - Object containing the configuration (if any) for the {@link NgxFormErrorsDirective}
	 * @returns a module with providers
	 */
	public static forRoot(formErrorsConfig: NgxFormErrorsConfig): ModuleWithProviders<NgxFormErrorsModule> {
		return {
			ngModule: NgxFormErrorsModule,
			providers: [NgxFormErrorsMessageService, { provide: NGX_FORM_ERRORS_CONFIG, useValue: formErrorsConfig }]
		};
	}

	/**
	 * Class constructor
	 * @param formErrorsConfig - Object containing the configuration (if any) for the {@link NgxFormErrorsDirective}
	 */
	public constructor(@Optional() @Inject(NGX_FORM_ERRORS_CONFIG) formErrorsConfig: NgxFormErrorsConfig) {
		if (!formErrorsConfig || !formErrorsConfig.formErrorComponent) {
			throw new Error(
				"NgxFormErrorsModule: a config object containing the Error component to be used should be provided via the forRoot() method."
			);
		}
	}
}
