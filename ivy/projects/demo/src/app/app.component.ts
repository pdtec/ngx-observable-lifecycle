import { Component } from '@angular/core';
import { OnDestroy$, takeUntilDestroyed } from '@pdtec/ngx-observable-lifecycle';
import { ObservableService } from './observable.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="show = !show">Toggle</button>
    <app-subscriber-counter></app-subscriber-counter>
    <app-child-1 *ngIf="show"></app-child-1>
    <app-child-2 *ngIf="show"></app-child-2>
  `
})
export class AppComponent {
  show = true;
}

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

