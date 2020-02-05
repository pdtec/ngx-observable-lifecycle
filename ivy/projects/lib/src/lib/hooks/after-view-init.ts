import { AfterViewInit, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { WithObservableLifecycleHook } from '../with-observable-lifecycle-hook';

export interface IAfterViewInit$ extends AfterViewInit {
  readonly ngAfterViewInit$: Observable<void>;
}

export function WithAfterViewInit$<T extends Type<any>>(): Type<IAfterViewInit$>;
export function WithAfterViewInit$<T extends Type<any>>(Base?: T): T & Type<IAfterViewInit$>;
export function WithAfterViewInit$<T extends Type<any>>(Base?: T) {
  if (Base !== undefined) {
    return WithObservableLifecycleHook<AfterViewInit, IAfterViewInit$, T>(
      'ngAfterViewInit', 'ngAfterViewInit$', Base
    );
  }
  else {
    return WithObservableLifecycleHook<AfterViewInit, IAfterViewInit$, T>(
      'ngAfterViewInit', 'ngAfterViewInit$'
    );
  }
}

export const AfterViewInit$ = WithAfterViewInit$();
