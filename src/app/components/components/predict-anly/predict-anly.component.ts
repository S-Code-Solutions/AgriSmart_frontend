import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CRecommendComponent} from "./crop/c-recommend/c-recommend.component";
import {FRecommendComponent} from "./fertilizer/f-recommend/f-recommend.component";
import {faCogs} from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup} from "@angular/forms";
import {PredictAnlyService} from "../../services/predict-anly.service";
import {CookieService} from "ngx-cookie";
import {DAnalyseComponent} from "./disease/d-analyse/d-analyse.component";

@Component({
  selector: 'app-predict-anly',
  templateUrl: './predict-anly.component.html',
  styleUrls: ['./predict-anly.component.scss']
})
export class PredictAnlyComponent implements OnInit {

  faCogs = faCogs;

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

  foodControl = new FormControl(this.foods[2].value);

  form = new FormGroup({
    food: this.foodControl,
  });

  constructor(public dialog: MatDialog,public climateService:PredictAnlyService,private cookieService: CookieService,) { }

  ngOnInit(): void {
  }

  openCDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = "row";
    dialogConfig.width = '60%';
    dialogConfig.height = 'auto';
    // console.log(row);
    console.log('----------------------------');
    const dialogRef = this.dialog.open(CRecommendComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log("response code1")
      console.log(result)
      console.log("response code2")
      // this.refreshTable();
    });
  }

  openFDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = "row";
    dialogConfig.width = '60%';
    dialogConfig.height = 'auto';
    // console.log(row);
    console.log('----------------------------');
    const dialogRef = this.dialog.open(FRecommendComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log("response code1")
      console.log(result)
      console.log("response code2")
      // this.refreshTable();
    });
  }

  someMethod(value: any){
    this.getWeatherdata(value);
    this.getlnagtitude(value)
    console.log(value);
  }

  getWeatherdata(value: any){
    this.climateService.getClimatedata(value).subscribe(res=>{
      this.cookieService.put('Cli', JSON.stringify(res));
    })
  }

  getlnagtitude(value: any){
    this.climateService.getLangtdata(value).subscribe(res=>{
      console.log(res[0].lon)
      console.log(res[0].lat)
      this.getSoilData(res[0].lat,res[0].lon);
    })
  }

  getSoilData(lat:any,lon:any){
    this.climateService.getSoiltdata(lat,lon).subscribe(res=>{
      console.log("=================== getSoilData ==============================")
      console.log(res)
      this.cookieService.put('Soil', JSON.stringify(res));
      console.log(res.properties.layers[0].depths[0].values['Q0.5'])
      console.log(res.properties.layers[1].depths[0].values['Q0.5'])
      console.log("=================== getSoilData ==============================")
    })
  }

  openPDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = "row";
    dialogConfig.width = '30%';
    dialogConfig.height = 'auto';
    // console.log(row);
    console.log('----------------------------');
    const dialogRef = this.dialog.open(DAnalyseComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log("response code1")
      console.log(result)
      console.log("response code2")
      // this.refreshTable();
    });
  }
}
