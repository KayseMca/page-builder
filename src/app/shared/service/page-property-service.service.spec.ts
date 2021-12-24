import { TestBed } from '@angular/core/testing';

import { PagePropertyServiceService } from './page-property-service.service';

describe('PagePropertyServiceService', () => {
  let service: PagePropertyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagePropertyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
