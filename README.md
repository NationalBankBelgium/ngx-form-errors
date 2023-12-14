<h1 align="center">
   ngx-form-errors
</h1>

> An [Angular](https://angular.io) (6+) library to handle validation messages for Reactive Forms in a simple and centralized way

[![NPM version](https://img.shields.io/npm/v/@nationalbankbelgium/ngx-form-errors.svg)](https://www.npmjs.com/package/@nationalbankbelgium/ngx-form-errors)
[![npm](https://img.shields.io/npm/dm/@nationalbankbelgium/ngx-form-errors.svg)](https://www.npmjs.com/package/@nationalbankbelgium/ngx-form-errors)
[![Build Status](https://github.com/NationalBankBelgium/ngx-form-errors/workflows/ci/badge.svg)](https://github.com/NationalBankBelgium/ngx-form-errors/actions?query=workflow%3Aci)
[![Coverage Status](https://coveralls.io/repos/github/NationalBankBelgium/ngx-form-errors/badge.svg?branch=master)](https://coveralls.io/github/NationalBankBelgium/ngx-form-errors?branch=master)
[![Dependency Status](https://david-dm.org/NationalBankBelgium/ngx-form-errors.svg)](https://david-dm.org/NationalBankBelgium/ngx-form-errors)
[![devDependency Status](https://david-dm.org/NationalBankBelgium/ngx-form-errors/dev-status.svg)](https://david-dm.org/NationalBankBelgium/ngx-form-errors#info=devDependencies)
[![taylor swift](https://img.shields.io/badge/secured%20by-taylor%20swift-brightgreen.svg)](https://twitter.com/SwiftOnSecurity)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License](https://img.shields.io/cocoapods/l/AFNetworking.svg)](LICENSE)

NgxFormErrors is heavily inspired in these projects:

- [valdr](https://github.com/netceteragroup/valdr): a model centric approach to AngularJS form validation
- [ngx-errors](https://github.com/UltimateAngular/ngx-errors): a declarative validation errors library for Angular Reactive Forms
- [ngx-valdemort](https://github.com/Ninja-Squad/ngx-valdemort): consistent validation error messages for Angular Reactive forms

## Why NgxFormErrors?

Let's just have a look at the following example:

### Plain Reactive Forms approach

<!-- prettier-ignore -->
```html
<input type="text" formControlName="foo" />

<!-- You need to add an element for each and every error to display a different message -->
<div *ngIf="form.get('foo').hasError('required') && form.get('foo').touched">
	Field is required
</div>
<div *ngIf="form.get('foo').hasError('minlength') && form.get('foo').dirty">
	Min length is 5
</div>
<div *ngIf="form.get('foo').hasError('pattern') && form.get('foo').dirty">
	Field must contain at least one uppercase, one lowercase, and one number
</div>
```

This easily becomes messy and cumbersome as soon as you have multiple fields. And... it is definitely not DRY :-1:

### NgxFormErrors approach

Your component template is cleaner :wink:

<!-- prettier-ignore -->
```html
<input type="text" formControlName="foo" />
<!--or-->
<input type="text" [formControl]="formGroup.get('foo')" />

<!-- ngxFormErrors creates dynamically an Error component (that you define) displaying all the different validation errors -->
<ng-template ngxFormErrors="foo"></ng-template>
```

You decide how to display the messages by defining your own Error component :sunglasses:

<!-- prettier-ignore -->
```html
<!-- Error component's template -->

<!-- you can simply display the message 'as is' -->
<div *ngFor="let error of errors" class="awesome-error-message">
	{{ error.message }}
</div>

<!-- or you can use the error's data/properties to do something fancy -->
<div *ngFor="let error of errors" [ngClass]="getErrorClass(error)">
	{{ constructDisplayedErrorMessage(error) }}
</div>
```

And the messages are centralized in a service :astonished:

<!-- prettier-ignore -->
```typescript
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxFormErrorsMessageService, NgxFormErrorsModule } from "@nationalbankbelgium/ngx-form-errors";

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
export class AppModule {
	public constructor(formErrorsMessageService: NgxFormErrorsMessageService) {
		// add the different validation messages to the NgxFormErrorsMessageService
		formErrorsMessageService.addErrorMessages({
			required: "Field is required",
			minlength: "Min length is 5",
			"fooField.pattern": "Field must contain at least one uppercase, one lowercase, and one number"
		});

		// optionally, add the field names to the NgxFormErrorsMessageService
		// so you can display this name in the validation message instead of the real field name!
		formErrorsMessageService.addFieldNames({
			fooField: "Dummy foo field"
		});
	}
}
```

## Installation

Install NgxFormErrors from npm:

```
npm install @nationalbankbelgium/ngx-form-errors
```

## NgxFormErrors packaging

NgxFormErrors is built with [ng-packagr](https://github.com/ng-packagr/ng-packagr) which means that the final package implements the [Angular Package Format](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/preview) providing the following bundles:

- FESM2015
- FESM5
- ESM2015
- ESM5
- UMD

So it can be consumed by [Angular CLI](https://github.com/angular/angular-cli), [Webpack](https://github.com/webpack/webpack) or [SystemJS](https://github.com/systemjs/systemjs).

## Releases

NgxFormErrors releases are available on npm: https://www.npmjs.com/settings/nationalbankbelgium/packages

## Contributing

Please follow our [contribution guidelines](/CONTRIBUTING.md).

To know how to release NgxFormErrors, refer to [this page](/RELEASE.md).

## Authors

### Christopher Cortes

- [@GitHub](https://github.com/christophercr)

### Alexis Georges

- [@GitHub](https://github.com/SuperITMan)

## License

This project and all associated source code is licensed under the terms of the [MIT License](/LICENSE).

## Documentation

- [Developer Guide](/docs/DEV_GUIDE.md)

## Thank you notes :)

We'd like to thank the following companies who support the open source community with great tools and platforms.

### Jetbrains

We're supported by [Jetbrains](https://www.jetbrains.com) and their awesome [support for open source](https://www.jetbrains.com/buy/opensource/), thanks to which we are able to use the best products on the market to work on this open source project!

<a href="https://www.jetbrains.com"><img src="http://www.underconsideration.com/brandnew/archives/jetbrains_logo_detail.jpg" width="144px"></a>

### GitHub Actions

We're supported by [GitHub Actions](https://github.com/features/actions)

<a href="https://github.com/features/actions"><img src="https://github.githubassets.com/images/modules/site/features/actions-icon-actions.svg" width="144px"></a>
