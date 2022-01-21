import { AfterContentChecked, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { OnDestroy$ } from './on-destroy';

export interface IAfterContentChecked$ extends AfterContentChecked {
  readonly ngAfterContentChecked$: Observable<void>;
}

@Injectable()
export class AfterContentChecked$ extends OnDestroy$ implements IAfterContentChecked$ {
  // just for type safety
  private ngAfterContentCheckedSubject_!: ReplaySubject<void>;

  // initialize field in getter instead of constructor to be mixin friendly
  // getter is a property of the prototype and get's copied
  private get ngAfterContentCheckedSubject() {
    if (this.ngAfterContentCheckedSubject_ === undefined) {
      this.ngAfterContentCheckedSubject_ = new ReplaySubject<void>(1);
      this.ngOnDestroy$.subscribe(() => this.ngAfterContentCheckedSubject_.complete());
    }

    return this.ngAfterContentCheckedSubject_;
  }

  get ngAfterContentChecked$() {
    return this.ngAfterContentCheckedSubject.asObservable();
  }

  ngAfterContentChecked(): void {
    this.ngAfterContentCheckedSubject.next();
  }
}
