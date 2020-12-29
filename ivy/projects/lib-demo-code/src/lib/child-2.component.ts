import { Component, QueryList, ViewChildren } from '@angular/core';
import { BaseHooks$, takeUntilDestroyed, viewChildren$ } from '@pdtec/ngx-observable-lifecycle';
import { ObservableService } from './observable.service';
import { OnChangesComponent } from './on-changes.component';

@Component({
  selector: 'app-child-2',
  template: `
    <div>Child 2 Value: {{value}}</div>
    <app-on-changes [value1]="value" [value2]="value"></app-on-changes>
  `,
})
export class Child2Component extends BaseHooks$ {

  @ViewChildren(OnChangesComponent)
  public children: QueryList<OnChangesComponent> | undefined | any;

  public value: number | undefined;

  constructor(service: ObservableService) {
    super();

    service.value$
      .pipe(takeUntilDestroyed(this))
      .subscribe(x => this.value = x);

    viewChildren$(this, 'children')
      .subscribe(x => console.log('view children updated:', x));

    this.viewChildren$('children')
      .subscribe(x => console.log('view children updated:', x));
  }
}
