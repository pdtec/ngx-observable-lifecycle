import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="show = !show">Toggle</button>
    <app-subscriber-counter></app-subscriber-counter>
    <app-child-1 *ngIf="show"></app-child-1>
    <app-child-2 *ngIf="show"></app-child-2>
  `
})
export class AppComponent {
  show = true;
}
