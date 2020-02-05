import { DoCheck, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { WithObservableLifecycleHook } from '../with-observable-lifecycle-hook';

export interface IDoCheck$ extends DoCheck {
  readonly ngDoCheck$: Observable<void>;
}

export function WithDoCheck$<T extends Type<any>>(): Type<IDoCheck$>;
export function WithDoCheck$<T extends Type<any>>(Base?: T): T & Type<IDoCheck$>;
export function WithDoCheck$<T extends Type<any>>(Base?: T) {
  if (Base !== undefined) {
    return WithObservableLifecycleHook<DoCheck, IDoCheck$, T>(
      'ngDoCheck', 'ngDoCheck$', Base
    );
  }
  else {
    return WithObservableLifecycleHook<DoCheck, IDoCheck$, T>(
      'ngDoCheck', 'ngDoCheck$'
    );
  }
}

export const DoCheck$ = WithDoCheck$();
