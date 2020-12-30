import { AfterContentInit, Directive } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

export interface IAfterContentInit$ extends AfterContentInit {
  readonly ngAfterContentInit$: Observable<void>;
}

@Directive()
export class AfterContentInit$ implements IAfterContentInit$ {
  // just for type safety
  private ngAfterContentInitSubject_!: ReplaySubject<void>;

  // initialize field in getter instead of constructor to be mixin friendly
  // getter is a property of the prototype and get's copied
  private get ngAfterContentInitSubject() {
    if (this.ngAfterContentInitSubject_ === undefined) {
      this.ngAfterContentInitSubject_ = new ReplaySubject<void>(1);
    }

    return this.ngAfterContentInitSubject_;
  }

  get ngAfterContentInit$() {
    return this.ngAfterContentInitSubject.asObservable();
  }

  ngAfterContentInit(): void {
    this.ngAfterContentInitSubject.next();
    this.ngAfterContentInitSubject.complete();
  }
}
