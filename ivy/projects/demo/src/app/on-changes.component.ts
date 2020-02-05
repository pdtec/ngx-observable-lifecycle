import { Component, Input } from '@angular/core';
import { currentValueOf, OnChanges$, takeUntilDestroyed, WithOnDestroy$ } from '@pdtec/ngx-observable-lifecycle';
import { map } from 'rxjs/operators';

class OnChangesBase {
  // @Input()
  // public value: number | undefined;

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('base class ngOnChanges');
  // }
}

// const Base = WithOnDestroy$(WithOnChanges$(OnChangesBase));
const Base = WithOnDestroy$(OnChanges$);

@Component({
  selector: 'app-on-changes',
  template: '<div>Input Value: {{value}}</div>',
})
export class OnChangesComponent extends Base {
  @Input()
  // public value: number = 5;
  public value: number | undefined = 5;

  constructor() {
    super();

    this.ngOnChanges$
      .pipe(
        takeUntilDestroyed(this),
      )
      .subscribe(change => {
        console.log('ngOnChanges$ triggered');
      });

    this.ngOnChanges$
      .pipe(
        currentValueOf('value'),
        map(value => value), // just to import map always
        // map(value => value.toFixed()), // should not compile, could be undefined
        takeUntilDestroyed(this),
      )
      .subscribe(change => console.log('value changed'));
  }
}
