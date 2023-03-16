import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRecommendComponent } from './c-recommend.component';

describe('CRecommendComponent', () => {
  let component: CRecommendComponent;
  let fixture: ComponentFixture<CRecommendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRecommendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
