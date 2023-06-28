import {Component, OnInit, ViewChild} from '@angular/core';
import {faCloudSun} from '@fortawesome/free-solid-svg-icons';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import {FormControl, FormGroup} from "@angular/forms";
import {PredictAnlyService} from "../../services/predict-anly.service";
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-weather-fore',
  templateUrl: './weather-fore.component.html',
  styleUrls: ['./weather-fore.component.scss']
})
export class WeatherForeComponent implements OnInit {

  currentTime!: any;
  currentDate!: any;
  greeting!: any;
  selected_district!: any;
  tempeture:any
  tempeturetext:any
  windmph:any
  humidity:any

  day1tempmax:any
  day2tempmax:any
  day3tempmax:any
  day1tempmin:any
  day2tempmin:any
  day3tempmin:any

  goodTips!: any[]
  badTips!:any[]

  faCloudSun = faCloudSun;

  foods: any[] =  [
    {value: 'Jaffna', viewValue: 'Jaffna'},
    {value: 'Kilinochchi', viewValue: 'Kilinochchi'},
    {value: 'Mannar', viewValue: 'Mannar'},
    {value: 'Mullaitivu', viewValue: 'Mullaitivu'},
    {value: 'Vavuniya', viewValue: 'Vavuniya'},
    {value: 'Puttalam', viewValue: 'Puttalam'},
    {value: 'Kurunegala', viewValue: 'Kurunegala'},
    {value: 'Gampaha', viewValue: 'Gampaha'},
    {value: 'Colombo', viewValue: 'Colombo'},
    {value: 'Kalutara', viewValue: 'Kalutara'},
    {value: 'Anuradhapura', viewValue: 'Anuradhapura'},
    {value: 'Polonnaruwa', viewValue: 'Polonnaruwa'},
    {value: 'Matale', viewValue: 'Matale'},
    {value: 'Kandy', viewValue: 'Kandy'},
    {value: 'Nuwara Eliya', viewValue: 'Nuwara Eliya'},
    {value: 'Kegalle', viewValue: 'Kegalle'},
    {value: 'Ratnapura', viewValue: 'Ratnapura'},
    {value: 'Trincomalee', viewValue: 'Trincomalee'},
    {value: 'Batticaloa', viewValue: 'Batticaloa'},
    {value: 'Ampara', viewValue: 'Ampara'},
    {value: 'Badulla', viewValue: 'Badulla'},
    {value: 'Monaragala', viewValue: 'Monaragala'},
    {value: 'Hambantota', viewValue: 'Hambantota'},
    {value: 'Matara', viewValue: 'Matara'},
    {value: 'Galle', viewValue: 'Galle'},
  ];

  showLoader: boolean = true;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;


