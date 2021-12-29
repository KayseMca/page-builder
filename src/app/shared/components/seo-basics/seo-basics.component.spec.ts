import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeoBasicsComponent } from './seo-basics.component';

describe('SeoBasicsComponent', () => {
  let component: SeoBasicsComponent;
  let fixture: ComponentFixture<SeoBasicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeoBasicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeoBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
