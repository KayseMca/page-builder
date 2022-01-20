import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakpointListComponent } from './breakpoint-list.component';

describe('BreakpointListComponent', () => {
  let component: BreakpointListComponent;
  let fixture: ComponentFixture<BreakpointListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakpointListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakpointListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
