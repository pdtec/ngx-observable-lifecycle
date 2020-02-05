import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DoCheck, ViewChild } from '@angular/core';
import { DoCheck$ } from '@pdtec/ngx-observable-lifecycle';

function checkCalls(fixture: ComponentFixture<TestComponent>, called: number) {
  // first check on plain to ensure it works without the library
  expect(fixture.componentInstance.plain.ngDoCheckCalled).toBe(called);
  // then check the library
  expect(fixture.componentInstance.sub.ngDoCheck$triggered).toBe(called);
}

describe('ngDoCheck$ observable', () => {

  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        TestSubComponent,
        TestSubPlainComponent,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
  });

  it('should not trigger without change detection', async () => {
    checkCalls(fixture, 0);

    await fixture.whenStable();

    checkCalls(fixture, 0);
  });

  it('should trigger after change detection', async () => {
    checkCalls(fixture, 0);

    fixture.detectChanges();
    await fixture.whenStable();

    checkCalls(fixture, 1);

    // checked hook should be called for each change detection

    fixture.detectChanges();
    await fixture.whenStable();

    checkCalls(fixture, 2);
  });
});

@Component({
  selector: 'lib-test-sub',
  template: ``
})
class TestSubComponent extends DoCheck$ {
  ngDoCheck$triggered = 0;

  constructor() {
    super();

    this.ngDoCheck$.subscribe(() => {
      this.ngDoCheck$triggered++;
    });
  }
}

@Component({
  selector: 'lib-test-sub-plain',
  template: ``
})
class TestSubPlainComponent implements DoCheck {
  ngDoCheckCalled = 0;

  constructor() {}

  ngDoCheck(): void {
    this.ngDoCheckCalled++;
  }
}

@Component({
  selector: 'lib-test',
  template: `
    <lib-test-sub></lib-test-sub>
    <lib-test-sub-plain></lib-test-sub-plain>
  `
})
class TestComponent {
  @ViewChild(TestSubComponent, {static: true})
  sub!: TestSubComponent;

  @ViewChild(TestSubPlainComponent, {static: true})
  plain!: TestSubPlainComponent;
}
