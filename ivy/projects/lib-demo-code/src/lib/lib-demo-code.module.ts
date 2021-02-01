import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Child1Component } from './child-1.component';
import { Child2Component } from './child-2.component';
import { OnChangesComponent } from './on-changes.component';
import { SubscriberCounterComponent } from './subscriber-counter.component';
import { CommonModule } from '@angular/common';
import { UsageComponent, UsageDirective, UsagePipe } from './usage';

@NgModule({
  declarations: [
    AppComponent,
    Child1Component,
    Child2Component,
    OnChangesComponent,
    SubscriberCounterComponent,
    UsageDirective,
    UsageComponent,
    UsagePipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AppComponent,
    Child1Component,
    Child2Component,
    OnChangesComponent,
    SubscriberCounterComponent,
    UsageDirective,
    UsageComponent,
    UsagePipe,
  ]
})
export class LibDemoCodeModule { }

