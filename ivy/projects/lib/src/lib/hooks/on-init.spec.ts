import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { OnInit$ } from './on-init';

function checkCalls(fixture: ComponentFixture<TestComponent>, calls: number) {
  // first check on plain to ensure it works without the library
  expect(fixture.componentInstance.ngOnInitCalled).toBe(calls);
  // then check the library
  expect(fixture.componentInstance.ngOnInit$triggered).toBe(calls);
}

describe('ngOnInit$ observable', () => {

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
    expect(fixture.componentInstance.enabled).toBe(false);
    checkCalls(fixture, 0);

    fixture.componentInstance.enabled = true;
    await fixture.whenStable();

    checkCalls(fixture, 0);
  });

  it('should forward call', async () => {
    expect(fixture.componentInstance.enabled).toBe(false);
    checkCalls(fixture, 0);

    fixture.componentInstance.enabled = true;

    fixture.detectChanges();
    await fixture.whenStable();

    checkCalls(fixture, 1);
  });

  it('should only trigger once', async () => {
    expect(fixture.componentInstance.enabled).toBe(false);
    checkCalls(fixture, 0);

    fixture.componentInstance.enabled = true;

    fixture.detectChanges();
    await fixture.whenStable();

    checkCalls(fixture, 1);

    fixture.detectChanges();
    await fixture.whenStable();

    checkCalls(fixture, 1);
  });
});


@Component({
  selector: 'lib-test-sub',
  template: `lib-test-sub`
})
class TestSubComponent extends OnInit$ {
  constructor(private readonly parent: TestComponent) {
    super();

    console.log(`TestSubComponent#constructor`);

    this.ngOnInit$.subscribe(() => {
      console.log('TestSubComponent#ngOnInit$');
      this.parent.ngOnInit$triggered++;
    });
  }
}

@Component({
  selector: 'lib-test-sub-plain',
  template: `lib-test-sub-plain`
})
class TestSubPlainComponent implements OnInit {
  constructor(private readonly parent: TestComponent) {
    console.log(`TestSubPlainComponent#constructor`);
  }

  ngOnInit(): void {
    console.log('TestSubPlainComponent#ngOnInit');
    this.parent.ngOnInitCalled++;
  }
}

@Component({
  selector: 'lib-test',
  template: `
    <div *ngIf="enabled">
      <lib-test-sub></lib-test-sub>
      <lib-test-sub-plain></lib-test-sub-plain>
    </div>
  `
})
class TestComponent {
  enabled = false;
  public ngOnInitCalled = 0;
  public ngOnInit$triggered = 0;
}
