import { InjectionToken, Type } from "@angular/core";
import { NgxFormErrorComponent } from "./form-error-component.intf";

/**
 * The InjectionToken version of the config name
 */
export const NGX_FORM_ERRORS_CONFIG: InjectionToken<NgxFormErrorsConfig> = new InjectionToken<NgxFormErrorsConfig>("NgxFormErrorsConfig");

/**
 * Definition of the configuration object for the {@link NgxFormErrorsModule}
 */
export interface NgxFormErrorsConfig<ErrorComponent extends NgxFormErrorComponent = NgxFormErrorComponent> {
	/**
	 * Error component to be dynamically created by the ngxFormErrors directive which will display the validation errors.
	 * This component should implement the {@link NgxFormErrorComponent} interface.
	 */
	formErrorComponent: Type<ErrorComponent>;
}
