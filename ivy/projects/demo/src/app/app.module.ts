import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, SubscriberCounterComponent } from './app.component';
import { Child1Component } from './child-1.component';
import { Child2Component } from './child-2.component';
import { OnChangesComponent } from './on-changes.component';

@NgModule({
  declarations: [
    AppComponent,
    Child1Component,
    Child2Component,
    SubscriberCounterComponent,
    OnChangesComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
