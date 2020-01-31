import { Type } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export function WithObservableLifecycleHook<H, H$, T extends Type<any>>(lifecycle: keyof H, observable: keyof H$): Type<H$>;
export function WithObservableLifecycleHook<H, H$, T extends Type<any>>(lifecycle: keyof H, observable: keyof H$, Base: T): T & Type<H$>;

export function WithObservableLifecycleHook<H, H$, T extends Type<any>>(lifecycle: keyof H, observable: keyof H$, Base?: T) {
  const lifecycle$ = Symbol(observable.toString());

  let clazz: Type<any>;
  if (Base !== undefined) {
    class ObservableLifecycle extends Base {
      // subject has to be per instance, not on the prototype
      private [lifecycle$] = new ReplaySubject<any>(1);
    }

    clazz = ObservableLifecycle;
  } else {
    class ObservableLifecycle {
      // subject has to be per instance, not on the prototype
      private [lifecycle$] = new ReplaySubject<any>(1);
    }

    clazz = ObservableLifecycle;
  }

  Object.defineProperty(clazz.prototype, lifecycle, {
    get() {
      return function(this: any, ...args: any[]) {
        this[lifecycle$].next(args[0]);

        if (lifecycle === 'ngOnDestroy') {
          this[lifecycle$].complete();
        }

        callSuper(this, lifecycle, args, Base);
      };
    },
    enumerable: false,
  });

  if (lifecycle !== 'ngOnDestroy') {
    Object.defineProperty(clazz.prototype, 'ngOnDestroy', {
      get() {
        return function(this: any, ...args: any[]) {
          this[lifecycle$].complete();
          callSuper(this, 'ngOnDestroy', args, Base);
        };
      },
      enumerable: false,
    });
  }

  Object.defineProperty(clazz.prototype, observable, {
    get(this: any) {
      return this[lifecycle$].asObservable();
    },
    enumerable: false,
  });

  return clazz;
}

export function callSuper<T>(that: T, lifecycle: string | number | symbol, args: any[], Base?: Type<T>) {
  const superImpl = Base !== undefined ? Base.prototype[lifecycle] : undefined;
  if (typeof superImpl === 'function') {
    superImpl.apply(that, args);
  }
}
