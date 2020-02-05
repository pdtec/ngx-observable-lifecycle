import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AfterContentChecked, Component, ViewChild } from '@angular/core';
import { AfterContentChecked$ } from './after-content-checked';

function checkCalls(fixture: ComponentFixture<TestComponent>, calls: number) {
  // first check on plain to ensure it works without the library
  expect(fixture.componentInstance.sub.ngAfterContentChecked$triggered).toBe(calls);
  // then check the library
  expect(fixture.componentInstance.plain.ngAfterContentCheckedCalled).toBe(calls);
}

describe('ngAfterContentChecked$ observable', () => {

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
    expect(fixture.componentInstance.input).toBe(0);

    fixture.componentInstance.input = 1;
    await fixture.whenStable();

    checkCalls(fixture, 0);
  });

  it('should trigger after change detection', async () => {
    expect(fixture.componentInstance.input).toBe(0);

    fixture.componentInstance.input = 1;
    fixture.detectChanges();
    await fixture.whenStable();

    checkCalls(fixture, 1);

    // do it again, this hook should be called multiple times

    fixture.componentInstance.input = 2;
    fixture.detectChanges();
    await fixture.whenStable();

    checkCalls(fixture, 2);
  });
});

@Component({
  selector: 'lib-test-sub',
  template: `<ng-content></ng-content>`
})
class TestSubComponent extends AfterContentChecked$ {
  ngAfterContentChecked$triggered = 0;

  constructor() {
    super();

    this.ngAfterContentChecked$.subscribe(() => {
      this.ngAfterContentChecked$triggered++;
    });
  }
}

@Component({
  selector: 'lib-test-sub-plain',
  template: `<ng-content></ng-content>`
})
class TestSubPlainComponent implements AfterContentChecked {
  ngAfterContentCheckedCalled = 0;

  constructor() {}

  ngAfterContentChecked(): void {
    this.ngAfterContentCheckedCalled++;
  }
}

@Component({
  selector: 'lib-test',
  template: `
    <lib-test-sub>
      {{input}}
    </lib-test-sub>
    <lib-test-sub-plain>
      {{input}}
    </lib-test-sub-plain>
  `
})
class TestComponent {
  input = 0;

  @ViewChild(TestSubComponent, {static: true})
  sub!: TestSubComponent;

  @ViewChild(TestSubPlainComponent, {static: true})
  plain!: TestSubPlainComponent;
}
