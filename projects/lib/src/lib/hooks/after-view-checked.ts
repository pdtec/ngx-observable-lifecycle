import { AfterViewChecked, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { OnDestroy$ } from './on-destroy';

export interface IAfterViewChecked$ extends AfterViewChecked {
  readonly ngAfterViewChecked$: Observable<void>;
}

@Injectable()
export class AfterViewChecked$ extends OnDestroy$ implements IAfterViewChecked$ {
  // just for type safety
  private ngAfterViewCheckedSubject_!: ReplaySubject<void>;

  // initialize field in getter instead of constructor to be mixin friendly
  // getter is a property of the prototype and get's copied
  private get ngAfterViewCheckedSubject() {
    if (this.ngAfterViewCheckedSubject_ === undefined) {
      this.ngAfterViewCheckedSubject_ = new ReplaySubject<void>(1);
      this.ngOnDestroy$.subscribe(() => this.ngAfterViewCheckedSubject_.complete());
    }

    return this.ngAfterViewCheckedSubject_;
  }

  get ngAfterViewChecked$() {
    return this.ngAfterViewCheckedSubject.asObservable();
  }

  ngAfterViewChecked(): void {
    this.ngAfterViewCheckedSubject.next();
  }
}
