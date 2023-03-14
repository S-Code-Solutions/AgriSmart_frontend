import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForeComponent } from './weather-fore.component';

describe('WeatherForeComponent', () => {
  let component: WeatherForeComponent;
  let fixture: ComponentFixture<WeatherForeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherForeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherForeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
