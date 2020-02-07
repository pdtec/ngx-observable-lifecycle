import { Subject } from 'rxjs';
import { QueryList } from '@angular/core';
import { AfterViewInit$, viewChildren, viewChildren$ } from '@pdtec/ngx-observable-lifecycle';

describe('currentViewChildren operator', () => {
  it('should pass value changes for requested property', () => {
    const subject = new Subject<void>();
    const component = new TestComponent();
    const children = [new TestSubComponent()];

    const queryList = new QueryList<TestSubComponent>();
    component.children = queryList;

    let lastChildren: TestSubComponent[] | undefined = undefined as any;

    subject
      .pipe(viewChildren(component, 'children'))
      .subscribe(children => lastChildren = children);

    expect(lastChildren).toBeUndefined();
    subject.next();
    expect(lastChildren).toBeUndefined();

    queryList.reset(children);
    queryList.setDirty();
    queryList.notifyOnChanges();

    expect(lastChildren).toEqual(children);

    subject.complete();
    queryList.destroy();
  });
});

describe('viewChildren function', () => {
  it('should provide value changes for requested property', () => {
    const component = new TestComponent();
    const children = [new TestSubComponent()];

    const queryList = new QueryList<TestSubComponent>();
    component.children = queryList;

    let lastChildren: TestSubComponent[] | undefined = undefined as any;

    viewChildren$(component, 'children')
      .subscribe(children => lastChildren = children);

    expect(lastChildren).toBeUndefined();
    component.ngAfterViewInit();
    expect(lastChildren).toBeUndefined();

    queryList.reset(children);
    queryList.setDirty();
    queryList.notifyOnChanges();

    expect(lastChildren).toEqual(children);

    component.ngOnDestroy();
    queryList.destroy();
  });
});

class TestComponent extends AfterViewInit$ {
  public children: QueryList<TestSubComponent> | undefined;
  public unknown: number | undefined;
}

class TestSubComponent {}
