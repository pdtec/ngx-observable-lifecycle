import { SimpleChanges } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { IAfterContentChecked$ } from './after-content-checked';
import { IAfterContentInit$ } from './after-content-init';
import { IAfterViewChecked$ } from './after-view-checked';
import { IAfterViewInit$ } from './after-view-init';
import { IDoCheck$ } from './do-check';
import { IOnChanges$, TypedChanges } from './on-changes';
import { IOnDestroy$ } from './on-destroy';
import { IOnInit$ } from './on-init';

export class AllHooks$ implements IAfterContentChecked$, IAfterContentInit$, IAfterViewChecked$, IAfterViewInit$, IDoCheck$, IOnChanges$, IOnDestroy$, IOnInit$ {
  // just for type safety
  private ngAfterContentCheckedSubject_!: ReplaySubject<void>;

  // initialize field in getter instead of constructor to be mixin friendly
  // getter is a property of the prototype and get's copied
  private get ngAfterContentCheckedSubject() {
    if (this.ngAfterContentCheckedSubject_ === undefined) {
      this.ngAfterContentCheckedSubject_ = new ReplaySubject<void>(1);
      this.ngOnDestroy$.subscribe(() => this.ngAfterContentCheckedSubject_.complete());
    }

    return this.ngAfterContentCheckedSubject_;
  }

  get ngAfterContentChecked$() {
    return this.ngAfterContentCheckedSubject.asObservable();
  }

  ngAfterContentChecked(): void {
    this.ngAfterContentCheckedSubject.next();
  }

  // just for type safety
  private ngAfterContentInitSubject_!: ReplaySubject<void>;

  // initialize field in getter instead of constructor to be mixin friendly
  // getter is a property of the prototype and get's copied
  private get ngAfterContentInitSubject() {
    if (this.ngAfterContentInitSubject_ === undefined) {
      this.ngAfterContentInitSubject_ = new ReplaySubject<void>(1);
    }

    return this.ngAfterContentInitSubject_;
  }

  get ngAfterContentInit$() {
    return this.ngAfterContentInitSubject.asObservable();
  }

  ngAfterContentInit(): void {
    this.ngAfterContentInitSubject.next();
    this.ngAfterContentInitSubject.complete();
  }

  // just for type safety
  private ngAfterViewCheckedSubject_!: ReplaySubject<void>;

  // initialize field in getter instead of constructor to be mixin friendly
  // getter is a property of the prototype and get's copied
  private get ngAfterViewCheckedSubject() {
    if (this.ngAfterViewCheckedSubject_ === undefined) {
      this.ngAfterViewCheckedSubject_ = new ReplaySubject<void>(1);
      this.ngOnDestroy$.subscribe(() => this.ngAfterViewCheckedSubject_.complete());
    }

    return this.ngAfterViewCheckedSubject_;
  }

  get ngAfterViewChecked$() {
    return this.ngAfterViewCheckedSubject.asObservable();
  }

  ngAfterViewChecked(): void {
    this.ngAfterViewCheckedSubject.next();
  }

  // just for type safety
  private ngAfterViewInitSubject_!: ReplaySubject<void>;

  // initialize field in getter instead of constructor to be mixin friendly
  // getter is a property of the prototype and get's copied
  private get ngAfterViewInitSubject() {
    if (this.ngAfterViewInitSubject_ === undefined) {
      this.ngAfterViewInitSubject_ = new ReplaySubject<void>(1);
    }

    return this.ngAfterViewInitSubject_;
  }

  get ngAfterViewInit$() {
    return this.ngAfterViewInitSubject.asObservable();
  }

  ngAfterViewInit(): void {
    this.ngAfterViewInitSubject.next();
    this.ngAfterViewInitSubject.complete();
  }

  // just for type safety
  private ngDoCheckSubject_!: ReplaySubject<void>;

  // initialize field in getter instead of constructor to be mixin friendly
  // getter is a property of the prototype and get's copied
  private get ngDoCheckSubject() {
    if (this.ngDoCheckSubject_ === undefined) {
      this.ngDoCheckSubject_ = new ReplaySubject<void>(1);
      this.ngOnDestroy$.subscribe(() => this.ngDoCheckSubject_.complete());
    }

    return this.ngDoCheckSubject_;
  }

  get ngDoCheck$() {
    return this.ngDoCheckSubject.asObservable();
  }

  ngDoCheck(): void {
    this.ngDoCheckSubject.next();
  }

  // just for type safety
  private ngOnChangesSubject_!: ReplaySubject<TypedChanges<this>>;

  // initialize field in getter instead of constructor to be mixin friendly
  // getter is a property of the prototype and get's copied
  get ngOnChangesSubject() {
    if (this.ngOnChangesSubject_ === undefined) {
      this.ngOnChangesSubject_ = new ReplaySubject<TypedChanges<this>>(1);
      this.ngOnDestroy$.subscribe(() => this.ngOnChangesSubject_.complete());
    }

    return this.ngOnChangesSubject_;
  }

  get ngOnChanges$() {
    return this.ngOnChangesSubject.asObservable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnChangesSubject.next(changes as any);
  }

  // just for type safety
  private ngOnDestroySubject_!: ReplaySubject<void>;

