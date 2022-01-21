import { Component, Input } from '@angular/core';
import { input$, OnChanges$ } from '@pdtec/ngx-observable-lifecycle';

@Component({
  selector: 'app-on-changes',
  template: '<div>Input Value via Observable: {{valueFromObservable}}</div>',
})
export class OnChangesComponent extends OnChanges$ {
  @Input()
  public value1: number | undefined;

  @Input()
  public value2: number | undefined;

  public valueFromObservable: number | undefined;

  constructor() {
    super();

    input$(this, 'value1')
      .subscribe(value => {
        this.valueFromObservable = value;
      });

    this.inputs$('value1', 'value2').subscribe(x => {
      console.log(`x.value`, x.value1);
      console.log(`x.value2`, x.value2);
    });
  }
}
