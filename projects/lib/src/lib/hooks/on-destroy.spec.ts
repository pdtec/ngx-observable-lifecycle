import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnDestroy } from '@angular/core';
import { OnDestroy$ } from '@pdtec/ngx-observable-lifecycle';

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
    expect(fixture.componentInstance.ngOnDestroy$triggered).toBe(false);

    fixture.detectChanges();
    await fixture.whenStable();
    await fixture.whenRenderingDone();

    fixture.componentInstance.enabled = false;

    fixture.detectChanges();
    await fixture.whenStable();
    await fixture.whenRenderingDone();

    expect(fixture.componentInstance.ngOnDestroy$triggered).toBe(true);
  });
});

@Component({
  selector: 'lib-test',
  template: `<div *ngIf="enabled">
    <lib-test-sub></lib-test-sub>
    <lib-test-sub-plain></lib-test-sub-plain>
  </div>`
})
class TestComponent {
  enabled = true;
  ngOnDestroy$triggered = false;
}

@Component({
  selector: 'lib-test-sub',
  template: `lib-test-sub`
})
class TestSubComponent extends OnDestroy$ {
  constructor(private parent: TestComponent) {
    super();

    this.ngOnDestroy$.subscribe(() => {
      console.log('TestSubComponent#ngOnDestroy$ triggered');
      this.parent.ngOnDestroy$triggered = true;
    });

    console.log('TestSubComponent created');
  }
}

@Component({
  selector: 'lib-test-sub-plain',
  template: `lib-test-sub-plain`
})
class TestSubPlainComponent implements OnDestroy {

  constructor() {
    console.log('TestSubPlainComponent created');
  }

  ngOnDestroy(): void {
    console.log('TestSubPlainComponent#ngOnDestroy called');
  }
}
