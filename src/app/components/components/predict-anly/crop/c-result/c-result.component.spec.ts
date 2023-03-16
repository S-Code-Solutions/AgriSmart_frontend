import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CResultComponent } from './c-result.component';

describe('CResultComponent', () => {
  let component: CResultComponent;
  let fixture: ComponentFixture<CResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
