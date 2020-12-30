import { ObjectWithQueryList, viewChildren$ } from '../operators/view-children';
import { IOnDestroy$ } from '../hooks/on-destroy';
import { IAfterViewInit$ } from '../hooks/after-view-init';

export class WithViewChildren$ {
  public viewChildren$<T extends ObjectWithQueryList<T, P> & IAfterViewInit$ & IOnDestroy$ , P extends keyof T>(this: T, property: P) {
    return viewChildren$(this, property);
  }
}
