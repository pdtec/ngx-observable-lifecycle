import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibDemoCodeComponent } from './app.component';

describe('LibDemoCodeComponent', () => {
  let component: LibDemoCodeComponent;
  let fixture: ComponentFixture<LibDemoCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibDemoCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibDemoCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
