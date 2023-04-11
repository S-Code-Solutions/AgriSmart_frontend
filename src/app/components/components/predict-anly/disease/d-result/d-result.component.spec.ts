import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DResultComponent } from './d-result.component';

describe('DResultComponent', () => {
  let component: DResultComponent;
  let fixture: ComponentFixture<DResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
