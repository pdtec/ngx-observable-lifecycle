import { DoCheck } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { OnDestroy$ } from './on-destroy';

export interface IDoCheck$ extends DoCheck {
  readonly ngDoCheck$: Observable<void>;
}

export class DoCheck$ extends OnDestroy$ implements IDoCheck$ {
  private ngOnCheck$_ = new ReplaySubject<void>(1);

  get ngDoCheck$() {
    return this.ngOnCheck$_.asObservable();
  }

  ngDoCheck(): void {
    this.ngOnCheck$_.next();
  }

  ngOnDestroy(): void {
    this.ngOnCheck$_.complete();
    super.ngOnDestroy();
  }
}
