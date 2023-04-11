import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DAnalyseComponent } from './d-analyse.component';

describe('DAnalyseComponent', () => {
  let component: DAnalyseComponent;
  let fixture: ComponentFixture<DAnalyseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DAnalyseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DAnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
