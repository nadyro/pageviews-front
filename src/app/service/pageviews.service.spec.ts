import { TestBed } from '@angular/core/testing';

import { PageviewsService } from './pageviews.service';

describe('PageviewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageviewsService = TestBed.get(PageviewsService);
    expect(service).toBeTruthy();
  });
});
