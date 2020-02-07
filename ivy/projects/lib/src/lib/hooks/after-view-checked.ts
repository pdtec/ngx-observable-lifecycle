import { AfterViewChecked } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { OnDestroy$ } from './on-destroy';

export interface IAfterViewChecked$ extends AfterViewChecked {
  readonly ngAfterViewChecked$: Observable<void>;
}

export class AfterViewChecked$ extends OnDestroy$ implements IAfterViewChecked$ {
  private ngAfterViewChecked$_ = new ReplaySubject<void>(1);

  get ngAfterViewChecked$() {
    return this.ngAfterViewChecked$_.asObservable();
  }

  ngAfterViewChecked(): void {
    this.ngAfterViewChecked$_.next();
  }

  ngOnDestroy(): void {
    this.ngAfterViewChecked$_.complete();
    super.ngOnDestroy();
  }
}
