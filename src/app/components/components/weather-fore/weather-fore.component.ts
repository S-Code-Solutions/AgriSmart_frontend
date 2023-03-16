import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-fore',
  templateUrl: './weather-fore.component.html',
  styleUrls: ['./weather-fore.component.scss']
})
export class WeatherForeComponent implements OnInit {

  showLoader: boolean = true;


  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.showLoader = false;
    }, 2000); // 2 second delay before showing the component
  }

}
