import { Subject } from 'rxjs';
import { Component, Input, NgModule, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { input$, inputs$, OnChanges$, onlyChangesOf } from '@pdtec/ngx-observable-lifecycle';
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs/operators';

describe('onlyChangesOf operator', () => {
  it('should pass value changes for requested property', () => {
    const subject = new Subject<SimpleChanges>();
    let lastChange: SimpleChange | undefined = undefined as any;

    subject
      .pipe(onlyChangesOf<TestComponent>('value1'))
      .subscribe(change => lastChange = change);

    expect(lastChange).toBeUndefined();
    subject.next({ value1: new SimpleChange(0, 1, true) });
    expect(lastChange).toBeDefined();
    if (lastChange !== undefined) {
      expect(lastChange.currentValue).toBeDefined(1);
    }


    subject.complete();
  });

  it('should filter value changes for other properties', () => {
    const subject = new Subject<SimpleChanges>();
    let lastChange: SimpleChange | undefined = undefined as any;

    subject
      .pipe(onlyChangesOf('value1'))
      .subscribe(change => lastChange = change);

    expect(lastChange).toBeUndefined();
    subject.next({ value2: new SimpleChange(0, 1, true) });
    expect(lastChange).toBeUndefined();

    subject.complete();
  });
});

describe('input$ function', () => {

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [TestModule]
    });

    await TestBed.compileComponents();
  });

  it('should trigger for changes', () => {
    const fixture = TestBed.createComponent(TestWrapperComponent);

    const onNext = jasmine.createSpy('"next"');
    const onError = jasmine.createSpy('"error"');
    const onComplete = jasmine.createSpy('"complete"');

    fixture.detectChanges();

    const wrapper = fixture.componentInstance;
    const testComponent = wrapper.testComponent!;

    input$(testComponent, 'value1').subscribe(onNext, onError, onComplete);

    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledTimes(0);
    expect(onComplete).toHaveBeenCalledTimes(0);

    wrapper.v1 = 1;
    fixture.detectChanges();

    expect(onNext).toHaveBeenCalledTimes(2);
    expect(onError).toHaveBeenCalledTimes(0);
    expect(onComplete).toHaveBeenCalledTimes(0);

    fixture.destroy();

    expect(onNext).toHaveBeenCalledTimes(2);
    expect(onError).toHaveBeenCalledTimes(0);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});

describe('inputs$ function', () => {

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        TestWrapperComponent,
      ]
    });

    await TestBed.compileComponents();
  });

  it(`should only trigger once for multiple 'simultaneous' changes`, () => {
    const fixture = TestBed.createComponent(TestWrapperComponent);

    const onNext = jasmine.createSpy('"next"');
    const onError = jasmine.createSpy('"error"');
    const onComplete = jasmine.createSpy('"complete"');

    fixture.detectChanges();

    const wrapper = fixture.componentInstance;
    const testComponent: TestComponent = wrapper.testComponent!;

    inputs$(testComponent, 'value1', 'value2')
      .pipe(
        tap(x => x.value1),
      )
      .subscribe(onNext, onError, onComplete);

    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledTimes(0);
    expect(onComplete).toHaveBeenCalledTimes(0);

    wrapper.v1 = 1;
    wrapper.v2 = 2;
    fixture.detectChanges();

    expect(onNext).toHaveBeenCalledTimes(2);
    expect(onError).toHaveBeenCalledTimes(0);
    expect(onComplete).toHaveBeenCalledTimes(0);

    fixture.destroy();

    expect(onNext).toHaveBeenCalledTimes(2);
    expect(onError).toHaveBeenCalledTimes(0);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it(`should not trigger for other inputs`, () => {
    const fixture = TestBed.createComponent(TestWrapperComponent);

    const onNext = jasmine.createSpy('"next"');

    fixture.detectChanges();

    const wrapper = fixture.componentInstance;
    const testComponent: TestComponent = wrapper.testComponent!;

    inputs$(testComponent, 'value1', 'value2')
      .subscribe(onNext);

    expect(onNext).toHaveBeenCalledTimes(1);

    wrapper.v3 = 1;
    fixture.detectChanges();

    expect(onNext).toHaveBeenCalledTimes(1);
  });
});

@Component({
  selector: 'lib-test',
  template: ''
})
export class TestComponent extends OnChanges$ {
  @Input()
  public value1: number | undefined;

  @Input()
  public value2 = 0;

  @Input()
  public value3 = 0;
}

@Component({
  selector: 'lib-test-wrapper',
  template: `
    <lib-test [value1]="v1" [value2]="v2" [value3]="v3"></lib-test>`
})
export class TestWrapperComponent {
  @ViewChild(TestComponent, { static: true})
  testComponent: TestComponent | undefined;

  v1 = 0;
  v2 = 0;
  v3 = 0;
}

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TestComponent,
    TestWrapperComponent,
  ]
})
export class TestModule {}