  constructor(public climateService:PredictAnlyService,private cookieService: CookieService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showLoader = false;
    }, 2000);

    setInterval(() => {
      const today = new Date();
      const hours = today.getHours();
      const minutes = today.getMinutes();
      const formattedHours = hours < 10 ? '0' + hours : hours;
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      this.currentTime = formattedHours + ':' + formattedMinutes;

      if (hours >= 1 && hours < 12) {
        this.greeting = 'Morning';
      } else if (hours >= 12 && hours < 13) {
        this.greeting = 'Afternoon';
      } else if (hours >= 13 && hours < 23) {
        this.greeting = 'Evening';
      } else {
        this.greeting = 'Night';
      }
    }, 1000);

    setInterval(() => {
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const today = new Date();
      this.currentDate = today.toLocaleDateString('en-US', options);
    }, 1000);
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: ['January', 'February', 'March'],
    datasets: [
      {data: [20, 19, 23], label: 'Sunny'},
      {data: [10, 11, 7], label: 'Rainy'}
    ]
  };

  // events
  foodControl = new FormControl(this.foods[2].value);
  form = new FormGroup({
    food: this.foodControl,
  });
  public chartClicked({event, active}: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40];

    this.chart?.update();
  }

  someMethod(value: any){
    this.getWeatherdata(value);
    this.get7Daysdata(value);
    console.log(value);
    this.selected_district =value
  }

  getWeatherdata(value: any){
    this.climateService.getClimatedata(value).subscribe(res=>{
      this.tempeture = res.current.temp_c
      this.tempeturetext = res.current.condition.text
      this.windmph = res.current.wind_kph
      this.humidity = res.current.humidity
      // console.log(res)
      this.getAgricultureTips(res.current.temp_c,res.current.condition.text,res.current.wind_kph,res.current.humidity)
      this.cookieService.put('Cli', JSON.stringify(res));
    })
  }



  get7Daysdata(value: any){
    this.climateService.get7DaysClimatedata(value).subscribe(res=>{
      this.day1tempmax = res.forecast.forecastday[0].day.maxtemp_c
      this.day2tempmax = res.forecast.forecastday[1].day.maxtemp_c
      this.day3tempmax = res.forecast.forecastday[2].day.maxtemp_c
      this.day1tempmin = res.forecast.forecastday[0].day.mintemp_c
      this.day2tempmin = res.forecast.forecastday[1].day.mintemp_c
      this.day3tempmin = res.forecast.forecastday[2].day.mintemp_c
      console.log(res)
    })
  }

  getAgricultureTips(temperature: number, condition: string, wind_kph: number,humidity: number) {
    const goodTips: string[] = [];
    const badTips: string[] = [];

    if (condition.includes('rain')) {
      goodTips.push('Good time to plant wet-loving crops like rice or vegetables.');
    } else if (condition.includes('Sunny')) {
      goodTips.push('Consider starting seeds indoors or in a greenhouse.');
    } else if (condition.includes('Partly cloudy')) {
      badTips.push('Protect crops from frost with blankets or plastic sheets.');
    } else if (condition.includes('Cloudy')) {
      goodTips.push('Protect crops from hail with netting or blankets.');
    }else if (condition.includes('Mist')) {
      goodTips.push('Protect crops from hail with netting or blankets.');
    }else if (condition.includes('Light rain')) {
      goodTips.push(' Protect crops from hail with netting or blankets.');
    }else if (condition.includes('Heavy rain')) {
      badTips.push(' Protect crops from flooding and consider investing in drainage systems.');
    }

    if (temperature >= 30) {
      badTips.push('It may be too hot to plant crops right now. Wait for cooler weather.');
    } else if (temperature >= 20) {
      goodTips.push('This temperature range is ideal for planting many crops.');
    } else if (temperature >= 10) {
      goodTips.push('This temperature range is good for planting crops like carrots, radishes, or turnips.');
    } else if (temperature >= 0) {
      badTips.push('It may be too cold to plant crops right now. Wait for warmer weather.');
    } else {
      badTips.push('It may be too cold to plant crops right now. Wait for warmer weather.');
    }

    if (wind_kph >= 30) {
      badTips.push('It may be too speed to plant crops right now. Wait for normal speed.');
    } else if (wind_kph >= 20) {
      goodTips.push('This wind speed range is ideal for planting many crops.');
    } else if (wind_kph >= 10) {
      goodTips.push('This wind speed range is good for planting crops like carrots, radishes, or turnips.');
    } else if (wind_kph >= 0) {
      goodTips.push('This wind speed range is suitable for planting many types of wheat and grains.');
    } else {
      goodTips.push('This wind speed range is suitable for planting small plants.');
    }

    if (humidity >= 60) {
      badTips.push('It may be lead to fungal growth on plants');
    } else if (humidity >= 50) {
      goodTips.push('This humidity range can make plants more susceptible to pests and disease');
    } else if (humidity >= 40) {
      goodTips.push('This humidity range can make plants more susceptible to pests and disease');
    } else if (humidity >= 30) {
      goodTips.push('This humidity range can make plants more susceptible to pests and disease');
    } else {
      badTips.push(' This can cause plants to dry out and wilt');
    }
    // return { goodTips: goodTips, badTips: badTips };
    this.goodTips = goodTips;
    this.badTips = badTips;
    console.log(goodTips)
    console.log(badTips)
  }


}
