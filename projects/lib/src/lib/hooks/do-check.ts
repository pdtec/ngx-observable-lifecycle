import { DoCheck, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { WithObservableLifecycleHook } from '../with-observable-lifecycle-hook';

export interface IDoCheck$ {
  readonly ngDoCheck$: Observable<void>;
}

export function WithDoCheck$<T extends Type<any>>(): Type<IDoCheck$>;
export function WithDoCheck$<T extends Type<any>>(Base?: T): T & Type<IDoCheck$>;
export function WithDoCheck$<T extends Type<any>>(Base?: T) {
  return WithObservableLifecycleHook<DoCheck, IDoCheck$, T>(
    'ngDoCheck', 'ngDoCheck$', Base
  );
}

export const DoCheck$ = WithDoCheck$();
