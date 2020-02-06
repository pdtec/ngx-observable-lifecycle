import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, LibDemoCodeModule } from 'lib-demo-code';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    LibDemoCodeModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
