import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypographyListComponent } from './typography-list.component';

describe('TypographyListComponent', () => {
  let component: TypographyListComponent;
  let fixture: ComponentFixture<TypographyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypographyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypographyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
