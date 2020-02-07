import { AfterContentInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { OnDestroy$ } from './on-destroy';

export interface IAfterContentInit$ extends AfterContentInit {
  readonly ngAfterContentInit$: Observable<void>;
}

export class AfterContentInit$ extends OnDestroy$ implements IAfterContentInit$ {
  private ngAfterContentInit$_ = new ReplaySubject<void>(1);

  get ngAfterContentInit$() {
    return this.ngAfterContentInit$_.asObservable();
  }

  ngAfterContentInit(): void {
    this.ngAfterContentInit$_.next();
    this.ngAfterContentInit$_.complete();
  }
}
