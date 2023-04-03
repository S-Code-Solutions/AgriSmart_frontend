import { TestBed } from '@angular/core/testing';

import { PredictAnlyService } from './predict-anly.service';

describe('PredictAnlyService', () => {
  let service: PredictAnlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredictAnlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
