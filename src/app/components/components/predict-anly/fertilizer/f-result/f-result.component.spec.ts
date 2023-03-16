import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FResultComponent } from './f-result.component';

describe('FResultComponent', () => {
  let component: FResultComponent;
  let fixture: ComponentFixture<FResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
