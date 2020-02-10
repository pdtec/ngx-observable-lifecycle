import { OnChanges, SimpleChanges } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { OnDestroy$ } from './on-destroy';

export interface TypedChange<T> {
  readonly previousValue: T | undefined;
  readonly currentValue: T;
  readonly firstChange: boolean;
  isFirstChange(): boolean;
}

export type TypedChanges<T> = {
  readonly [P in keyof T]?: TypedChange<T[P]>;
};

export interface IOnChanges$ extends OnChanges {
  readonly ngOnChanges$: Observable<TypedChanges<this>>;
}

export class OnChanges$ extends OnDestroy$ implements IOnChanges$ {
  // just for type safety
  private ngOnChangesSubject_!: ReplaySubject<TypedChanges<this>>;

  // initialize field in getter instead of constructor to be mixin friendly
  // getter is a property of the prototype and get's copied
  get ngOnChangesSubject() {
    if (this.ngOnChangesSubject_ === undefined) {
      this.ngOnChangesSubject_ = new ReplaySubject<TypedChanges<this>>(1);
      this.ngOnDestroy$.subscribe(() => this.ngOnChangesSubject_.complete());
    }

    return this.ngOnChangesSubject_;
  }

  get ngOnChanges$() {
    return this.ngOnChangesSubject.asObservable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnChangesSubject.next(changes as any);
  }
}
