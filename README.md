# ngx-observable-lifecycle

Library to wrap Angular lifecycle hooks in RxJS Observables.

* Works with ViewEngine's AOT and JIT
* Works with Angular 9 & Ivy
* Tree-Shakeable

Most important use case: Avoid memory leaks by unsubscribe on destroy.

## Installation

From [npmjs.com](https://www.npmjs.com/) via ```npm install @pdtec/ngx-observable-lifecycle```
or ```yarn add @pdtec/ngx-observable-lifecycle```

## API

For each [Angular lifecycle hook](https://angular.io/guide/lifecycle-hooks) there is a class that implements the hook
and provides an observable.
E.g. Class ```OnDestroy$``` implements ```OnDestroy``` with its method ```ngOnDestroy``` and
provides an observable ```ngOnDestroy$``` which emits when ```ngOnDestroy``` get called.

Same applies for all the other lifecycle hooks:
```OnInit```, ```OnChanges```, ```DoCheck```, ```AfterViewChecked```, ```AfterViewInit```,
```AfterContentChecked``` and ```AfterContentInit```.

In addition the library provides some helpers like:
 
* function ```input$``` to observe a property decorated with @Input
* function ```viewChildren$``` to observe a property decorated with @ViewChildren and of type QueryList
* RxJS operator ```takeUntilDestroyed``` to automatically unsubscribe

## Limitations

Currently there is no way to use [TypeScript Mixins](https://basarat.gitbooks.io/typescript/docs/types/mixins.html).
We tried it in version 1 of this library but it doesn't work with ViewEngine.
So we are not able to handle "multi-inheritance" and therefore this library won't work if your component already has a base class.

## Usage

In your component or service class extend one of the provided base classes.
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
    super(); // we have a constructor and extend a base class -> we have to call super

    service.value$
      .pipe(takeUntilDestroyed(this)) // unsubscribe on destroy
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

    input$(this, 'value')
      .subscribe(x => console.log('new value of input', x));
  }
}
```

### Observe View Children

```ts
@Component({
  selector: 'app-child',
  template: '<app-grand-child></app-grand-child',
})
export class ChildComponent extends AfterViewInit$AndOnDestroy$ {
  
  @ViewChildren()
  public children: QueryList<GrandChildComponent>;
  
  constructor() {
    super();

    viewChildren$(this, 'children')
      .subscribe(x => console.log(`I have ${x.length} children`));
  }
}
```

## Multiple Lifecycle Hooks

As already mentioned in section limitations, currently it is not possible to use mixins.
Therefore we can not combine multiple base classes dynamically as we need them.

The library provides some combinations: ```AllHooks$```, ```BaseHooks$``` and ```AfterViewInit$AndOnDestroy$```.
```BaseHooks$``` includes ```OnInit$```, ```AfterViewInit$```, ```OnChanges$``` and ```OnDestroy$```.

## License

MIT, please see file *LICENSE* for details.
