# [2.0.0-rc.0](https://github.com/NationalBankBelgium/ngx-form-errors/compare/1.1.0...2.0.0-rc.0) (2023-12-11)


### Features

* **build:** upgrade npm to v7 and NodeJS to v12 ([ef6cfe0](https://github.com/NationalBankBelgium/ngx-form-errors/commit/ef6cfe046c1fd374d62034bd7206a5b55cc6140b))


### BREAKING CHANGES

* **build:** Update engines to support NodeJS 12 and npm 7



# [1.1.0](https://github.com/NationalBankBelgium/ngx-form-errors/compare/1.0.0...1.1.0) (2022-04-19)


### Features

* **directive:** add support for nested formGroupNames ([8c18ee3](https://github.com/NationalBankBelgium/ngx-form-errors/commit/8c18ee3db1463c7523e1cd13b481a98966ee1915)), closes [#41](https://github.com/NationalBankBelgium/ngx-form-errors/issues/41)
* **qa:** improve issue templating (new GitHub issues templates) ([802ce34](https://github.com/NationalBankBelgium/ngx-form-errors/commit/802ce34138b7297e8b87271d4d5aba35aa83692f)), closes [#37](https://github.com/NationalBankBelgium/ngx-form-errors/issues/37)



# [1.0.0](https://github.com/NationalBankBelgium/ngx-form-errors/compare/1.0.0-rc.0...1.0.0) (2019-11-29)


### Bug Fixes

* **demo:** enable 'disableHostCheck' option in 'ng serve' command to prevent 'Invalid Host/Origin header' error in IE ([48606e0](https://github.com/NationalBankBelgium/ngx-form-errors/commit/48606e0e17673c2ecf0bcc78b47bf007d3e09084)), closes [/github.com/webpack/webpack-dev-server/issues/1604#issuecomment-453137871](https://github.com//github.com/webpack/webpack-dev-server/issues/1604/issues/issuecomment-453137871)
* **release:** add 'rc' branches in .travis.yml to make Travis trigger release builds also in those ([d937808](https://github.com/NationalBankBelgium/ngx-form-errors/commit/d93780870f1411d8e80b57f35f448759fe93284c))


### Features

* **all:** add support for Angular 8 ([77f20ca](https://github.com/NationalBankBelgium/ngx-form-errors/commit/77f20ca285c39f57a4c4b46ff30d5da1a191f0d6)), closes [#31](https://github.com/NationalBankBelgium/ngx-form-errors/issues/31)



# [1.0.0-rc.0](https://github.com/NationalBankBelgium/ngx-form-errors/compare/1.0.0-beta.1...1.0.0-rc.0) (2019-10-31)


### Bug Fixes

* **directive:** fetch correctly the form control's validation errors when it is already invalid before the directive is instantiated ([3177f9c](https://github.com/NationalBankBelgium/ngx-form-errors/commit/3177f9c2c6f9e976fe41ac74c7f1edf813418e43)), closes [#28](https://github.com/NationalBankBelgium/ngx-form-errors/issues/28)


### Features

* **build:** update ng-packagr to the latest version and adapt the 'build' script to use the NG CLI 'ng build' command instead ([cffde40](https://github.com/NationalBankBelgium/ngx-form-errors/commit/cffde40ac8e8e1c7083fcd772aa9166ea7133eab))
* **service:** adapt demo to show the new feature about defining messages for specific form controls ([4c7f88b](https://github.com/NationalBankBelgium/ngx-form-errors/commit/4c7f88b32108e036cabbe3086fc407269722818c))
* **service:** add support for defining/finding error messages for a specific formControl name ([8ed80cb](https://github.com/NationalBankBelgium/ngx-form-errors/commit/8ed80cb9c98133b9a98e46e2f74bf6a16d63c605)), closes [#19](https://github.com/NationalBankBelgium/ngx-form-errors/issues/19)


### BREAKING CHANGES

* **service:** renamed `getErrorMessage` method in `NgxFormErrorsMessageService` to `findErrorMessage` which is more descriptive according to the actual functionality of this method.



# [1.0.0-beta.1](https://github.com/NationalBankBelgium/ngx-form-errors/compare/1.0.0-beta.0...1.0.0-beta.1) (2019-02-01)


### Bug Fixes

* **build:** adapt module forRoot() and remove index.ts barrels from the library to fix AOT compilation ([da73268](https://github.com/NationalBankBelgium/ngx-form-errors/commit/da7326813861b9a7b463efdb743c2c1ddd3d1a1b)), closes [#17](https://github.com/NationalBankBelgium/ngx-form-errors/issues/17)


### Code Refactoring

* **all:** cleanup API: remove unnecesary/duplicate code, improve JSDocs, rename vars and method ([3648112](https://github.com/NationalBankBelgium/ngx-form-errors/commit/3648112411505f633b0ac74fbef7bd6196899482)), closes [#8](https://github.com/NationalBankBelgium/ngx-form-errors/issues/8)


### Features

* **demo:** refactor/restyle demo ([a29b95b](https://github.com/NationalBankBelgium/ngx-form-errors/commit/a29b95b198f262235a060065a5d57edba46b6a27))


### BREAKING CHANGES

* **all:** removed/renamed some methods and properties:

   - removed isValid() from NgxFormErrorsDirective.
   - renamed getMessageForError to getErrorMessage in NgxFormErrorsMessageService.
   - renamed fieldName to formControlName in NgxFormFieldError.



# [1.0.0-beta.0](https://github.com/NationalBankBelgium/ngx-form-errors/compare/3c4e516fa41bd970d8015e2e675e94c0466bb891...1.0.0-beta.0) (2019-01-17)


### Features

* **all:** initial implementation ([3c4e516](https://github.com/NationalBankBelgium/ngx-form-errors/commit/3c4e516fa41bd970d8015e2e675e94c0466bb891))
* **demo:** improve demo app to show all the features ([6f08572](https://github.com/NationalBankBelgium/ngx-form-errors/commit/6f08572dad59349169f3142e6800746af2248eb3)), closes [#6](https://github.com/NationalBankBelgium/ngx-form-errors/issues/6)



