import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TypedChange, TypedChanges } from '../hooks/on-changes';

/**
 * Observable operator for easier usage of {@see OnChanges$}. Only emits if the given property has changed.
 *
 * @param property
 */
export function onInput<T, P extends keyof T>(property: P): (source: Observable<TypedChanges<T>>) => Observable<TypedChange<T[P]>> {
  return (source: Observable<TypedChanges<T>>) => {
    return source
      .pipe(
        map(changes => changes[property]),
        filter(function (x: TypedChange<T[P]> | undefined): x is TypedChange<T[P]> {
          return x !== undefined;
        }),
      );
  };
}


