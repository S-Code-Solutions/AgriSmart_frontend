import { TestBed } from '@angular/core/testing';

import { PlantManageService } from './plant-manage.service';

describe('PlantManageService', () => {
  let service: PlantManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
