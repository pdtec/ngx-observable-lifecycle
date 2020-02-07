import { AfterContentChecked } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { OnDestroy$ } from './on-destroy';

export interface IAfterContentChecked$ extends AfterContentChecked {
  readonly ngAfterContentChecked$: Observable<void>;
}

export class AfterContentChecked$ extends OnDestroy$ implements IAfterContentChecked$ {
  private ngAfterContentChecked$_ = new ReplaySubject<void>(1);

  get ngAfterContentChecked$() {
    return this.ngAfterContentChecked$_.asObservable();
  }

  ngAfterContentChecked(): void {
    this.ngAfterContentChecked$_.next();
  }

  ngOnDestroy(): void {
    this.ngAfterContentChecked$_.complete();
    super.ngOnDestroy();
  }
}
