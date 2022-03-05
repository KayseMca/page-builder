import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideTypographyComponent } from './side-typography.component';

describe('SideTypographyComponent', () => {
  let component: SideTypographyComponent;
  let fixture: ComponentFixture<SideTypographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideTypographyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideTypographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
