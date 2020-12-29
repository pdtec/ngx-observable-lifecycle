import { OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

export interface IOnDestroy$ extends OnDestroy {
  readonly ngOnDestroy$: Observable<void>;
}

// TODO: Add Angular decorator.
export class OnDestroy$ implements IOnDestroy$ {
  // just for type safety
  private ngOnDestroySubject_!: ReplaySubject<void>;

  // initialize field in getter instead of constructor to be mixin friendly
  // getter is a property of the prototype and get's copied
  private get ngOnDestroySubject() {
    if (this.ngOnDestroySubject_ === undefined) {
      this.ngOnDestroySubject_ = new ReplaySubject<void>(1);
    }

    return this.ngOnDestroySubject_;
  }

  get ngOnDestroy$() {
    return this.ngOnDestroySubject.asObservable();
  }

  ngOnDestroy(): void {
    this.ngOnDestroySubject.next();
    this.ngOnDestroySubject.complete();
  }
}
