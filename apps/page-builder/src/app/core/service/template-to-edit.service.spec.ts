import { TestBed } from '@angular/core/testing';

import { TemplateToEditService } from './template-to-edit.service';

describe('TemplateToEditService', () => {
  let service: TemplateToEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateToEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
