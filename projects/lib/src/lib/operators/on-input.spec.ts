import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { OnChanges$, onInput } from '@pdtec/ngx-observable-lifecycle';
import { map, tap } from 'rxjs/operators';
import { TypedChanges } from '../hooks/on-changes';
import { Observable } from 'rxjs';

describe('onInput operator', () => {

  let fixture: ComponentFixture<TestOnInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestOnInputComponent
      ]
    });

    fixture = TestBed.createComponent(TestOnInputComponent);
  });

  it('should create an instance', () => {
    expect(fixture).toBeDefined();
  });

  it('should throw exception', () => {
    expect(() => {
      fixture.componentInstance.foobar = '';
      fixture.detectChanges();
      fixture.componentInstance.foobar = undefined;
      fixture.detectChanges();
    }).toThrow();
  });
});

@Component({
  template: ``
})
class TestOnInputComponent extends OnChanges$ {
  @Input()
  public foobar: string | undefined;

  constructor() {
    super();

    // this.ngOnChanges$
    (this.ngOnChanges$ as Observable<TypedChanges<TestOnInputComponent>>)
      .subscribe(changes => {
        const fooChange = changes.foobar;
        console.log('changes', changes);
      });

    // this.ngOnChanges$
    (this.ngOnChanges$ as Observable<TypedChanges<TestOnInputComponent>>)
      .pipe(
        // onInput('foobar'),
        map(changes => changes.foobar),
        tap(x => console.log('changes', x)),
        map(change => change.currentValue),
      )
      .subscribe(x => {
        x.startsWith(''); // shouldn't even compile without skipUndefined, x should be string | undefined
      });
  }
}
