import { AfterViewChecked, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { WithObservableLifecycleHook } from '../with-observable-lifecycle-hook';

export interface IAfterViewChecked$ {
  readonly ngAfterViewChecked$: Observable<void>;
}

export function WithAfterViewChecked$<T extends Type<any>>(): Type<IAfterViewChecked$>;
export function WithAfterViewChecked$<T extends Type<any>>(Base?: T): T & Type<IAfterViewChecked$>;
export function WithAfterViewChecked$<T extends Type<any>>(Base?: T) {
  return WithObservableLifecycleHook<AfterViewChecked, IAfterViewChecked$, T>(
    'ngAfterViewChecked', 'ngAfterViewChecked$', Base
  );
}

export const AfterViewChecked$ = WithAfterViewChecked$();
