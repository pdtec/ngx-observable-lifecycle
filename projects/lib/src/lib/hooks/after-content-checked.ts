import { AfterContentChecked, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { WithObservableLifecycleHook } from '../with-observable-lifecycle-hook';

export interface IAfterContentChecked$ {
  readonly ngAfterContentChecked$: Observable<void>;
}

export function WithAfterContentChecked$<T extends Type<any>>(): Type<IAfterContentChecked$>;
export function WithAfterContentChecked$<T extends Type<any>>(Base?: T): T & Type<IAfterContentChecked$>;
export function WithAfterContentChecked$<T extends Type<any>>(Base?: T) {
  if (Base !== undefined) {
    return WithObservableLifecycleHook<AfterContentChecked, IAfterContentChecked$, T>(
      'ngAfterContentChecked', 'ngAfterContentChecked$', Base
    );
  }
  else {
    return WithObservableLifecycleHook<AfterContentChecked, IAfterContentChecked$, T>(
      'ngAfterContentChecked', 'ngAfterContentChecked$'
    );
  }

}

export const AfterContentChecked$ = WithAfterContentChecked$();
