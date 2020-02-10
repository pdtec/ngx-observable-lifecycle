import { Observable, ReplaySubject } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { QueryList } from '@angular/core';
import { IAfterViewInit$ } from '../hooks/after-view-init';
import { takeUntilDestroyed } from './take-until-destroyed';
import { IOnDestroy$ } from '../hooks/on-destroy';

// get the generic parameter of query list
type QueryListOf<T extends QueryList<any> | undefined> = T extends QueryList<infer P> ? P : never;

// type of P in T has to be a QueryList or undefined, every other property doesn't matter
type ObjectWithQueryList<T, P extends keyof T> = { [X in P]: QueryList<any> | undefined };

/**
 * TODO
 */
export function viewChildren<
    T extends ObjectWithQueryList<T, P>, // Object with QueryList
    P extends keyof T, // Property containing QueryList
    C extends QueryListOf<T[P]>, // generic parameter of QueryList
  >(that: T, property: P): (source: Observable<any>) => Observable<C[]> {
  return (source) => {

    let queryList: QueryList<C> | undefined = undefined as any;

    return source
      .pipe(
        map(() => that[property]),
        filter(function typeGuard(x: QueryList<C> | undefined): x is QueryList<C> {
          return x !== undefined;
        }),
        tap(x => queryList = x, () => queryList = undefined, () => queryList = undefined),
        switchMap(queryList => {
          return queryList.changes.pipe(
            map(() => queryList !== undefined ? queryList.toArray() : []),
            startWith(queryList.toArray()),
          );
        }),
      );
  };
}

export function viewChildren$<
    T extends ObjectWithQueryList<T, P> & IAfterViewInit$ & IOnDestroy$, // Object with QueryList
    P extends keyof T, // Property containing QueryList
    C extends QueryListOf<T[P]>, // generic parameter of QueryList
  >(that: T, property: P): Observable<C[]> {
  const subject = new ReplaySubject<void>(1);

  console.log(`viewChildren$#viewChildren$`);

  that.ngAfterViewInit$.subscribe(() => {
    console.log(`viewChildren$#ngAfterViewInit$`);
    subject.next();
  });

  that.ngOnDestroy$.subscribe(() => {
    console.log(`viewChildren$#ngOnDestroy$`);
    subject.complete();
  });

  return subject.pipe(
    tap(x => console.log(`viewChildren$ before viewChildren`, x) ),
    viewChildren(that, property),
    tap(x => console.log(`viewChildren$ after viewChildren`, x) ),
    takeUntilDestroyed(that)
  );
}
