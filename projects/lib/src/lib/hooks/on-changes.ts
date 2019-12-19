import { OnChanges, OnDestroy, SimpleChanges, Type } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

export type TypedChange<T> = {
  readonly previousValue: T | undefined;
  readonly currentValue: T;
  readonly firstChange: boolean;
  isFirstChange(): boolean;
}

export type TypedChanges<T> = {
  readonly [P in keyof T]: TypedChange<T[P]>;
};

export interface IOnChanges$ {
  ngOnChanges(changes: SimpleChanges);
  readonly ngOnChanges$: Observable<TypedChanges<this>>;
}

export function WithOnChanges$<T extends Type<any>>(): Type<IOnChanges$>;
// export function WithOnChanges$<T extends Type<any>>(Base?: T): T & Type<IOnChanges$> & Type<AOnChanges$>;
export function WithOnChanges$<T extends Type<any>>(/*Base?: T*/) {
  // return WithObservableLifecycleHook<OnChanges, IOnChanges$, T>(
  //   'ngOnChanges', 'ngOnChanges$', Base
  // );

  const lifecycle$ = Symbol('ngOnChanges$');
  return class ObservableLifecycle extends Dummy implements OnChanges, OnDestroy {
    private [lifecycle$] = new ReplaySubject<any>(1);

    public ngOnChanges(changes: SimpleChanges) {
      this[lifecycle$].next(changes);
    }

    public ngOnDestroy() {
      this[lifecycle$].complete();
    }

    public get ngOnChanges$() {
      return this[lifecycle$].asObservable();
    }
  };
}

class Dummy implements OnChanges {
  ngOnChanges(changes: SimpleChanges) {}
}

export const OnChanges$ = WithOnChanges$();
