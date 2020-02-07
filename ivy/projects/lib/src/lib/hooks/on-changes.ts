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
  private ngOnChanges$_ = new ReplaySubject<TypedChanges<this>>(1);

  get ngOnChanges$() {
    return this.ngOnChanges$_.asObservable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnChanges$_.next(changes as any);
  }

  ngOnDestroy(): void {
    this.ngOnChanges$_.complete();
    super.ngOnDestroy();
  }
}
