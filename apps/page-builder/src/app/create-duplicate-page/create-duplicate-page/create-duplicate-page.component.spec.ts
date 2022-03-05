import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDuplicatePageComponent } from './create-duplicate-page.component';

describe('CreateDuplicatePageComponent', () => {
  let component: CreateDuplicatePageComponent;
  let fixture: ComponentFixture<CreateDuplicatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDuplicatePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDuplicatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
