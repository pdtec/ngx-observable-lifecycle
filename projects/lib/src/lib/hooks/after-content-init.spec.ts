import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { AfterContentInit$ } from './after-content-init';

function checkCalls(fixture: ComponentFixture<TestComponent>, calls: number) {
  // first check on plain to ensure it works without the library
  expect(fixture.componentInstance.plain.ngAfterContentInitCalled).toBe(calls);
  // then check the library
  expect(fixture.componentInstance.sub.ngAfterContentInit$triggered).toBe(calls);
}

describe('ngAfterContentInit$ observable', () => {

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
    await fixture.whenStable();

    checkCalls(fixture, 0);
  });

  it('should trigger after init', async () => {
    await fixture.detectChanges();
    await fixture.whenStable();

    checkCalls(fixture, 1);

    // init hook should be triggered only once
    // so an additional change detection should not increase the call counter

    await fixture.detectChanges();
    await fixture.whenStable();

    checkCalls(fixture, 1);
  });
});

@Component({
  selector: 'lib-test-sub',
  template: `<ng-content></ng-content>`
})
class TestSubComponent extends AfterContentInit$ {
  ngAfterContentInit$triggered = 0;

  constructor() {
    super();

    console.log(`TestSubComponent#constructor`);

    this.ngAfterContentInit$.subscribe(() => {
      console.log(`TestSubComponent#ngAfterContentInit$`);
      this.ngAfterContentInit$triggered++;
    });
  }
}

@Component({
  selector: 'lib-test-sub-plain',
  template: `<ng-content></ng-content>`
})
class TestSubPlainComponent implements AfterContentInit {
  ngAfterContentInitCalled = 0;

  constructor() {
    console.log(`TestSubPlainComponent#constructor`);
  }

  ngAfterContentInit(): void {
    console.log(`TestSubPlainComponent#ngAfterContentInit`);
    this.ngAfterContentInitCalled++;
  }
}

@Component({
  selector: 'lib-test',
  template: `
    <lib-test-sub>
      content
    </lib-test-sub>
    <lib-test-sub-plain>
      content
    </lib-test-sub-plain>
  `
})
class TestComponent {
  @ViewChild(TestSubComponent, {static: true})
  sub!: TestSubComponent;

  @ViewChild(TestSubPlainComponent, {static: true})
  plain!: TestSubPlainComponent;

  constructor() {
    console.log(`TestComponent#constructor`);
  }
}
