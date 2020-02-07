import { Subject } from 'rxjs';
import { SimpleChange } from '@angular/core';
import { onInput, TypedChange, TypedChanges } from '@pdtec/ngx-observable-lifecycle';

describe('onInput operator', () => {
  it('should pass value changes for requested property', () => {
    const subject = new Subject<TypedChanges<TestComponent>>();
    let lastChange: TypedChange<any> | undefined = undefined as any;

    subject
      .pipe(onInput('value'))
      .subscribe(change => lastChange = change);

    expect(lastChange).toBeUndefined();
    subject.next({ value: new SimpleChange(0, 1, true) });
    expect(lastChange).toBeDefined();
    if (lastChange !== undefined) {
      expect(lastChange.currentValue).toBeDefined(1);
    }


    subject.complete();
  });

  it('should filter value changes for other properties', () => {
    const subject = new Subject<TypedChanges<TestComponent>>();
    let lastChange: TypedChange<any> | undefined = undefined as any;

    subject
      .pipe(onInput('value'))
      .subscribe(change => lastChange = change);

    expect(lastChange).toBeUndefined();
    subject.next({ unknown: new SimpleChange(false, true, true) });
    expect(lastChange).toBeUndefined();

    subject.complete();
  });
});

class TestComponent {
  public value: number | undefined;
  public unknown: unknown;
}
