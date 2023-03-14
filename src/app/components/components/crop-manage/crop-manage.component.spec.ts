import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropManageComponent } from './crop-manage.component';

describe('CropManageComponent', () => {
  let component: CropManageComponent;
  let fixture: ComponentFixture<CropManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
