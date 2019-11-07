# Developer Guide

## Table of Contents

-   [ngxFormErrors directive](#ngx-form-errors)

    -   [Binding to a FormControl](#binding-form-control)
    -   [Validation errors emitted](#validation-errors)
    -   [Defining an alias for a form control](#defining-alias-for-one-form-control)
    -   [Template reference variable](#template-ref-variable)
    -   [Integrating Angular Material form field errors](#integrating-angular-material)

-   [ngxFormErrorsGroup directive](#ngx-form-errors-group)

    -   [Defining different messages for the same validation error](#defining-groups)
    -   [Nesting multiple ngxFormErrorsGroup directives](#multiple-nesting)

-   [Error component](#error-component)

    -   [Defining the Error component to use](#defining-error-component)
    -   [Integrating translation support for validation messages](#integrating-translation-support)

-   [NgxFormErrorsMessageService](#ngx-form-errors-message-service)
    -   [Adding messages for specific validation errors](#adding-messages-for-validation-errors)
    -   [Getting validation error messages](#getting-validation-error-messages)
    -   [Adding field names or alias globally](#adding-alias-globally-for-form-controls)
    -   [Getting field names or alias](#getting-field-names)

---

## <a name="ngx-form-errors"></a>ngxFormErrors directive

This directive creates an Error component dynamically where the validation messages will be displayed. See [Defining the Error component to use](#defining-error-component).

### <a name="binding-form-control"></a>Binding to a FormControl

Let's start by defining the Angular form group:

```typescript
this.formGroup = this.formBuilder.group({
	foo: ["", Validators.required]
});
```

Now bind the form and its fields in the template to the model using the [Reactive Forms API](https://angular.io/guide/reactive-forms#reactive-forms-api).
Then add the `ngxFormErrors` directive and bind it to the FormControl whose validation errors you want to display:

```html
<form [formGroup]="formGroup" (ngSubmit)="...">
	<input type="text" formControlName="foo" />
	<!--or-->
	<input type="text" [formControl]="formGroup.get('foo')" />

	<!-- ngxFormErrors creates dynamically an Error component displaying all the different validation errors -->
	<ng-template ngxFormErrors="foo"></ng-template>
</form>
```

At runtime, the validation messages are displayed by the Error component that is created dynamically by this directive :+1:

Remember that you need to provide the Error component that will be created by this directive. See [Defining the Error component to use](#defining-error-component).

### <a name="validation-errors"></a>Validation errors emitted

In order to display the validation messages in the Error component, the `ngxFormErrors` directive emits an array of error objects containing the following information:

```typescript
/**
 * The type of validation (Angular validator name)
 */
error: string;

/**
 * The name of the FormControl whose validation has failed
 */
formControlName: string;

/**
 * The validation error message
 */
message: string;

/**
 * Additional parameters
 */
params: {
	/**
	 * Alias of the validated field. Defined via the "ngxFormErrorsFieldName" attribute of the NgxFormErrorsDirective
	 * If no alias is defined for the field then this is the FormControl's name
	 */
	fieldName: string;
	/**
	 * Any parameters passed to the actual Angular validator
	 */
	[p: string]: any;
};

```

With this information, the Error component can display a validation message as complex/descriptive as needed.

### <a name="defining-alias-for-one-form-control"></a>Defining an alias for a form control

Sometimes the names of the fields in your model (and therefore in your form) are not really descriptive for the end user,
in those cases you might want to display better error messages with meaningful field names.

To do this you can provide the field name or alias to be used in the displayed messages. You can do this globally for all form controls
with the same name via the `NgxFormErrorsMessageService`. See [Adding field names or alias globally](#adding-alias-globally-for-form-controls).

Or you can do it only for the form control where the `ngxFormErrors` directive is applied to via the `ngxFormErrorsFieldName` input:

```html
<!-- in your form -->
<input type="text" formControlName="foo" />
<!-- define a field name or alias to be displayed in the error messages for this field -->
<ng-template ngxFormErrors="foo" ngxFormErrorsFieldName="This dummy field"></ng-template>
```

**IMPORTANT:** The alias defined via the `ngxFormErrorsFieldName` input of the `ngxFormErrors` directive takes precedence over the one defined
globally via the `NgxFormErrorsMessageService`.

This alias is included in the error emitted by the directive so you can use it in your Error component. For example:

```html
<!-- your Error component-->
<div *ngFor="let error of errors; trackBy: trackError" [ngClass]="getErrorClass()">
	'{{ error.params.fieldName }}' is not valid: {{ error.message }}
</div>
```

### <a name="template-ref-variable"></a>Template reference variable

The directive can be referenced somewhere else in your template via a
[template reference variable](https://angular.io/guide/template-syntax#template-reference-variables--var-).

```html
<!-- in your form -->
<input type="text" formControlName="foo" />
<!-- export the directive to a template reference variable, for example fooField -->
<ng-template ngxFormErrors="foo" #fooField="ngxFormErrors"></ng-template>

<!-- then you can reference it anywhere in your template-->
<div>Is field valid?: {{ !fooField.hasErrors }}</div>
```

The reference variable contains the following methods/properties:

```typescript
/**
 * The name of the form control to be bound to this directive
 */
formControlName: string;
/**
 * The field name or alias to be displayed in the validation messages instead of the form control's name.
 * This alias will be sent in the `params.fieldName` property of the NgxFormFieldError(s) emitted by this directive
 */
fieldName: string;
/**
 * An object containing any errors generated by failing Angular validation, or null if there are no errors
 */
errors: ValidationErrors | null;
/**
 * Whether the form control has any validation error
 */
hasErrors: boolean;
/**
 * Whether the form control has any error for the given validation
 * @param name - The name of the validation error to be checked
 */
hasError(name: string): boolean;
/**
 * Return the error (if any) of this form control corresponding to the given validation, or null in case the form control passed the given validation
 * @param name - The name of the validation error to be returned
 */
getError(name: string): any | null;
/**
 * Whether the form control has the given state
 * @param state - The state of the form control to be checked
 */
hasState(state: FormControlState): boolean;
```

### <a name="integrating-angular-material"></a>Integrating Angular Material form field errors

In case you are using [Angular Material](https://material.angular.io), integrating the `ngxFormErrors` directive with the [mat-error](https://material.angular.io/components/form-field/overview#error-messages) directive is a no brainer.

Just wrap the `ngxFormErrors` directive inside a `<mat-error>` element and that's it!

```html
<form [formGroup]="formGroup" (ngSubmit)="...">
	<mat-form-field>
		<input matInput type="text" formControlName="foo" placeholder="Foo" />

		<mat-error>
			<ng-template ngxFormErrors="foo"></ng-template>
		</mat-error>
	</mat-form-field>
</form>
```

In fact, we have integrated [Angular Material](https://material.angular.io) in our [demo app](https://github.com/NationalBankBelgium/ngx-form-errors/tree/master/demo-app). Check it out!

You can also integrate the directive with other UI libraries. This is really simple since you just need to use an `<ng-template>` element to use the `ngxFormErrors` directive so you can place it anywhere in the template according to your needs :wink:

## <a name="ngx-form-errors-group"></a>ngxFormErrorsGroup directive

This directive can be used to define a "group" where one or many `ngxFormErrors` directive(s) belong to.

### <a name="defining-groups"></a>Defining different messages for the same validation error

The "group" defined with the `ngxFormErrorsGroup` is just a logical grouping in order to make the definition of validation messages more flexible :bulb:

For example, with this template:

```html
<form [formGroup]="formGroup" (ngSubmit)="...">
	<!-- required field -->
	<input type="text" formControlName="foo" />
	<ng-template ngxFormErrors="foo"></ng-template>

	<!-- required field -->
	<input type="text" formControlName="baz" />
	<ng-template ngxFormErrors="baz"></ng-template>
</form>
```

And this message configuration:

```typescript
// in the AppModule or feature module
// inject the NgxFormErrorsMessageService to define the messages

formErrorsMessageService.addErrorMessages({
	required: "Required field"
});
```

Both fields will display the same message: "Required field".

However, if you want to display a different message for one of the fields, you can add the `ngxFormErrorsGroup` directive to add a group to one of them:

```html
<form [formGroup]="formGroup" (ngSubmit)="...">
	<!-- required field -->
	<input type="text" formControlName="foo" />
	<ng-template ngxFormErrors="foo"></ng-template>

	<!-- add a logical group to all fields in this container -->
	<div ngxFormErrorsGroup="some-group">
		<!-- required field -->
		<input type="text" formControlName="baz" />
		<ng-template ngxFormErrors="baz"></ng-template>
	</div>
</form>
```

And provide a different message for it in the message configuration using the group you defined:

```typescript
// in the AppModule or feature module
// inject the NgxFormErrorsMessageService to define the messages

formErrorsMessageService.addErrorMessages({
	required: "Required field",
	"some-group.required": "This field is mandatory"
});
```

This way the two fields will display a different message! :sunglasses:

### <a name="multiple-nesting"></a>Nesting multiple ngxFormErrorsGroup directives

The `ngxFormErrorsGroup` directive can be nested in other `ngxFormErrorsGroup` directive(s), it does not matter how deep the nesting is,
the validation message to be displayed by the `ngxFormErrors` directive will be taken using the first immediate group to the field.

For example:

```html
<form [formGroup]="formGroup" (ngSubmit)="...">
	<div ngxFormErrorsGroup="parent-group">
		<!-- required field -->
		<input type="text" formControlName="foo" />
		<ng-template ngxFormErrors="foo"></ng-template>

		<div ngxFormErrorsGroup="child-group">
			<div ngxFormErrorsGroup="deep-nested-group">
				<!-- required field -->
				<input type="text" formControlName="baz" />
				<ng-template ngxFormErrors="baz"></ng-template>
			</div>
		</div>
	</div>
</form>
```

The definition of a different message for both fields would be like this:

```typescript
// in the AppModule or feature module
// inject the NgxFormErrorsMessageService to define the messages

formErrorsMessageService.addErrorMessages({
	required: "Required field",
	"deep-nested-group.required": "This field is mandatory"
});
```

## <a name="error-component"></a>Error component

The Error component is the one that will be dynamically rendered by the `ngxFormErrors` directive to display all the validation messages of a form control.

### <a name="defining-error-component"></a>Defining the Error component to use

In order to make NgxFormErrors as flexible as possible, there is no Error component provided out of the box so you should define it yourself :bulb:

It must be provided via the `NgxFormErrorsModule.forRoot`:

```typescript
@NgModule({
	declarations: [AppComponent, YourCustomErrorComponent],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		NgxFormErrorsModule.forRoot({
			formErrorComponent: YourCustomErrorComponent // your own Error component
		})
	],
	entryComponents: [YourCustomErrorComponent], // add the Error component here so it can be created dynamically
	bootstrap: [AppComponent]
})
export class AppModule {}
```

**IMPORTANT:** The Error component you define should implement the `NgxFormErrorComponent` interface containing the following properties/methods:

```typescript
/**
 * An observable that emits the validation errors of the form control whenever the control changes
 */
errors$: Observable<NgxFormFieldError[]>;

/**
 * Method to be called by the ngxFormErrors directive only.
 * It must contain the necessary logic to subscribe to the errors$ observable to update the current validation errors
 * from the form control
 */
subscribeToErrors(): void;
```

### <a name="integrating-translation-support"></a>Integrating translation support for validation messages

As mentioned before, the reason why there is no Error component provided out of the box is to make NgxFormErrors as flexible as possible.

This is specially important in case you want to add translation support to your validation messages.

For example, you can use [ngx-translate](https://github.com/ngx-translate/core) and integrate it in your Error component to translate the messages:

```html
<!-- You can translate the message and also pass the error params to have even more flexible translations -->
<span *ngFor="let error of errors; trackBy: trackError" [ngClass]="getErrorClass()">
	{{ error.message | translate: error.params }}
</span>
```

Then in your translations you can use the params passed to the `translate` pipe:

```json
{
	"VALIDATIONS": {
		"REQUIRED": "{{fieldName}} is required",
		"MIN_LENGTH": "Password must be at least {{requiredLength}} characters long"
	}
}
```

Finally, the messages provided to the `NgxFormErrorsMessageService` should be the translation keys defined above:

```typescript
// in the AppModule or feature module
// inject the NgxFormErrorsMessageService to define the messages

formErrorsMessageService.addErrorMessages({
	required: "VALIDATIONS.REQUIRED",
	minlength: "VALIDATIONS.MIN_LENGTH"
});
```

In fact, we have integrated [ngx-translate](https://github.com/ngx-translate/core) in our [demo app](https://github.com/NationalBankBelgium/ngx-form-errors/tree/master/demo-app). Check it out!

The same functionality can be achieved with any other i18n library, you just need to integrate it in your Error component :wink:

## <a name="ngx-form-errors-message-service"></a>NgxFormErrorsMessageService

This service can be used to add and retrieve error messages for the different validation errors returned by the `ngxFormErrors` directive.

### <a name="adding-messages-for-validation-errors"></a>Adding messages for specific validation errors

First, inject the `NgxFormErrorsMessageService`. You can do this in the App module, feature module and any component or service.
Then add the messages you want the `ngxFormErrors` directive to display for a specific validation error.

For example, in this case we will add messages for the `required` and the `pattern` errors:

```typescript
// in the AppModule or feature module
// inject the NgxFormErrorsMessageService to define the messages

formErrorsMessageService.addErrorMessages({
	"foo.required": "Please provide the foo field",
	required: "This field is required",
	pattern: "Your password must contain at least one uppercase, one lowercase, and one number"
});
```

**IMPORTANT:** Notice how we have also defined a different message for the `required` error of the `foo` form control.

Make sure that the errors you add messages for correspond to the validators that you added to the FormControl.

In this example the form control definition would be something like this:

<!-- prettier-ignore -->
```typescript
this.formGroup = this.formBuilder.group({
	foo: ["", Validators.compose([
		Validators.required,
		Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$")
	])],
	bar: ["", Validators.required]
});
```

From then on, whenever the fields have a `required` or `pattern` validation error, the messages you added via the `NgxFormErrorsMessageService` will be displayed :muscle:

Moreover, in the `bar` field the generic `required` error message will be displayed, whereas in the `foo` field the specific `required` error message (`foo.required`) will be displayed!

In case you have defined messages for the wrong validation errors, don't worry, you will notice it right away since the validation message that will be displayed
will be completely different from what you have defined :wink:

### <a name="getting-validation-error-messages"></a>Getting validation error messages

Normally, you don't need to get the validation messages yourself since this is done by the `ngxFormErrors` directive when displaying the
validation errors.

However, in case you want to get those messages yourself too, you can call one of these methods:

```typescript
/**
 * Returns an object containing all the messages known by this service
 */
getErrorMessages(): NgxValidationErrorMessages;

/**
 * Tries to find the error message matching the given validation error. Additionally, the form control name and/or the model group
 * can be specified to return the error message matching those as well as the validation error.
 * This method does its best to find the message that fulfills all or some of the given parameters with the following precedence:
 *
 * 1.- errorMessages[groupName.formControlName.errorKey]
 * 2.- errorMessages[formControlName.errorKey]
 * 3.- errorMessages[groupName.errorKey]
 * 4.- errorMessages[errorKey]
 *
 * It returns `undefined` if no message matching any of those params is found.
 * @param error - The validation error (Angular validator name)
 * @param formControlName - The name of the FormControl
 * @param group - The model group to find a match for (if any)
 */
findErrorMessage(error: string, formControlName?: string, group?: string): string | undefined;
```

### <a name="adding-alias-globally-for-form-controls"></a>Adding field names or alias globally

Sometimes the names of the fields in your model (and therefore in your form) are not really descriptive for the end user,
in those cases you might want to display better error messages with meaningful field names.

To do this you can provide the field name or alias to be used for specific form control names:

```typescript
// in the AppModule or feature module
// inject the NgxFormErrorsMessageService to define the messages

errorMessageService.addFieldNames({
	foo: "Dummy field"
});
```

**IMPORTANT:** In case an alias is also defined for the same form control via the `ngxFormErrors` directive,
then that one has precedence and it will be used instead. See [Defining an alias for a form control](#defining-alias-for-one-form-control)

This alias is included in the error emitted by the `ngxFormErrors` directive so you can use it in your Error component. For example:

```html
<!-- your Error component-->
<div *ngFor="let error of errors; trackBy: trackError" [ngClass]="getErrorClass()">
	'{{ error.params.fieldName }}' is not valid: {{ error.message }}
</div>
```

### <a name="getting-field-names"></a>Getting field names or alias

Normally, you don't need to get the field names or alias yourself since this is done by the `ngxFormErrors` directive when displaying the
validation errors.

However, in case you want to get those alias yourself too, you can call one of these methods:

```typescript
/**
 * Returns an object containing all the field names known by this service
 */
getFieldNames(): NgxValidationErrorFieldNames;
/**
 * Returns the field name matching the given name. Additionally, the model group can be specified to return the field name
 * matching that group and the name. If no field name matches both, than it returns the one matching the given name.
 * Otherwise it returns undefined.
 * @param fieldName - The field name (Angular form control name)
 * @param group - The model group to find a match for (if any)
 */
getFieldName(fieldName: string, group?: string): string | undefined;
```
