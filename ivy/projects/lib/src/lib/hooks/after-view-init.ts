import { AfterViewInit, Directive } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

export interface IAfterViewInit$ extends AfterViewInit {
  readonly ngAfterViewInit$: Observable<void>;
}

@Directive()
export class AfterViewInit$ implements IAfterViewInit$ {
  // just for type safety
  private ngAfterViewInitSubject_!: ReplaySubject<void>;

  // initialize field in getter instead of constructor to be mixin friendly
  // getter is a property of the prototype and get's copied
  private get ngAfterViewInitSubject() {
    if (this.ngAfterViewInitSubject_ === undefined) {
      this.ngAfterViewInitSubject_ = new ReplaySubject<void>(1);
    }

    return this.ngAfterViewInitSubject_;
  }

  get ngAfterViewInit$() {
    return this.ngAfterViewInitSubject.asObservable();
  }

  ngAfterViewInit(): void {
    this.ngAfterViewInitSubject.next();
    this.ngAfterViewInitSubject.complete();
  }
}
