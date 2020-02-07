import { Component, Input } from '@angular/core';
import { input$, OnChanges$, takeUntilDestroyed } from '@pdtec/ngx-observable-lifecycle';


@Component({
  selector: 'app-on-changes',
  template: '<div>Input Value via Observable: {{valueFromObservable}}</div>',
})
export class OnChangesComponent extends OnChanges$ {
  @Input()
  // public value: number = 5;
  public value: number | undefined = 5;

  public valueFromObservable: number | undefined;

  constructor() {
    super();

    this.ngOnChanges$
      .pipe(
        takeUntilDestroyed(this),
      )
      .subscribe(change => {
        console.log('ngOnChanges$ triggered');
      });

    input$(this, 'value')
      .subscribe(value => {
        this.valueFromObservable = value;
        console.log('value changed');
      });
  }
}
