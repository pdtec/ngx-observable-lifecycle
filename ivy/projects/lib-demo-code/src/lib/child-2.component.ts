import { Component } from '@angular/core';
import { OnDestroy$, takeUntilDestroyed } from '@pdtec/ngx-observable-lifecycle';
import { ObservableService } from './observable.service';

@Component({
  selector: 'app-child-2',
  template: `
    <div>Child 2 Value: {{value}}</div>
    <app-on-changes [value]="value"></app-on-changes>
  `,
})
export class Child2Component extends OnDestroy$ {
  public value: number | undefined;

  constructor(service: ObservableService) {
    super();

    service.value$
      .pipe(takeUntilDestroyed(this))
      .subscribe(x => this.value = x);
  }
}
