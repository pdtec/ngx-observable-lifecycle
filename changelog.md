## 7.0.0

* Updated to Angular 16 and drop support for older versions
* Deprecate takeUntilDestroyed in favor of Angular's own implementation
* Remove support for rxjs 6

## 6.0.0

* Updated to Angular 15 and drop support for older versions

## 5.0.0

* Updated to Angular 14 and drop support for older versions

## 4.0.0

* Updated to Angular 13 and drop support for older versions
* Add support for RxJS 7

## 3.0.0

* *TypedChanges* and *TypedChange* removed.
  Mostly used internally but causing compile errors when used in combination with inheritance.

## 2.1.1

* republish of 2.1.0 to fix publishing error

## 2.1.0

* fix return type of viewChildren$, now returning ```Observable<ReadonlyArray<T>>``` instead of ```Observable<Array<T>>```
* add function ```inputs$``` to observe multiple inputs but only receive one event if multiple of them change during one change detection lifecycle
* add methods ```input$``` and ```inputs``` to ```OnChanges$```, see readme for usage example
* add method ```viewChildren$```, see readme for usage example

## 2.0.1

* error in ivy prod build fixed ([#1](https://github.com/pdtec/ngx-observable-lifecycle/issues/1))

## 2.0.0

first public release

* reimplement all hooks to work with ViewEngine AOT
* remove mixing support
* add / rename operators

## 1.0.1

* add missing export of ```onInput``` operator to public api

## 1.0.0

* initial release
