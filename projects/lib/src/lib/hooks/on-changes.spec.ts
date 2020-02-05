import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { OnChanges$ } from '@pdtec/ngx-observable-lifecycle';

describe('ngOnChanges$ observable', () => {

  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
  });

  it('should forward call', async () => {
    expect(fixture.componentInstance.input).toBe(0);
    expect(fixture.componentInstance.ngOnChanges$triggered).toBe(false);

    fixture.detectChanges();
    await fixture.whenStable();
    await fixture.whenRenderingDone();

    fixture.componentInstance.input = 1;

    fixture.detectChanges();
    await fixture.whenStable();
    await fixture.whenRenderingDone();

    expect(fixture.componentInstance.ngOnChanges$triggered).toBe(true);
  });
});

@Component({
  selector: 'lib-test',
  template: `<div>{{input}}</div>`
})
class TestComponent extends OnChanges$ {
  @Input()
  input = 0;

  ngOnChanges$triggered = false;

  constructor() {
    super();

    console.log(`TestComponent created`);

    this.ngOnChanges$.subscribe(() => {
      console.log(`TestComponent#ngOnChanges$triggered`);
      this.ngOnChanges$triggered = true;
    });
  }
}
