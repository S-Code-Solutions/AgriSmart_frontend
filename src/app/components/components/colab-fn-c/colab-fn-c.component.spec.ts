import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColabFnCComponent } from './colab-fn-c.component';

describe('ColabFnCComponent', () => {
  let component: ColabFnCComponent;
  let fixture: ComponentFixture<ColabFnCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColabFnCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColabFnCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
