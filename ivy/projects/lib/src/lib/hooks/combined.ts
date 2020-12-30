import { IOnDestroy$, OnDestroy$ } from './on-destroy';
import { AfterContentChecked$, IAfterContentChecked$ } from './after-content-checked';
import { AfterContentInit$, IAfterContentInit$ } from './after-content-init';
import { AfterViewChecked$, IAfterViewChecked$ } from './after-view-checked';
import { AfterViewInit$, IAfterViewInit$ } from './after-view-init';
import { DoCheck$, IDoCheck$ } from './do-check';
import { IOnChanges$, OnChanges$ } from './on-changes';
import { IOnInit$, OnInit$ } from './on-init';
import { applyMixins } from '../mixin';
import { Directive } from '@angular/core';
import { WithViewChildren$ } from '../mixins/with-view-children';

@Directive()
export class AllHooks$ extends OnChanges$ {
  constructor() {
    super();

    // mixing in OnChanges does not work at the moment. angular does not detect the method and therefore does not call it.
    // we need this ugly workaround: directly inherit from OnChanges$, define property on instance and call super
    this.ngOnChanges = (changes) => {
      super.ngOnChanges(changes);
    };
  }
}

export interface AllHooks$ extends IAfterContentChecked$, IAfterContentInit$, IAfterViewChecked$, IAfterViewInit$, IDoCheck$, IOnChanges$, IOnDestroy$, IOnInit$, WithViewChildren$ {}

applyMixins(AllHooks$, [AfterContentChecked$, AfterContentInit$, AfterViewChecked$, AfterViewInit$, DoCheck$, OnDestroy$, OnInit$, WithViewChildren$]);


@Directive()
export class BaseHooks$ extends OnChanges$ {
  constructor() {
    super();

    // mixing in OnChanges does not work at the moment. angular does not detect the method and therefore does not call it.
    // we need this ugly workaround: directly inherit from OnChanges$, define property on instance and call super
    this.ngOnChanges = (changes) => {
      super.ngOnChanges(changes);
    };
  }
}

export interface BaseHooks$ extends IOnInit$, IAfterViewInit$, IOnChanges$, IOnDestroy$, WithViewChildren$ {}

applyMixins(BaseHooks$, [OnInit$, AfterViewInit$, OnDestroy$, WithViewChildren$]);


export class AfterViewInit$AndOnDestroy$ {}

export interface AfterViewInit$AndOnDestroy$ extends IAfterViewInit$, IOnDestroy$, WithViewChildren$ {}

applyMixins(AfterViewInit$AndOnDestroy$, [AfterViewInit$, OnDestroy$, WithViewChildren$]);
