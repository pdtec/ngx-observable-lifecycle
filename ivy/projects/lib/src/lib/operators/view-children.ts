import { merge, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { QueryList } from '@angular/core';
import { AfterViewInit$ } from '../hooks/after-view-init';

// get the generic parameter of query list
type QueryListOf<T extends QueryList<any> | undefined> = T extends QueryList<infer P> ? P : never;

// type of P in T has to be a QueryList or undefined, every other property could be anything
type ObjectWithQueryList<T, P> = { [X in keyof T]: X extends P ? QueryList<any> | undefined : any };

/**
 * TODO
 */
export function viewChildren<
    T extends ObjectWithQueryList<T, P>, // Object with QueryList
    P extends keyof T, // Property containing QueryList
    C extends QueryListOf<T[P]>, // generic parameter of QueryList
  >(that: T, property: P): (source: Observable<any>) => Observable<C[]> {
  return (source) => {
    let queryList: QueryList<C> | undefined;
    return source
      .pipe(
        map(() => that[property]),
        filter(function typeGuard(x: QueryList<C> | undefined): x is QueryList<C> {
          return x !== undefined;
        }),
        tap(x => queryList = x, () => queryList = undefined, () => queryList = undefined),
        switchMap(queryList => queryList.changes),
        // map(x => x as unknown as C[])
        map(() => queryList !== undefined ? queryList.toArray() : []),
      );
  };
}

export function viewChildren$<
    T extends ObjectWithQueryList<T, P> & AfterViewInit$, // Object with QueryList
    P extends keyof T, // Property containing QueryList
    C extends QueryListOf<T[P]>, // generic parameter of QueryList
  >(that: T, property: P): Observable<C[]> {
  return merge(that.ngAfterViewInit$, that.ngOnDestroy$)
    .pipe(
      viewChildren(that, property),
    );
}
