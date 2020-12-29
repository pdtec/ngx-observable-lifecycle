import { Directive, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { OnDestroy$ } from './on-destroy';
import { input$, inputs$Impl } from '../operators/only-changes-of';

export interface TypedChange<T> {
  readonly previousValue: T | undefined;
  readonly currentValue: T;
  readonly firstChange: boolean;
  isFirstChange(): boolean;
}

export type TypedChanges<T> = {
  readonly [P in keyof T]?: TypedChange<T[P]>;
};

export interface IOnChanges$ extends OnChanges {
  readonly ngOnChanges$: Observable<TypedChanges<this>>;
}

@Directive()
export class OnChanges$ extends OnDestroy$ implements IOnChanges$ {
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
