import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnDestroy } from '@angular/core';
import { OnDestroy$ } from './on-destroy';

function checkCalls(fixture: ComponentFixture<TestComponent>, calls: number) {
  // first check on plain to ensure it works without the library
  expect(fixture.componentInstance.ngOnDestroyCalled).toBe(calls);
  // then check the library
  expect(fixture.componentInstance.ngOnDestroy$triggered).toBe(calls);
}

describe('ngOnDestroy$ observable', () => {

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

  it('should forward call', async () => {
    expect(fixture.componentInstance.enabled).toBe(true);
    checkCalls(fixture, 0);

    fixture.detectChanges();
    await fixture.whenStable();

    checkCalls(fixture, 0);

    fixture.componentInstance.enabled = false;

    fixture.detectChanges();
    await fixture.whenStable();

    checkCalls(fixture, 1);
  });
});

@Component({
  selector: 'lib-test-sub',
  template: `lib-test-sub`
})
class TestSubComponent extends OnDestroy$ {
  constructor(private readonly parent: TestComponent) {
    super();

    console.log(`TestSubComponent#constructor`);

    this.ngOnDestroy$.subscribe(() => {
      console.log('TestSubComponent#ngOnDestroy$');
      this.parent.ngOnDestroy$triggered++;
    });

  }
}

@Component({
  selector: 'lib-test-sub-plain',
  template: `lib-test-sub-plain`
})
class TestSubPlainComponent implements OnDestroy {

  constructor(private readonly parent: TestComponent) {
    console.log(`TestSubPlainComponent#constructor`);
  }

  ngOnDestroy(): void {
    console.log('TestSubPlainComponent#ngOnDestroy');
    this.parent.ngOnDestroyCalled++;
  }
}

@Component({
  selector: 'lib-test',
  template: `<div *ngIf="enabled">
    <lib-test-sub></lib-test-sub>
    <lib-test-sub-plain></lib-test-sub-plain>
  </div>`
})
class TestComponent {
  public enabled = true;
  public ngOnDestroyCalled = 0;
  public ngOnDestroy$triggered = 0;
}
