import { OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

export interface IOnDestroy$ extends OnDestroy {
  readonly ngOnDestroy$: Observable<void>;
}

export class OnDestroy$ implements IOnDestroy$ {
  private ngOnDestroy$_ = new ReplaySubject<void>(1);

  get ngOnDestroy$() {
    return this.ngOnDestroy$_.asObservable();
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$_.next();
    this.ngOnDestroy$_.complete();
  }
}
