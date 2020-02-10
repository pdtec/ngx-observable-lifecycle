import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, SimpleChanges } from '@angular/core';
import { BaseHooks$ } from '@pdtec/ngx-observable-lifecycle';

describe('BaseHooks$ observables', () => {

  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        TestSubComponent,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
  });

  it('should each trigger once', async () => {
    fixture.componentInstance.enabled = true;
    fixture.componentInstance.input = 1;

    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.ngOnInit$triggered).toBe(1);
    expect(fixture.componentInstance.ngAfterViewInit$triggered).toBe(1);
    expect(fixture.componentInstance.ngOnChanges$triggered).toBe(1);

    fixture.destroy();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.ngOnDestroy$triggered).toBe(1);
  });
});


@Component({
  selector: 'lib-test-sub',
  template: `lib-test-sub`
})
class TestSubComponent extends BaseHooks$ {
  @Input()
  input: number | undefined;

  constructor(private readonly parent: TestComponent) {
    super();

    console.log(`TestSubComponent#constructor`);

    this.ngOnInit$.subscribe(() => {
      console.log('TestSubComponent#ngOnInit$');
      this.parent.ngOnInit$triggered++;
    });

    this.ngAfterViewInit$.subscribe(() => {
      console.log('TestSubComponent#ngAfterViewInit$');
      this.parent.ngAfterViewInit$triggered++;
    });

    this.ngOnChanges$.subscribe(() => {
      console.log('TestSubComponent#ngOnChanges$');
      this.parent.ngOnChanges$triggered++;
    });

    this.ngOnDestroy$.subscribe(() => {
      console.log('TestSubComponent#ngOnDestroy$');
      this.parent.ngOnDestroy$triggered++;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    debugger;
    super.ngOnChanges(changes);
  }
}

@Component({
  selector: 'lib-test',
  template: `
    <div *ngIf="enabled">
      <lib-test-sub [input]="input"></lib-test-sub>
    </div>
  `
})
class TestComponent {
  enabled = false;
  input = 0;

  ngOnInit$triggered = 0;
  ngOnChanges$triggered = 0;
  ngOnDestroy$triggered = 0;
  ngAfterViewInit$triggered = 0;
}
