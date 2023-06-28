import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {FResultComponent} from "../f-result/f-result.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie";
import {FRecommendService} from "../../../../services/f-recommend.service";
import {FertDTO} from "../../../../dto/FertDTO";

@Component({
  selector: 'app-f-recommend',
  templateUrl: './f-recommend.component.html',
  styleUrls: ['./f-recommend.component.scss']
})
export class FRecommendComponent implements OnInit {

  FRForm!: FormGroup;
  cookieValues :any
  soilValues:any

  constructor(public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<FRecommendComponent>,
              private frService:FRecommendService,
              private cookieService: CookieService) {
  }

  soilTypes: string[] = ['Sandy', 'Loamy', 'Black', 'Red', 'Clayey'];
  cropTypess: string[] = ['Maize', 'Sugarcane', 'Cotton', 'Tobacco', 'Paddy', 'Barley', 'Wheat', 'Millets', 'Oil seeds', 'Pulses', 'Ground Nuts'];

  ngOnInit(): void {
    this.FRForm = new FormGroup({
      Nitrogen: new FormControl('', [
        Validators.required,
      ]),
      Phosphorous: new FormControl('', [
        Validators.required,
      ]),
      Potassium: new FormControl('', [
        Validators.required,
      ]),
      Temparature: new FormControl('', [
        Validators.required
      ]),
      Humidity: new FormControl('', [
        Validators.required,
      ]),
      Moisture: new FormControl('', [
        Validators.required,
      ]),
      soil_type: new FormControl('', [
        Validators.required,
      ]),
      crop_type: new FormControl('', [
        Validators.required,
      ])
    });
    this.cookieValues = JSON.parse(this.cookieService.get('Cli'));
    this.soilValues = JSON.parse(this.cookieService.get('Soil'));
    console.log(this.cookieValues)
    this.FRForm.setValue({
      Nitrogen:JSON.stringify(this.soilValues.properties.layers[0].depths[0].values['Q0.5']),
      Phosphorous:JSON.stringify(this.soilValues.properties.layers[1].depths[0].values['Q0.5']),
      Potassium :JSON.stringify(this.cookieValues.current.humidity),
      Temparature:JSON.stringify(this.cookieValues.current.temp_c),
      Humidity:JSON.stringify(this.cookieValues.current.humidity),
      Moisture:JSON.stringify(this.cookieValues.current.temp_c),
      soil_type:'',
      crop_type:''
    })

  }



  predictFert() {
    this.frService.getFertData(new FertDTO(
      this.FRForm.get('Nitrogen')?.value,
      this.FRForm.get('Phosphorous')?.value,
      this.FRForm.get('Potassium')?.value,
      this.FRForm.get('Temparature')?.value,
      this.FRForm.get('Humidity')?.value,
      this.FRForm.get('Moisture')?.value,
      this.FRForm.get('soil_type')?.value,
      this.FRForm.get('crop_type')?.value
    )).subscribe(res=>{
      console.log(res)
      this.dialogRef.close()
      this.openDialog4(res)
    })
  }

  private openDialog4(res: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = res;
    dialogConfig.width = '600px';
    dialogConfig.height = 'auto';
    // console.log(row);
    console.log('----------------------------');
    const dialogRef = this.dialog.open(FResultComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log("response code1")
      console.log(result)
      console.log("response code2")
      // this.refreshTable();
    });
  }

}
