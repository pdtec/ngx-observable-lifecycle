import { Component } from '@angular/core';
import { UsageService } from './usage';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="show = !show">Toggle</button>
    <app-subscriber-counter></app-subscriber-counter>
    <app-child-1 *ngIf="show"></app-child-1>
    <app-child-2 *ngIf="show"></app-child-2>

    <div usage [class.foo]="true | usage">
      <usage></usage>
    </div>
  `
})
export class AppComponent {
  show = true;

  constructor(private readonly usageService: UsageService) {
  }
}
