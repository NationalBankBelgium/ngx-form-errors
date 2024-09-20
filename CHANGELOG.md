# [2.0.0](https://github.com/NationalBankBelgium/ngx-form-errors/compare/2.0.0-rc.2...2.0.0) (2024-09-20)


### Features

* **all:** update to angular 16 ([0a113f5](https://github.com/NationalBankBelgium/ngx-form-errors/commit/0a113f57a3970c7624fe64c384fe1cd37f68dffe))
* **demo:** update to angular 16 ([c3d84f8](https://github.com/NationalBankBelgium/ngx-form-errors/commit/c3d84f80b4efaa67f1af1d54dfb4ff2a035c8fd0))



# [2.0.0-rc.2](https://github.com/NationalBankBelgium/ngx-form-errors/compare/2.0.0-rc.1...2.0.0-rc.2) (2024-09-20)


### Bug Fixes

* **release:** fix release-publish script by reading `GITHUB_REF` variable instead of custom `GH_ACTIONS_TAG` var ([be92516](https://github.com/NationalBankBelgium/ngx-form-errors/commit/be92516aeb1c73fda1334b65bc682a3b2bd1b0e1))


### Features

* **all:** update `RXJS` from "^6.6.7" to "^7.8.1" ([c1f4587](https://github.com/NationalBankBelgium/ngx-form-errors/commit/c1f45871cf17cc5e7c19c2f63bb30f2f4d8ec081))
* **all:** update to angular@15 ([73e6a2d](https://github.com/NationalBankBelgium/ngx-form-errors/commit/73e6a2dd49c6c97535b2bb3c2dd954f668470ceb))
* **demo:** update `RXJS` from "^6.6.7" to "^7.8.1" for ng13 ([04b6c5e](https://github.com/NationalBankBelgium/ngx-form-errors/commit/04b6c5e5b1b89ed8d444297cdfc2cd362937dca0))
* **demo:** update `RXJS` from "^6.6.7" to "^7.8.1" for ng14 ([d3c11c6](https://github.com/NationalBankBelgium/ngx-form-errors/commit/d3c11c6b48d985c0765131c82f0d1b3083c0f772))
* **demo:** update demo to angular15 ([ebfc966](https://github.com/NationalBankBelgium/ngx-form-errors/commit/ebfc9660fb9a52e760e7c9399a545f4c40aa5692))



# [2.0.0-rc.1](https://github.com/NationalBankBelgium/ngx-form-errors/compare/2.0.0-rc.0...2.0.0-rc.1) (2024-09-19)


### Bug Fixes

* **demo:** fix wrong version of @angular/material ([40b8f04](https://github.com/NationalBankBelgium/ngx-form-errors/commit/40b8f040ffb0e0b3eb2bc1c928a32ddd64376f51))
* **release:** fix `release-it` by upgrading `@commitlint/*` devDependencies ([bc08445](https://github.com/NationalBankBelgium/ngx-form-errors/commit/bc08445a44267e98a2dce422da46df90cfb58518))


### Features

* **all:** update to angular 14 ([29eec87](https://github.com/NationalBankBelgium/ngx-form-errors/commit/29eec8711c236c645dcfefbb9c973713a9348c75))
* **demo:** update to angular 14 ([90aa011](https://github.com/NationalBankBelgium/ngx-form-errors/commit/90aa01117352d3fd942b824e5e6c562794f9cea6))



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



