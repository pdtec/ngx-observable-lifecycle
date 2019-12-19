import { OnInit, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { WithObservableLifecycleHook } from '../with-observable-lifecycle-hook';

export interface IOnInit$ {
  readonly ngOnInit$: Observable<void>;
}

export function WithObservableOnInit<T extends Type<any>>(): Type<IOnInit$>;
export function WithObservableOnInit<T extends Type<any>>(Base?: T): T & Type<IOnInit$>;
export function WithObservableOnInit<T extends Type<any>>(Base?: T) {
  return WithObservableLifecycleHook<OnInit, IOnInit$, T>(
    'ngOnInit', 'ngOnInit$', Base
  );
}

export const OnInit$ = WithObservableOnInit();
