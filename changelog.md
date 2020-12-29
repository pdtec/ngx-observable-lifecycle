# ngx-observable-lifecycle Changelog

## 2.1.0

* fix return type of viewChildren$, now returning Observable<ReadonlyArray<T>> instead of Observable<Array<T>
* add function ```inputs$``` to observe multiple inputs but only receive on event if multiple of them change during one change detection lifecycle
* add methods ```input$``` and ```inputs``` to ```OnChanges$```, see readme for usage example
* add method ```viewChildren$``` ```OnChanges$```, see readme for usage example

## 2.0.0

first public release

* reimplement all hooks to work with ViewEngine AOT
* remove mixing support
* add / rename operators

## 1.0.1

* add missing export of ```onInput``` operator to public api

## 1.0.0

* initial release
