import { Component, OnInit } from '@angular/core';
import {faCloudSun} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-fore',
  templateUrl: './weather-fore.component.html',
  styleUrls: ['./weather-fore.component.scss']
})
export class WeatherForeComponent implements OnInit {

  faCloudSun = faCloudSun;

  showLoader: boolean = true;


  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.showLoader = false;
    }, 2000); // 2 second delay before showing the component
  }

}
