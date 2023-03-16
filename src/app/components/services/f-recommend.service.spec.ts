import { TestBed } from '@angular/core/testing';

import { FRecommendService } from './f-recommend.service';

describe('FRecommendService', () => {
  let service: FRecommendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FRecommendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
