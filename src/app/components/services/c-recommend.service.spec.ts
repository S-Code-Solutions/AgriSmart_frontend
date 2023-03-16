import { TestBed } from '@angular/core/testing';

import { CRecommendService } from './c-recommend.service';

describe('CRecommendService', () => {
  let service: CRecommendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CRecommendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
