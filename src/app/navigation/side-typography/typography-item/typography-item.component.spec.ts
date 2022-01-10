import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypographyItemComponent } from './typography-item.component';

describe('TypographyItemComponent', () => {
  let component: TypographyItemComponent;
  let fixture: ComponentFixture<TypographyItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypographyItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypographyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
