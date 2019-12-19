import { AfterViewInit, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { WithObservableLifecycleHook } from '../with-observable-lifecycle-hook';

export interface IAfterViewInit$ {
  readonly ngAfterViewInit$: Observable<void>;
}

export function WithAfterViewInit$<T extends Type<any>>(): Type<IAfterViewInit$>;
export function WithAfterViewInit$<T extends Type<any>>(Base?: T): T & Type<IAfterViewInit$>;
export function WithAfterViewInit$<T extends Type<any>>(Base?: T) {
  return WithObservableLifecycleHook<AfterViewInit, IAfterViewInit$, T>(
    'ngAfterViewInit', 'ngAfterViewInit$', Base
  );
}

export const AfterViewInit$ = WithAfterViewInit$();
