import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CropDTO} from "../../../../dto/CropDTO";
import {CResultComponent} from "../c-result/c-result.component";
import {CookieService} from "ngx-cookie";
import {CropsDTO} from "../../../../dto/CropsDTO";
import {CRecommendService} from "../../../../services/c-recommend.service";

@Component({
  selector: 'app-c-recommend',
  templateUrl: './c-recommend.component.html',
  styleUrls: ['./c-recommend.component.scss']
})
export class CRecommendComponent implements OnInit {

  CRForm!: FormGroup;
  cookieValues :any
  soilValues:any

  constructor(public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public datas: any,
              public dialogRef: MatDialogRef<CRecommendComponent>,
              private recommendService:CRecommendService,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.CRForm = new FormGroup({
      N: new FormControl('', [
        Validators.required,
      ]),
      P: new FormControl('', [
        Validators.required,
      ]),
      K: new FormControl('', [
        Validators.required,
      ]),
      temperature: new FormControl('', [
        Validators.required
      ]),
      humidity: new FormControl('', [
        Validators.required,
      ]),
      ph: new FormControl('', [
        Validators.required,
      ]),
      rainfall: new FormControl('', [
        Validators.required,
      ])
    });
    this.cookieValues = JSON.parse(this.cookieService.get('Cli'));
    this.soilValues = JSON.parse(this.cookieService.get('Soil'));
    console.log("=================== cookieValues ==============================")
    console.log(this.cookieValues)
    console.log(this.soilValues)
    console.log("=================== soilValues ==============================")
    this.CRForm.setValue({
      N:JSON.stringify(this.soilValues.properties.layers[0].depths[0].values['Q0.5']),
      P:JSON.stringify(this.soilValues.properties.layers[1].depths[0].values['Q0.5']),
      K :JSON.stringify(this.cookieValues.current.humidity),
      temperature:JSON.stringify(this.cookieValues.current.temp_c),
      humidity:JSON.stringify(this.cookieValues.current.humidity),
      ph:JSON.stringify(this.soilValues.properties.layers[1].depths[0].values['Q0.5']),
      rainfall:JSON.stringify(this.cookieValues.current.precip_mm),
    })

  }

  predictCrops() {
    this.recommendService.getCropData(new CropsDTO(
      this.CRForm.get('N')?.value,
      this.CRForm.get('P')?.value,
      this.CRForm.get('K')?.value,
      this.CRForm.get('temperature')?.value,
      this.CRForm.get('humidity')?.value,
      this.CRForm.get('ph')?.value,
      this.CRForm.get('rainfall')?.value
    )).subscribe(res=>{
      console.log(res)
      this.dialogRef.close()
      this.openDialog3(res)
    })
  }

  openDialog3(res: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = res;
    dialogConfig.width = '600px';
    dialogConfig.height = 'auto';
    // console.log(row);
    console.log('----------------------------');
    const dialogRef = this.dialog.open(CResultComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log("response code1")
      console.log(result)
      console.log("response code2")
      // this.refreshTable();
    });
  }

}
