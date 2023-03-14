import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictAnlyComponent } from './predict-anly.component';

describe('PredictAnlyComponent', () => {
  let component: PredictAnlyComponent;
  let fixture: ComponentFixture<PredictAnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredictAnlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredictAnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
