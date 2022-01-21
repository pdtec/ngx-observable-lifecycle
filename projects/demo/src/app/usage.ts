import { Component, Directive, Injectable, Pipe, PipeTransform } from '@angular/core';
import { OnDestroy$ } from '@pdtec/ngx-observable-lifecycle';

@Directive({
  selector: '[usage]'
})
export class UsageDirective extends OnDestroy$ {
}

@Component({
  selector: 'usage',
  template: ''
})
export class UsageComponent extends OnDestroy$ {
}

@Pipe({
  name: 'usage'
})
export class UsagePipe extends OnDestroy$ implements PipeTransform {
  transform(value: any, ...args: any[]): any {
  }
}

@Injectable({
  providedIn: 'root'
})
export class UsageService extends OnDestroy$ {

}
