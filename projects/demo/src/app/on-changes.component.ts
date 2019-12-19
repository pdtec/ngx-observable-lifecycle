import { Component, Input } from '@angular/core';
import { OnChanges$, takeUntilDestroyed, WithAfterViewInit$, WithOnDestroy$ } from '@pdtec/ngx-observable-lifecycle';
import { onInput } from '../../../lib/src/lib/operators/on-input';

class OnChangesBase {
  // @Input()
  // public value: number | undefined;

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('base class ngOnChanges');
  // }
}

// const Base = WithOnDestroy$(WithOnChanges$(OnChangesBase));
const Base = WithAfterViewInit$(WithOnDestroy$(OnChanges$));

@Component({
  selector: 'app-on-changes',
  template: '<div>Input Value: {{value}}</div>',
})
export class OnChangesComponent extends Base {
  @Input()
  public value: number | undefined;

  constructor() {
    super();

    this.ngAfterViewInit$.subscribe(
      () => console.log('ngAfterViewInit$ next'),
      () => console.log('ngAfterViewInit$ error'),
      () => console.log('ngAfterViewInit$ complete'),
    );

    this.ngOnChanges$
      .pipe(
        onInput('value'),
        takeUntilDestroyed(this),
      )
      .subscribe(change => console.log('ngOnChanges$ triggered'));
  }
}
