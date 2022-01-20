import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakpointsEditComponent } from './breakpoints-edit.component';

describe('BreakpointsEditComponent', () => {
  let component: BreakpointsEditComponent;
  let fixture: ComponentFixture<BreakpointsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakpointsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakpointsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
