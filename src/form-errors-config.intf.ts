import { InjectionToken, Type } from "@angular/core";

/**
 * The InjectionToken version of the config name
 */
export const NGX_FORM_ERRORS_CONFIG: InjectionToken<NgxFormErrorsConfig> = new InjectionToken<NgxFormErrorsConfig>("NgxFormErrorsConfig");

/**
 * Definition of the configuration object for the {@link NgxFormErrorsModule}
 */
export interface NgxFormErrorsConfig {
	/**
	 * Error component to be dynamically created by the ngxFormErrors directive which will display the validation errors
	 */
	formErrorComponent: Type<any>;
}
