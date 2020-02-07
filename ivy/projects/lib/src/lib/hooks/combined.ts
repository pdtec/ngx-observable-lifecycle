import { IOnDestroy$, OnDestroy$ } from './on-destroy';
import { AfterContentChecked$, IAfterContentChecked$ } from './after-content-checked';
import { AfterContentInit$, IAfterContentInit$ } from './after-content-init';
import { AfterViewChecked$, IAfterViewChecked$ } from './after-view-checked';
import { AfterViewInit$, IAfterViewInit$ } from './after-view-init';
import { DoCheck$, IDoCheck$ } from './do-check';
import { IOnChanges$, OnChanges$ } from './on-changes';
import { IOnInit$, OnInit$ } from './on-init';
import { applyMixins } from '../mixin';

export class AllHooks {}

export interface AllHooks$ extends IAfterContentChecked$, IAfterContentInit$, IAfterViewChecked$, IAfterViewInit$, IDoCheck$, IOnChanges$, IOnDestroy$, IOnInit$ {}

applyMixins(AllHooks, [AfterContentChecked$, AfterContentInit$, AfterViewChecked$, AfterViewInit$, DoCheck$, OnChanges$, OnDestroy$, OnInit$]);


export class AfterViewInit$WithOnChanges$WithOnDestroy$ implements IAfterViewInit$, IOnChanges$, IOnDestroy$ {}
export interface AfterViewInit$WithOnChanges$WithOnDestroy$ extends IAfterViewInit$, IOnChanges$, IOnDestroy$ {}

applyMixins(AfterViewInit$WithOnChanges$WithOnDestroy$, [AfterViewInit$, OnChanges$, OnDestroy$]);
