import { Injectable, SimpleChanges } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { IAfterContentChecked$ } from './after-content-checked';
import { IAfterContentInit$ } from './after-content-init';
import { IAfterViewChecked$ } from './after-view-checked';
import { IAfterViewInit$ } from './after-view-init';
import { IDoCheck$ } from './do-check';
import { IOnChanges$, TypedChanges } from './on-changes';
import { IOnDestroy$ } from './on-destroy';
import { IOnInit$ } from './on-init';
import { ObjectWithQueryList, viewChildren$ } from '../operators/view-children';
import { input$, inputs$Impl } from '../operators/only-changes-of';

@Injectable()
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

  public viewChildren$<T extends ObjectWithQueryList<T, P> & IAfterViewInit$ & IOnDestroy$ , P extends keyof T>(this: T, property: P) {
    return viewChildren$(this, property);
  }

  /**
   * Observe the given property for changes.
   */
  input$<P extends keyof this>(property: P): Observable<this[P]> {
    return input$(this, property);
  }


  /**
   * Observes the given properties for changes (via OnChanges hook).
   * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
   */
  inputs$<P extends keyof this>(p1: P): Observable<{ [X in P]: this[X]}>;

  /**
   * Observes the given properties for changes (via OnChanges hook).
   * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
   */
  inputs$<P extends keyof this>(p1: P, p2: P): Observable<{ [X in P]: this[X]}>;

  /**
   * Observes the given properties for changes (via OnChanges hook).
   * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
   */
  inputs$<P extends keyof this>(p1: P, p2: P, p3: P): Observable<{ [X in P]: this[X]}>;

  /**
   * Observes the given properties for changes (via OnChanges hook).
   * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
   */
  inputs$<P extends keyof this>(p1: P, p2: P, p3: P, p4: P): Observable<{ [X in P]: this[X]}>;

  /**
   * Observes the given properties for changes (via OnChanges hook).
   * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
   */
  inputs$<P extends keyof this>(p1: P, p2: P, p3: P, p4: P, p5: P): Observable<{ [X in P]: this[X]}>;

  /**
   * Observes the given properties for changes (via OnChanges hook).
   * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
   */
  inputs$<P extends keyof this>(p1: P, p2: P, p3: P, p4: P, p5: P, p6: P): Observable<{ [X in P]: this[X]}>;

  /**
   * Observes the given properties for changes (via OnChanges hook).
   * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
   */
  inputs$<P extends keyof this>(p1: P, p2: P, p3: P, p4: P, p5: P, p6: P, p7: P): Observable<{ [X in P]: this[X]}>;

  /**
   * Observes the given properties for changes (via OnChanges hook).
   * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
   */
  inputs$<P extends keyof this>(p1: P, p2: P, p3: P, p4: P, p5: P, p6: P, p7: P, p8: P): Observable<{ [X in P]: this[X]}>;

  /**
   * Observes the given properties for changes (via OnChanges hook).
   * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
   */
  inputs$<P extends keyof this>(p1: P, p2: P, p3: P, p4: P, p5: P, p6: P, p7: P, p8: P, p9: P): Observable<{ [X in P]: this[X]}>;

  // Using var-args parameter breaks refactoring support. Renaming properties will not change the property passed to this method.
  // I don't think we need more than 9 parameters, so we comment out this option.
  // inputs$<P extends keyof this>(...properties: P[]): Observable<{ [X in P]: this[X]}>;

  inputs$<P extends keyof this>(...properties: P[]) {
    return inputs$Impl(this, ...properties);
  }
}

@Injectable()
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

  public viewChildren$<T extends ObjectWithQueryList<T, P> & IAfterViewInit$ & IOnDestroy$ , P extends keyof T>(this: T, property: P) {
    return viewChildren$(this, property);
  }

  /**
   * Observe the given property for changes.
   */
  input$<P extends keyof this>(property: P): Observable<this[P]> {
    return input$(this, property);
  }


  /**
   * Observes the given properties for changes (via OnChanges hook).
   * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
   */
  inputs$<P extends keyof this>(p1: P): Observable<{ [X in P]: this[X]}>;

  /**
   * Observes the given properties for changes (via OnChanges hook).
   * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
   */
  inputs$<P extends keyof this>(p1: P, p2: P): Observable<{ [X in P]: this[X]}>;

  /**
   * Observes the given properties for changes (via OnChanges hook).
   * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
   */
  inputs$<P extends keyof this>(p1: P, p2: P, p3: P): Observable<{ [X in P]: this[X]}>;

  /**
   * Observes the given properties for changes (via OnChanges hook).
   * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
   */
  inputs$<P extends keyof this>(p1: P, p2: P, p3: P, p4: P): Observable<{ [X in P]: this[X]}>;

  /**
   * Observes the given properties for changes (via OnChanges hook).
   * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
   */
  inputs$<P extends keyof this>(p1: P, p2: P, p3: P, p4: P, p5: P): Observable<{ [X in P]: this[X]}>;

  /**
   * Observes the given properties for changes (via OnChanges hook).
   * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
   */
  inputs$<P extends keyof this>(p1: P, p2: P, p3: P, p4: P, p5: P, p6: P): Observable<{ [X in P]: this[X]}>;

  /**
   * Observes the given properties for changes (via OnChanges hook).
   * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
   */
  inputs$<P extends keyof this>(p1: P, p2: P, p3: P, p4: P, p5: P, p6: P, p7: P): Observable<{ [X in P]: this[X]}>;

  /**
   * Observes the given properties for changes (via OnChanges hook).
   * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
   */
  inputs$<P extends keyof this>(p1: P, p2: P, p3: P, p4: P, p5: P, p6: P, p7: P, p8: P): Observable<{ [X in P]: this[X]}>;

  /**
   * Observes the given properties for changes (via OnChanges hook).
   * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
   */
  inputs$<P extends keyof this>(p1: P, p2: P, p3: P, p4: P, p5: P, p6: P, p7: P, p8: P, p9: P): Observable<{ [X in P]: this[X]}>;

  // Using var-args parameter breaks refactoring support. Renaming properties will not change the property passed to this method.
  // I don't think we need more than 9 parameters, so we comment out this option.
  // inputs$<P extends keyof this>(...properties: P[]): Observable<{ [X in P]: this[X]}>;

  inputs$<P extends keyof this>(...properties: P[]) {
    return inputs$Impl(this, ...properties);
  }
}

@Injectable()
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

  public viewChildren$<T extends ObjectWithQueryList<T, P> & IAfterViewInit$ & IOnDestroy$ , P extends keyof T>(this: T, property: P) {
    return viewChildren$(this, property);
  }
}
