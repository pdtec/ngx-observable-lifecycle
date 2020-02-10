import { DoCheck } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { OnDestroy$ } from './on-destroy';

export interface IDoCheck$ extends DoCheck {
  readonly ngDoCheck$: Observable<void>;
}

export class DoCheck$ extends OnDestroy$ implements IDoCheck$ {
  // just for type safety
  private ngDoCheckSubject_!: ReplaySubject<void>;

  // initialize field in getter instead of constructor to be mixin friendly
  // getter is a property of the prototype and get's copied
  private get ngDoCheckSubject() {
    if (this.ngDoCheckSubject_ === undefined) {
      this.ngDoCheckSubject_ = new ReplaySubject<void>(1);
      this.ngOnDestroy$.subscribe(() => this.ngDoCheckSubject_.complete());
    }

    return this.ngDoCheckSubject_;
  }

  get ngDoCheck$() {
    return this.ngDoCheckSubject.asObservable();
  }

  ngDoCheck(): void {
    this.ngDoCheckSubject.next();
  }
}
