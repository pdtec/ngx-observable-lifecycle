import { OnInit, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { WithObservableLifecycleHook } from '../with-observable-lifecycle-hook';

export interface IOnInit$ extends OnInit {
  readonly ngOnInit$: Observable<void>;
}

export function WithObservableOnInit<T extends Type<any>>(): Type<IOnInit$>;
export function WithObservableOnInit<T extends Type<any>>(Base?: T): T & Type<IOnInit$>;
export function WithObservableOnInit<T extends Type<any>>(Base?: T) {
  if (Base !== undefined) {
    return WithObservableLifecycleHook<OnInit, IOnInit$, T>(
      'ngOnInit', 'ngOnInit$', Base
    );
  }
  else {
    return WithObservableLifecycleHook<OnInit, IOnInit$, T>(
      'ngOnInit', 'ngOnInit$'
    );
  }
}

export const OnInit$ = WithObservableOnInit();
