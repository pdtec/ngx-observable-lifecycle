import { Directive, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

export interface IOnInit$ extends OnInit {
  readonly ngOnInit$: Observable<void>;
}

@Directive()
export class OnInit$ implements IOnInit$ {
  // just for type safety
  private ngOnInitSubject_!: ReplaySubject<void>;

  // initialize field in getter instead of constructor to be mixin friendly
  // getter is a property of the prototype and get's copied
  private get ngOnInitSubject() {
    if (this.ngOnInitSubject_ === undefined) {
      this.ngOnInitSubject_ = new ReplaySubject<void>(1);
    }

    return this.ngOnInitSubject_;
  }

  get ngOnInit$() {
    return this.ngOnInitSubject.asObservable();
  }

  ngOnInit(): void {
    this.ngOnInitSubject.next();
    this.ngOnInitSubject.complete();
  }
}
