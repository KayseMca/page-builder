import { TestBed } from '@angular/core/testing';

import { PageLoadService } from './page-load.service';

describe('PageLoadService', () => {
  let service: PageLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
