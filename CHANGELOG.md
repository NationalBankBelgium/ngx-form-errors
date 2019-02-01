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

   - removed isValid() from NgxFormErrorsDirective. Use hasErrors() instead.
   - renamed getMessageForError to getErrorMessage in NgxFormErrorsMessageService.
   - renamed fieldName to formControlName in NgxFormFieldError.



<a name="1.0.0-beta.0"></a>
# [1.0.0-beta.0](https://github.com/NationalBankBelgium/ngx-form-errors/compare/3c4e516...1.0.0-beta.0) (2019-01-17)


### Features

* **all:** initial implementation ([3c4e516](https://github.com/NationalBankBelgium/ngx-form-errors/commit/3c4e516))
* **demo:** improve demo app to show all the features ([6f08572](https://github.com/NationalBankBelgium/ngx-form-errors/commit/6f08572)), closes [#6](https://github.com/NationalBankBelgium/ngx-form-errors/issues/6)



