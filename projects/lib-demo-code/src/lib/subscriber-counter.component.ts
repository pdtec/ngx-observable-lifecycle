import { Component } from '@angular/core';
import { OnDestroy$, takeUntilDestroyed } from '@pdtec/ngx-observable-lifecycle';
import { ObservableService } from './observable.service';

@Component({
  selector: 'app-subscriber-counter',
  template: '<div>Subscriber: {{value}}</div>',
})
export class SubscriberCounterComponent extends OnDestroy$ {
  public value: number | undefined;

  constructor(service: ObservableService) {
    super();

    service.subscribers$
      .pipe(takeUntilDestroyed(this))
      .subscribe(x => this.value = x);
  }
}
