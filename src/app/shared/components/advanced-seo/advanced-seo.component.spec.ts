import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedSeoComponent } from './advanced-seo.component';

describe('AdvancedSeoComponent', () => {
  let component: AdvancedSeoComponent;
  let fixture: ComponentFixture<AdvancedSeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedSeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedSeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
