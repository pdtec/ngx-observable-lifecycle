import { AfterContentInit, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { WithObservableLifecycleHook } from '../with-observable-lifecycle-hook';

export interface IAfterContentInit$ {
  readonly ngAfterContentInit$: Observable<void>;
}

export function WithAfterContentInit$<T extends Type<any>>(): Type<IAfterContentInit$>;
export function WithAfterContentInit$<T extends Type<any>>(Base?: T): T & Type<IAfterContentInit$>;
export function WithAfterContentInit$<T extends Type<any>>(Base?: T) {
  if (Base !== undefined) {
    return WithObservableLifecycleHook<AfterContentInit, IAfterContentInit$, T>(
      'ngAfterContentInit', 'ngAfterContentInit$', Base
    );
  }
  else {
    return WithObservableLifecycleHook<AfterContentInit, IAfterContentInit$, T>(
      'ngAfterContentInit', 'ngAfterContentInit$'
    );
  }
}

export const AfterContentInit$ = WithAfterContentInit$();
