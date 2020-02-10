import { Component, Input } from '@angular/core';
import { input$, OnChanges$ } from '@pdtec/ngx-observable-lifecycle';

@Component({
  selector: 'app-on-changes',
  template: '<div>Input Value via Observable: {{valueFromObservable}}</div>',
})
export class OnChangesComponent extends OnChanges$ {
  @Input()
  public value: number | undefined = 5;

  public valueFromObservable: number | undefined;

  constructor() {
    super();

    input$(this, 'value')
      .subscribe(value => {
        this.valueFromObservable = value;
      });
  }
}
