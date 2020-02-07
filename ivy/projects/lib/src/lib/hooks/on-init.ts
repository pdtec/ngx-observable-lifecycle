import { OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { OnDestroy$ } from './on-destroy';

export interface IOnInit$ extends OnInit {
  readonly ngOnInit$: Observable<void>;
}

export class OnInit$ extends OnDestroy$ implements IOnInit$ {
  private ngOnInit$_ = new ReplaySubject<void>(1);

  ngOnInit(): void {
    this.ngOnInit$_.next();
    this.ngOnInit$_.complete();
  }

  get ngOnInit$() {
    return this.ngOnInit$_.asObservable();
  }
}
