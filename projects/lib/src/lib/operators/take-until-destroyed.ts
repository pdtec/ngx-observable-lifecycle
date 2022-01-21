import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IOnDestroy$ } from '../hooks/on-destroy';

export function takeUntilDestroyed<T>(x: IOnDestroy$): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>) => {
    return source
      .pipe(
        takeUntil(x.ngOnDestroy$),
      );
  };
}