  // initialize field in getter instead of constructor to be mixin friendly
  // getter is a property of the prototype and get's copied
  private get ngOnDestroySubject() {
    if (this.ngOnDestroySubject_ === undefined) {
      this.ngOnDestroySubject_ = new ReplaySubject<void>(1);
    }

    return this.ngOnDestroySubject_;
  }

  get ngOnDestroy$() {
    return this.ngOnDestroySubject.asObservable();
  }

  ngOnDestroy(): void {
    this.ngOnDestroySubject.next();
    this.ngOnDestroySubject.complete();
  }

  // just for type safety
  private ngOnInitSubject_!: ReplaySubject<void>;

  // initialize field in getter instead of constructor to be mixin friendly
  // getter is a property of the prototype and get's copied
  private get ngOnInitSubject() {
    if (this.ngOnInitSubject_ === undefined) {
      this.ngOnInitSubject_ = new ReplaySubject<void>(1);
    }

    return this.ngOnInitSubject_;
  }

  get ngOnInit$() {
    return this.ngOnInitSubject.asObservable();
  }

  ngOnInit(): void {
    this.ngOnInitSubject.next();
    this.ngOnInitSubject.complete();
  }
}

export class BaseHooks$ implements IOnInit$, IOnChanges$, IAfterViewInit$, IOnDestroy$ {
  // just for type safety
  private ngOnInitSubject_!: ReplaySubject<void>;

  // initialize field in getter instead of constructor to be mixin friendly
  // getter is a property of the prototype and get's copied
  private get ngOnInitSubject() {
    if (this.ngOnInitSubject_ === undefined) {
      this.ngOnInitSubject_ = new ReplaySubject<void>(1);
    }

    return this.ngOnInitSubject_;
  }

  get ngOnInit$() {
    return this.ngOnInitSubject.asObservable();
  }

  ngOnInit(): void {
    this.ngOnInitSubject.next();
    this.ngOnInitSubject.complete();
  }

  // just for type safety
  private ngOnDestroySubject_!: ReplaySubject<void>;

  // initialize field in getter instead of constructor to be mixin friendly
  // getter is a property of the prototype and get's copied
  private get ngOnDestroySubject() {
    if (this.ngOnDestroySubject_ === undefined) {
      this.ngOnDestroySubject_ = new ReplaySubject<void>(1);
    }

    return this.ngOnDestroySubject_;
  }

  get ngOnDestroy$() {
    return this.ngOnDestroySubject.asObservable();
  }

  ngOnDestroy(): void {
    this.ngOnDestroySubject.next();
    this.ngOnDestroySubject.complete();
  }

  // just for type safety
  private ngOnChangesSubject_!: ReplaySubject<TypedChanges<this>>;

  // initialize field in getter instead of constructor to be mixin friendly
  // getter is a property of the prototype and get's copied
  get ngOnChangesSubject() {
    if (this.ngOnChangesSubject_ === undefined) {
      this.ngOnChangesSubject_ = new ReplaySubject<TypedChanges<this>>(1);
      this.ngOnDestroy$.subscribe(() => this.ngOnChangesSubject_.complete());
    }

    return this.ngOnChangesSubject_;
  }

  get ngOnChanges$() {
    return this.ngOnChangesSubject.asObservable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnChangesSubject.next(changes as any);
  }

  // just for type safety
  private ngAfterViewInitSubject_!: ReplaySubject<void>;

  // initialize field in getter instead of constructor to be mixin friendly
  // getter is a property of the prototype and get's copied
  private get ngAfterViewInitSubject() {
    if (this.ngAfterViewInitSubject_ === undefined) {
      this.ngAfterViewInitSubject_ = new ReplaySubject<void>(1);
    }

    return this.ngAfterViewInitSubject_;
  }

  get ngAfterViewInit$() {
    return this.ngAfterViewInitSubject.asObservable();
  }

  ngAfterViewInit(): void {
    this.ngAfterViewInitSubject.next();
    this.ngAfterViewInitSubject.complete();
  }
}

export class AfterViewInit$AndOnDestroy$ implements IAfterViewInit$, IOnDestroy$ {
  // just for type safety
  private ngAfterViewInitSubject_!: ReplaySubject<void>;

  // initialize field in getter instead of constructor to be mixin friendly
  // getter is a property of the prototype and get's copied
  private get ngAfterViewInitSubject() {
    if (this.ngAfterViewInitSubject_ === undefined) {
      this.ngAfterViewInitSubject_ = new ReplaySubject<void>(1);
    }

    return this.ngAfterViewInitSubject_;
  }

  get ngAfterViewInit$() {
    return this.ngAfterViewInitSubject.asObservable();
  }

  ngAfterViewInit(): void {
    this.ngAfterViewInitSubject.next();
    this.ngAfterViewInitSubject.complete();
  }

  // just for type safety
  private ngOnDestroySubject_!: ReplaySubject<void>;

  // initialize field in getter instead of constructor to be mixin friendly
  // getter is a property of the prototype and get's copied
  private get ngOnDestroySubject() {
    if (this.ngOnDestroySubject_ === undefined) {
      this.ngOnDestroySubject_ = new ReplaySubject<void>(1);
    }

    return this.ngOnDestroySubject_;
  }

  get ngOnDestroy$() {
    return this.ngOnDestroySubject.asObservable();
  }

  ngOnDestroy(): void {
    this.ngOnDestroySubject.next();
    this.ngOnDestroySubject.complete();
  }
}
