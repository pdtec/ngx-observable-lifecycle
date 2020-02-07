import { AfterViewInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { OnDestroy$ } from './on-destroy';

export interface IAfterViewInit$ extends AfterViewInit {
  readonly ngAfterViewInit$: Observable<void>;
}

export class AfterViewInit$ extends OnDestroy$ implements IAfterViewInit$ {
  private ngAfterViewInit$_ = new ReplaySubject<void>(1);

  get ngAfterViewInit$() {
    return this.ngAfterViewInit$_.asObservable();
  }

  ngAfterViewInit(): void {
    this.ngAfterViewInit$_.next();
    this.ngAfterViewInit$_.complete();
  }
}
