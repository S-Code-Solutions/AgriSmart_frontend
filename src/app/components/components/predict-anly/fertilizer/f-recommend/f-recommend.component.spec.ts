import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FRecommendComponent } from './f-recommend.component';

describe('FRecommendComponent', () => {
  let component: FRecommendComponent;
  let fixture: ComponentFixture<FRecommendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FRecommendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
