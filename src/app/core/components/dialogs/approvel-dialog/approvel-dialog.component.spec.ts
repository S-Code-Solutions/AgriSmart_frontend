import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovelDialogComponent } from './approvel-dialog.component';

describe('ApprovelDialogComponent', () => {
  let component: ApprovelDialogComponent;
  let fixture: ComponentFixture<ApprovelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovelDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
