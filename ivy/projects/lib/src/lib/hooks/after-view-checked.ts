import { AfterViewChecked, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { WithObservableLifecycleHook } from '../with-observable-lifecycle-hook';

export interface IAfterViewChecked$ extends AfterViewChecked {
  readonly ngAfterViewChecked$: Observable<void>;
}

export function WithAfterViewChecked$<T extends Type<any>>(): Type<IAfterViewChecked$>;
export function WithAfterViewChecked$<T extends Type<any>>(Base?: T): T & Type<IAfterViewChecked$>;
export function WithAfterViewChecked$<T extends Type<any>>(Base?: T) {
  if (Base !== undefined) {
    return WithObservableLifecycleHook<AfterViewChecked, IAfterViewChecked$, T>(
      'ngAfterViewChecked', 'ngAfterViewChecked$', Base
    );
  }
  else {
    return WithObservableLifecycleHook<AfterViewChecked, IAfterViewChecked$, T>(
      'ngAfterViewChecked', 'ngAfterViewChecked$'
    );
  }
}

export const AfterViewChecked$ = WithAfterViewChecked$();
