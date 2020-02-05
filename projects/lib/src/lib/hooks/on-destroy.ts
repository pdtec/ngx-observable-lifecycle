import { OnDestroy, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { WithObservableLifecycleHook } from '../with-observable-lifecycle-hook';

export interface IOnDestroy$ extends OnDestroy {
  readonly ngOnDestroy$: Observable<void>;
}

export function WithOnDestroy$<T extends Type<any>>(): Type<IOnDestroy$>;
export function WithOnDestroy$<T extends Type<any>>(Base?: T): T & Type<IOnDestroy$>;
export function WithOnDestroy$<T extends Type<any>>(Base?: T) {
  if (Base !== undefined) {
    return WithObservableLifecycleHook<OnDestroy, IOnDestroy$, T>(
      'ngOnDestroy', 'ngOnDestroy$', Base
    );
  }
  else {
    return WithObservableLifecycleHook<OnDestroy, IOnDestroy$, T>(
      'ngOnDestroy', 'ngOnDestroy$'
    );
  }
}

export const OnDestroy$ = WithOnDestroy$();
