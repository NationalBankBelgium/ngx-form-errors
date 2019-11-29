<a name="1.0.0"></a>
# [1.0.0](https://github.com/NationalBankBelgium/ngx-form-errors/compare/1.0.0-rc.0...1.0.0) (2019-11-29)


### Bug Fixes

* **demo:** enable 'disableHostCheck' option in 'ng serve' command to prevent 'Invalid Host/Origin header' error in IE ([48606e0](https://github.com/NationalBankBelgium/ngx-form-errors/commit/48606e0)), closes [/github.com/webpack/webpack-dev-server/issues/1604#issuecomment-453137871](https://github.com//github.com/webpack/webpack-dev-server/issues/1604/issues/issuecomment-453137871)
* **release:** add 'rc' branches in .travis.yml to make Travis trigger release builds also in those ([d937808](https://github.com/NationalBankBelgium/ngx-form-errors/commit/d937808))


### Features

* **all:** add support for Angular 8 ([77f20ca](https://github.com/NationalBankBelgium/ngx-form-errors/commit/77f20ca)), closes [#31](https://github.com/NationalBankBelgium/ngx-form-errors/issues/31)



<a name="1.0.0-rc.0"></a>
# [1.0.0-rc.0](https://github.com/NationalBankBelgium/ngx-form-errors/compare/1.0.0-beta.1...1.0.0-rc.0) (2019-10-31)


### Bug Fixes

* **directive:** fetch correctly the form control's validation errors when it is already invalid before the directive is instantiated ([3177f9c](https://github.com/NationalBankBelgium/ngx-form-errors/commit/3177f9c)), closes [#28](https://github.com/NationalBankBelgium/ngx-form-errors/issues/28)


### Features

* **build:** update ng-packagr to the latest version and adapt the 'build' script to use the NG CLI 'ng build' command instead ([cffde40](https://github.com/NationalBankBelgium/ngx-form-errors/commit/cffde40))
* **service:** adapt demo to show the new feature about defining messages for specific form controls ([4c7f88b](https://github.com/NationalBankBelgium/ngx-form-errors/commit/4c7f88b))
* **service:** add support for defining/finding error messages for a specific formControl name ([8ed80cb](https://github.com/NationalBankBelgium/ngx-form-errors/commit/8ed80cb)), closes [#19](https://github.com/NationalBankBelgium/ngx-form-errors/issues/19)


### BREAKING CHANGES

* **service:** renamed `getErrorMessage` method in `NgxFormErrorsMessageService` to `findErrorMessage` which is more descriptive according to the actual functionality of this method.



<a name="1.0.0-beta.1"></a>
# [1.0.0-beta.1](https://github.com/NationalBankBelgium/ngx-form-errors/compare/1.0.0-beta.0...1.0.0-beta.1) (2019-02-01)


### Bug Fixes

* **build:** adapt module forRoot() and remove index.ts barrels from the library to fix AOT compilation ([da73268](https://github.com/NationalBankBelgium/ngx-form-errors/commit/da73268)), closes [#17](https://github.com/NationalBankBelgium/ngx-form-errors/issues/17)


### Code Refactoring

* **all:** cleanup API: remove unnecesary/duplicate code, improve JSDocs, rename vars and method ([3648112](https://github.com/NationalBankBelgium/ngx-form-errors/commit/3648112)), closes [#8](https://github.com/NationalBankBelgium/ngx-form-errors/issues/8)


### Features

* **demo:** refactor/restyle demo ([a29b95b](https://github.com/NationalBankBelgium/ngx-form-errors/commit/a29b95b))


### BREAKING CHANGES

* **all:** removed/renamed some methods and properties:

   - removed isValid() from NgxFormErrorsDirective.
   - renamed getMessageForError to getErrorMessage in NgxFormErrorsMessageService.
   - renamed fieldName to formControlName in NgxFormFieldError.



<a name="1.0.0-beta.0"></a>
# [1.0.0-beta.0](https://github.com/NationalBankBelgium/ngx-form-errors/compare/3c4e516...1.0.0-beta.0) (2019-01-17)


### Features

* **all:** initial implementation ([3c4e516](https://github.com/NationalBankBelgium/ngx-form-errors/commit/3c4e516))
* **demo:** improve demo app to show all the features ([6f08572](https://github.com/NationalBankBelgium/ngx-form-errors/commit/6f08572)), closes [#6](https://github.com/NationalBankBelgium/ngx-form-errors/issues/6)



