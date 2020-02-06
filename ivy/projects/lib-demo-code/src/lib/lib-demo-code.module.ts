import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Child1Component } from './child-1.component';
import { Child2Component } from './child-2.component';
import { OnChangesComponent } from './on-changes.component';
import { SubscriberCounterComponent } from './subscriber-counter.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    Child1Component,
    Child2Component,
    OnChangesComponent,
    SubscriberCounterComponent,
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
  ]
})
export class LibDemoCodeModule { }

