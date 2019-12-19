# @pdtec/ngx-observable-lifecycle

Library to wrap Angular lifecycle hooks in RxJS Observables.

* Works with AOT
* Works with Angular 9 & Ivy
* Tree-Shakeable

Most important use case: Avoid memory leaks by unsubscribe on destroy.

## Installation

From [npmjs.com](https://www.npmjs.com/) via ```npm install @pdtec/ngx-observable-lifecycle```
or ```yarn add @pdtec/ngx-observable-lifecycle```

## API

The library provides base classes as well as class mixins.

You need mixins only in two conditions.
If none of these is true (most of the time), keep it simple and skip mixins for now.

* if you want to use more than one lifecycle-hook-observable at the same time
* if your component class already has a base class

For a general introduction to mixins please read [Mixins on TypeScript Deep Dive](https://basarat.gitbooks.io/typescript/docs/types/mixins.html)

For each [Angular lifecycle hook](https://angular.io/guide/lifecycle-hooks) there is one mixin and one base class.
E.g. mixin ```WithOnDestroy$``` and class ```OnDestroy$``` implement ```OnDestroy``` with its method ```ngOnDestroy```.
They provide an observable ```ngOnDestroy$``` which emits an event when ```ngOnDestroy``` get called.

Same applies for all the other lifecycle hooks:
```OnInit```, ```OnChanges```, ```DoCheck```, ```AfterViewChecked```, ```AfterViewInit```,
```AfterContentChecked``` and ```AfterContentInit```.

In addition the library provides some RxJS operators like
 
* ```takeUntilDestroyed``` to automatically unsubscribe
* ```onInput``` to filter and map generic events from ngOnChanges$ down to a single input

## Basic Usage

In your component or service class extend one of the base classes.
You're then able to use the provided observable to get notified about lifecycle hook calls.
If your class has a constructor, you have to explicitly call the super constructor.

```ts
// class extends lifecylce hook base class
export class ServiceOne extends OnDestroy$ {

  // consturctor defined, as we are using dependency injection
  constructor(private readonly serviceTwo: ServiceTwo) {

    super(); // so we have to call super constructor explicitly

    // base class provides an observable emitting lifecycle hook calls as events
    this.ngOnDestroy$.subscribe(() => console.log('destroyed'));
  }
}
```

### Use Case: Unsubscribe on Destroy

To avoid memory leaks you should always unsubscribe from observables explicitly.
Never assume an observable completes before a component get destroyed.
Managing unsubscription manually is error-prone and produces a lot of boilerplate code.
We can use RxJS's takeUntil operator or derived operators like ```takeUntilDestroyed```
to keep the code simple and unsubscribe automatically whenever the component gets destroyed.

```ts
@Component({
  selector: 'app-child',
  template: '<div>Value: {{value}}</div>',
})
export class ChildComponent extends OnDestroy$ {
  public value: number | undefined;

  constructor(service: Service) {
    super(); // constructor -> super call

    service.value$
      .pipe(untilDestroyed(this)) // unsubscribe on destroy
      .subscribe(x => this.value = x);
  }
}
```

### Observe Input Changes

```ts
@Component({
  selector: 'app-child',
  template: '<div>Value: {{value}}</div>',
})
export class ChildComponent extends OnChanges$ {
  
  @Input()
  public value: number | undefined;
  
  constructor() {
    super();

    this.ngOnChanges$
      .pipe(
        onInput('value'), // type safe reference to property
        map(change => change.currentValue)
      )
      .subscribe(x => console.log('new value of input', x));
  }
}
```

## Using Mixins

### Existing Base Class

Same example as above but now the component already extends a base class.
Because ECMAScript / TypeScript does not support multiple inheritance we can not use ```OnDestroy$``` directly.

But we can use the ```WithOnDestroy$``` mixin instead and wrap the existing base class.

```ts
class BaseClass {
  aMethod() {}
}

const BaseClassWithOnDestroy$ = WithOnDestroy$(BaseClass);

@Component({
  selector: 'app-child',
  template: '<div>Value: {{value}}</div>',
})
export class ChildComponent extends BaseClassWithOnDestroy$ {
  public value: number | undefined;

  constructor(service: ObservableService) {
    super();

    this.aMethod(); // method from base class available
    this.ngOnDestroy$; // lifecycle observable available
  }
}
```

### Multiple Lifecycle Hooks

With the provided mixins you can create a custom combination of lifecycle-hook-observables.
Just pass the result of one mixin call to another mixin like you would do with a regular base class (example above).

```ts
const OnDestroy$OnChanges$ = WithOnDestroy$(WithAfterViewChecked$());

@Component({
  selector: 'app-child',
  template: '<div>Value: {{value}}</div>',
})
export class ChildComponent extends OnDestroy$OnChanges$ {
  public value: number | undefined;

  constructor(service: ObservableService) {
    super();

    this.ngOnDestroy$;
    this.ngAfterViewChecked$;
  }
}
```

The first mixin call also accepts an optional base class as seen in the example above.
So you can use all together: base class and multiple lifecycle hooks.

## Known Bugs / Limitations

### WithOnChanges$ and Inheritance

Currently Angular does not treat ngOnChanges in the same way as all the other hooks.
Angular simply does not call library's generic ngOnChanges method.
It only works if

* the component class implements ```ngOnChanges``` itself and calls ```super.ngOnChanges()```
* a base class passed to ```WithOnChanges$``` implements ```ngOnChanges```

As a workaround we implemented a dummy base class that implements ```ngOnChanges``` and use it within ```WithOnChanges$``` all the time.

This approach has the disadvantage that you can not pass a base class to ```WithOnChanges$```.
So basically ```WithOnChanges$``` does not support inheritance at the moment.
