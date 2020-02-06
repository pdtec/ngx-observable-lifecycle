import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { OnChanges$ } from '@pdtec/ngx-observable-lifecycle';

function checkCalls(fixture: ComponentFixture<TestComponent>, calls: number) {
  // first check on plain to ensure it works without the library
  expect(fixture.componentInstance.plain.input).toBe(calls);
  expect(fixture.componentInstance.plain.inputSet).toBe(calls);
  expect(fixture.componentInstance.plain.ngOnChanges$triggered).toBe(calls);

  // then check the library
  expect(fixture.componentInstance.sub.input).toBe(calls);
  expect(fixture.componentInstance.sub.inputSet).toBe(calls);
  expect(fixture.componentInstance.sub.ngOnChanges$triggered).toBe(calls);
}

describe('ngOnChanges$ observable', () => {

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
    checkCalls(fixture, 0);

    fixture.componentInstance.input = 1;
    await fixture.whenStable();

    checkCalls(fixture, 0);
  });

  it('should forward changes', async () => {
    checkCalls(fixture, 0);

    fixture.componentInstance.input = 1;
    fixture.detectChanges();
    await fixture.whenStable();

    checkCalls(fixture, 1);

    // on changes hook should trigger on each change -> test it again

    fixture.componentInstance.input = 2;
    fixture.detectChanges();
    await fixture.whenStable();

    checkCalls(fixture, 2);
  });
});


@Component({
  selector: 'lib-test-obs',
  template: `<div>{{input}}</div>`
})
class TestSubComponent extends OnChanges$ {
  private input_ = 0;

  public inputSet = 0;
  public ngOnChanges$triggered = 0;

  @Input()
  set input(value: number) {
    this.inputSet++;
    console.log(`TestObsComponent#input set`);
    this.input_ = value;
  }

  get input() {
    return this.input_;
  }

  constructor() {
    super();

    console.log(`TestObsComponent created`);

    this.ngOnChanges$.subscribe(() => {
      console.log(`TestObsComponent#ngOnChanges$ triggered`);
      this.ngOnChanges$triggered++;
    });
  }
}

@Component({
  selector: 'lib-test-plain',
  template: `<div>{{input}}</div>`
})
class TestSubPlainComponent implements OnChanges {
  private input_ = 0;

  public inputSet = 0;
  public ngOnChanges$triggered = 0;

  @Input()
  set input(value: number) {
    this.inputSet++;
    console.log(`TestPlainComponent#input set`);
    this.input_ = value;
  }

  get input() {
    return this.input_;
  }

  constructor() {
    console.log(`TestPlainComponent created`);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`TestPlainComponent#ngOnChanges`);
    this.ngOnChanges$triggered++;
  }
}

@Component({
  selector: 'lib-test',
  template: `
    <lib-test-obs [input]="input"></lib-test-obs>
    <lib-test-plain [input]="input"></lib-test-plain>
  `
})
class TestComponent {
  public input = 0;

  @ViewChild(TestSubComponent, { static: true})
  public sub!: TestSubComponent;

  @ViewChild(TestSubPlainComponent, { static: true})
  public plain!: TestSubPlainComponent;
}
