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
