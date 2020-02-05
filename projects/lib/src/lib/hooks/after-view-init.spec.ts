import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AfterViewInit$ } from '@pdtec/ngx-observable-lifecycle';

function checkCalls(fixture: ComponentFixture<TestComponent>, called: number) {
  // first check on plain to ensure it works without the library
  expect(fixture.componentInstance.plain.ngAfterViewInitCalled).toBe(called);
  // then check the library
  expect(fixture.componentInstance.sub.ngAfterViewInit$triggered).toBe(called);
}

describe('ngAfterViewInit$ observable', () => {

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

    // init hook should only trigger once

    await fixture.detectChanges();
    await fixture.whenStable();

    checkCalls(fixture, 1);
  });
});

@Component({
  selector: 'lib-test-sub',
  template: `lib-test-sub`
})
class TestSubComponent extends AfterViewInit$ {
  ngAfterViewInit$triggered = 0;

  constructor() {
    super();

    console.log(`TestSubComponent#constructor`);

    this.ngAfterViewInit$.subscribe(() => {
      console.log(`TestSubComponent#ngAfterViewInit$`);
      this.ngAfterViewInit$triggered++;
    });
  }
}

@Component({
  selector: 'lib-test-sub-plain',
  template: `lib-test-sub-plain`
})
class TestSubPlainComponent implements AfterViewInit {
  ngAfterViewInitCalled = 0;

  constructor() {
    console.log(`TestSubPlainComponent#constructor`);
  }

  ngAfterViewInit(): void {
    console.log(`TestSubPlainComponent#ngAfterViewInit`);
    this.ngAfterViewInitCalled++;
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

  constructor() {
    console.log(`TestComponent#constructor`);
  }
}
