import { Component } from '@angular/core';
import { OnDestroy$, takeUntilDestroyed } from '@pdtec/ngx-observable-lifecycle';
import { ObservableService } from './observable.service';

@Component({
  selector: 'app-child-1',
  template: '<div>Child 1 Value: {{value}}</div>',
})
export class Child1Component extends OnDestroy$ {
  public value: number | undefined;

  constructor(service: ObservableService) {
    super();

    service.value$
      .pipe(takeUntilDestroyed(this))
      .subscribe(x => this.value = x);
  }
}
