import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Child1Component } from './child-1.component';
import { Child2Component } from './child-2.component';
import { OnChangesComponent } from './on-changes.component';
import { SubscriberCounterComponent } from './subscriber-counter.component';
import { UsageComponent, UsageDirective, UsagePipe } from './usage';
import { AppComponent } from './app.component';

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
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
