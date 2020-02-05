import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TypedChanges } from '../hooks/on-changes';
import { onInput } from './on-input';

/**
 * Same as {@see onInput} but also extracts the currentValue.
 * So you just get the current value of the given property.
 *
 * @param property
 */
export function currentValueOf<T, P extends keyof T>(property: P): (source: Observable<TypedChanges<T>>) => Observable<T[P]> {
  return (source: Observable<TypedChanges<T>>) => {
    return source
      .pipe(
        onInput(property),
        map(change => change.currentValue),
      );
  };
}
