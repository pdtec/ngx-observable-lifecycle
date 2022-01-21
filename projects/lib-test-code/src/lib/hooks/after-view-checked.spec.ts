import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AfterViewChecked, Component, Input, ViewChild } from '@angular/core';
import { AfterViewChecked$ } from '@pdtec/ngx-observable-lifecycle';

function checkCalls(fixture: ComponentFixture<TestComponent>, called: number) {
  // first check on plain to ensure it works without the library
  expect(fixture.componentInstance.plain.input).toBe(called);
  expect(fixture.componentInstance.plain.ngAfterViewCheckedCalled).toBe(called);
  // then check the library
  expect(fixture.componentInstance.sub.input).toBe(called);
  expect(fixture.componentInstance.sub.ngAfterViewChecked$triggered).toBe(called);
}

describe('ngAfterViewChecked$ observable', () => {

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
    checkCalls(fixture, 0);

    fixture.componentInstance.input = 1;
    await fixture.whenStable();

    checkCalls(fixture, 0);
  });

  it('should trigger after change detection', async () => {
    expect(fixture.componentInstance.input).toBe(0);
    checkCalls(fixture, 0);

    fixture.componentInstance.input = 1;
    fixture.detectChanges();
    await fixture.whenStable();

    checkCalls(fixture, 1);

    // checked hook should be called after each change detection

    fixture.componentInstance.input = 2;
    fixture.detectChanges();
    await fixture.whenStable();

    checkCalls(fixture, 2);
  });
});

@Component({
  selector: 'lib-test-sub',
  template: `{{input}}`
})
class TestSubComponent extends AfterViewChecked$ {
  @Input()
  input = 0;

  ngAfterViewChecked$triggered = 0;

  constructor() {
    super();

    this.ngAfterViewChecked$.subscribe(() => {
      this.ngAfterViewChecked$triggered++;
    });
  }
}

@Component({
  selector: 'lib-test-sub-plain',
  template: `{{input}}`
})
class TestSubPlainComponent implements AfterViewChecked {
  @Input()
  input = 0;

  ngAfterViewCheckedCalled = 0;

  constructor() {}

  ngAfterViewChecked(): void {
    this.ngAfterViewCheckedCalled++;
  }
}

@Component({
  selector: 'lib-test',
  template: `
    <lib-test-sub [input]="input"></lib-test-sub>
    <lib-test-sub-plain [input]="input"></lib-test-sub-plain>
  `
})
class TestComponent {
  input = 0;

  @ViewChild(TestSubComponent, {static: true})
  sub!: TestSubComponent;

  @ViewChild(TestSubPlainComponent, {static: true})
  plain!: TestSubPlainComponent;
}
