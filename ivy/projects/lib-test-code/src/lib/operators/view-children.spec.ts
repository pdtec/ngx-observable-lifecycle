import { Subject } from 'rxjs';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { AfterViewInit$AndOnDestroy$, viewChildren, viewChildren$ } from '@pdtec/ngx-observable-lifecycle';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('viewChildren operator', () => {

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
    expect(lastChildren).toEqual([]);

    queryList.reset(children);
    queryList.setDirty();
    queryList.notifyOnChanges();

    expect(lastChildren).toEqual(children);

    subject.complete();
    queryList.destroy();
  });
});

describe('viewChildren$ function', () => {

  describe('with plain class', () => {
    it('should provide value changes for requested property', () => {
      const component = new TestComponent();
      const children = [new TestSubComponent()];

      const queryList = new QueryList<TestSubComponent>();
      component.children = queryList;

      let lastViewChildren: TestSubComponent[] | undefined = undefined as any;

      viewChildren$(component, 'children')
        .subscribe(x => lastViewChildren = x);

      expect(lastViewChildren).toBeUndefined();
      component.ngAfterViewInit();
      expect(lastViewChildren).toEqual([]);

      queryList.reset(children);
      queryList.setDirty();
      queryList.notifyOnChanges();

      expect(lastViewChildren).toEqual(children);

      component.ngOnDestroy();
      queryList.destroy();
    });
  });

  describe('with angular component', () => {
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          TestComponent,
          TestSubComponent,
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
    });

    it('should provide value changes for requested property', async () => {
      let lastViewChildren: TestSubComponent[] | undefined = undefined as any;

      viewChildren$(fixture.componentInstance, 'children')
        .subscribe(x => lastViewChildren = x);

      fixture.detectChanges();
      await fixture.whenStable();

      expect(lastViewChildren).toBeDefined();

      if (lastViewChildren !== undefined) {
        expect(fixture.componentInstance.children!.toArray().length).toBe(1);
        expect(lastViewChildren.length).toEqual(1);
      }
    });

    it('should complete on component destroying', () => {
      let completed = false;

      viewChildren$(fixture.componentInstance, 'children')
        .subscribe(() => {}, () => {}, () => completed = true);

      fixture.destroy();

      expect(completed).toBe(true);
    });
  });
});

@Component({
  selector: 'lib-test-sub',
  template: ''
})
class TestSubComponent {}

@Component({
  selector: 'lib-test',
  template: '<lib-test-sub></lib-test-sub>'
})
class TestComponent extends AfterViewInit$AndOnDestroy$ {
  @ViewChildren(TestSubComponent)
  public children: QueryList<TestSubComponent> | undefined;
}
