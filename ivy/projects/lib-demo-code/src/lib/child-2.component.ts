import { Component, OnDestroy, OnInit } from '@angular/core';
import { OnDestroy$, takeUntilDestroyed } from '@pdtec/ngx-observable-lifecycle';
import { ObservableService } from './observable.service';

class ComponentBaseClass implements OnInit, OnDestroy {
  constructor(x: number) {
  }

  ngOnInit() {
    console.debug('base class ngOnInit called');
  }

  ngOnDestroy() {
    console.debug('base class ngOnDestroy called');
  }
}

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
    super(1);

    service.value$
      .pipe(takeUntilDestroyed(this))
      .subscribe(x => this.value = x);
  }
}
