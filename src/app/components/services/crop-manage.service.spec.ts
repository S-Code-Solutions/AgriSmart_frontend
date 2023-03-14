import { TestBed } from '@angular/core/testing';

import { CropManageService } from './crop-manage.service';

describe('CropManageService', () => {
  let service: CropManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
