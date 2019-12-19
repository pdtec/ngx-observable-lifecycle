import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TypedChange, TypedChanges } from '../hooks/on-changes';

export function onInput<T, P extends keyof T>(property: P): (source: Observable<TypedChanges<T>>) => Observable<TypedChange<T[P]>> {
  return (source: Observable<TypedChanges<T>>) => {
    return source
      .pipe(
        filter(hasOwnProperty(property)),
        map(changes => changes[property]),
      );
  };
}

export function hasOwnProperty<T>(property: keyof T) {
  return (changes: TypedChanges<T>) => changes.hasOwnProperty(property);
}
