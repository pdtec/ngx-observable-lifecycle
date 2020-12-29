import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IOnChanges$, TypedChange, TypedChanges } from '../hooks/on-changes';

/**
 * Observable operator for easier usage of {@see OnChanges$} and {@see IOnChanges$}. Only emits if the given property has changed.
 *
 * @example
 * @Component({})
 * export class ExampleComponent extends OnChanges$ {
 *   @Input() public foobar: number | undefined;
 *
 *   constructor() {
 *     super();
 *     this.ngOnChanges$
 *       .pipe(onyChangesOf('foobar'))
 *       .subscribe(change => {
 *         console.log('current value', change.currentValue);
 *         console.log('previous value', change.previousValue);
 *       });
 *   }
 * }
 *
 * @param property name of the property
 */
export function onlyChangesOf<T, P extends keyof T>(property: P): (source: Observable<TypedChanges<T>>) => Observable<TypedChange<T[P]>> {
  return (source: Observable<TypedChanges<T>>) => {
    return source
      .pipe(
        map(changes => changes[property]),
        filter(function typeGuard(x: TypedChange<T[P]> | undefined): x is TypedChange<T[P]> {
          return x !== undefined;
        }),
      );
  };
}

/**
 * Same as {@see onlyChangesOf} but also extracts the currentValue.
 * So you just get the current value of the given property.
 *
 * @example
 * @Component({})
 * export class ExampleComponent extends OnChanges$ {
 *   @Input() public foobar: number | undefined;
 *
 *   constructor() {
 *     super();
 *     this.ngOnChanges$
 *       .pipe(onlyCurrentValueOf('foobar'))
 *       .subscribe(currentValue => console.log(currentValue));
 *   }
 * }
 *
 * @param property name of the property
 */
export function onlyCurrentValueOf<T, P extends keyof T>(property: P): (source: Observable<TypedChanges<T>>) => Observable<T[P]> {
  return (source: Observable<TypedChanges<T>>) => {
    return source
      .pipe(
        onlyChangesOf(property),
        map(change => change.currentValue),
      );
  };
}

/**
 * Uses OnChanges hook to observe the given property for value changes.
 *
 * If you need access to the change object instead of the current value, please use {@see onlyChangesOf} operator.
 *
 * @example
 * @Component({})
 * export class ExampleComponent extends OnChanges$ {
 *   @Input() public foobar: number | undefined;
 *
 *   constructor() {
 *     super();
 *     input$(this, 'foobar')
 *       .subscribe(currentValue => console.log(currentValue));
 *   }
 * }
 *
 * @param that object for property lookup
 * @param property name of the property to observe
 */
export function input$<T extends IOnChanges$, P extends keyof T>(that: T, property: P) {
  return that.ngOnChanges$.pipe(
    onlyCurrentValueOf(property)
  );
}

/**
 * Observes the given property for changes (via OnChanges hook).
 * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
 */
export function inputs$<T, P extends keyof T>(that: T & IOnChanges$, p1: P): Observable<{ [X in P]: T[X]}>;

/**
 * Observes the given properties for changes (via OnChanges hook).
 * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
 */
export function inputs$<T, P extends keyof T>(that: T & IOnChanges$, p1: P, p2: P): Observable<{ [X in P]: T[X]}>;

/**
 * Observes the given properties for changes (via OnChanges hook).
 * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
 */
export function inputs$<T, P extends keyof T>(that: T & IOnChanges$, p1: P, p2: P, p3: P): Observable<{ [X in P]: T[X]}>;

/**
 * Observes the given properties for changes (via OnChanges hook).
 * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
 */
export function inputs$<T, P extends keyof T>(that: T & IOnChanges$, p1: P, p2: P, p3: P, p4: P): Observable<{ [X in P]: T[X]}>;

/**
 * Observes the given properties for changes (via OnChanges hook).
 * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
 */
export function inputs$<T, P extends keyof T>(that: T & IOnChanges$, p1: P, p2: P, p3: P, p4: P, p5: P): Observable<{ [X in P]: T[X]}>;

/**
 * Observes the given properties for changes (via OnChanges hook).
 * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
 */
export function inputs$<T, P extends keyof T>(that: T & IOnChanges$, p1: P, p2: P, p3: P, p4: P, p5: P, p6: P): Observable<{ [X in P]: T[X]}>;

/**
 * Observes the given properties for changes (via OnChanges hook).
 * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
 */
export function inputs$<T, P extends keyof T>(that: T & IOnChanges$, p1: P, p2: P, p3: P, p4: P, p5: P, p6: P, p7: P): Observable<{ [X in P]: T[X]}>;

/**
 * Observes the given properties for changes (via OnChanges hook).
 * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
 */
export function inputs$<T, P extends keyof T>(that: T & IOnChanges$, p1: P, p2: P, p3: P, p4: P, p5: P, p6: P, p7: P, p8: P): Observable<{ [X in P]: T[X]}>;

/**
 * Observes the given properties for changes (via OnChanges hook).
 * Triggers only once for 'simultaneous' changes of multiple inputs. Simultaneous means during one change detection cycle.
 */
export function inputs$<T, P extends keyof T>(that: T & IOnChanges$, p1: P, p2: P, p3: P, p4: P, p5: P, p6: P, p7: P, p8: P, p9: P): Observable<{ [X in P]: T[X]}>;

// Using var-args parameter breaks refactoring support. Renaming properties will not change the property passed to this function.
// I don't think we need more than 9 parameters, so we comment out this option.
// export function inputs$<T, P extends keyof T>(that: T & IOnChanges$, ...properties: P[]): Observable<{ [X in P]: T[X]}>;

export function inputs$<T, P extends keyof T>(that: T & IOnChanges$, ...properties: P[]): Observable<{ [X in P]: T[X]}> {
  return inputs$Impl(that, ...properties);
}

export function inputs$Impl<T, P extends keyof T>(that: T & IOnChanges$, ...properties: P[]): Observable<{ [X in P]: T[X]}> {
  return that.ngOnChanges$.pipe(
    filter(changes => {
      const change = properties.find(x => changes[x] !== undefined);

      return change !== undefined;
    }),
    map(() => {
      const result = properties.reduce((acc, cur) => {
        acc[cur] = that[cur];
        return acc;
      }, {} as any);

      return result;
    }),
  );
}
