import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { OnInit$ } from './on-init';

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

  it('should forward call', async () => {
    expect(fixture.componentInstance.enabled).toBe(true);
    expect(fixture.componentInstance.ngOnInit$triggered).toBe(false);

    fixture.detectChanges();
    await fixture.whenStable();
    await fixture.whenRenderingDone();

    fixture.componentInstance.enabled = false;

    fixture.detectChanges();
    await fixture.whenStable();
    await fixture.whenRenderingDone();

    expect(fixture.componentInstance.ngOnInit$triggered).toBe(true);
  });
});

@Component({
  selector: 'lib-test',
  template: `
    <lib-test-sub></lib-test-sub>
    <lib-test-sub-plain></lib-test-sub-plain>
  `
})
class TestComponent {
  enabled = true;
  ngOnInit$triggered = false;
}

@Component({
  selector: 'lib-test-sub',
  template: `lib-test-sub`
})
class TestSubComponent extends OnInit$ {
  constructor(private parent: TestComponent) {
    super();

    this.ngOnInit$.subscribe(() => {
      console.log('TestSubComponent#ngOnInit$ triggered');
      this.parent.ngOnInit$triggered = true;
    });

    console.log('TestSubComponent created');
  }
}

@Component({
  selector: 'lib-test-sub-plain',
  template: `lib-test-sub-plain`
})
class TestSubPlainComponent implements OnInit {

  constructor() {
    console.log('TestSubPlainComponent created');
  }

  ngOnInit(): void {
    console.log('TestSubPlainComponent#ngOnInit called');
  }
}
