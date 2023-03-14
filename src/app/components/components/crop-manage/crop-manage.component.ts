import { Component, OnInit } from '@angular/core';
import {CropManageService} from "../../services/crop-manage.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as Notiflix from "notiflix";
import {CropDTO} from "../../dto/CropDTO";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 12, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 13, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 14, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 15, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 16, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 17, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 18, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 19, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 20, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-crop-manage',
  templateUrl: './crop-manage.component.html',
  styleUrls: ['./crop-manage.component.scss']
})

export class CropManageComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  cropDetailsForm!: FormGroup;
  apiResponse!: false;
  crop_varieties: string[] = ['One', 'Two', 'Three'];
  soil_types: string[] = ['One', 'Two', 'Three'];
  fertilizer_types: string[] = ['One', 'Two', 'Three'];
  pesticide_types: string[] = ['One', 'Two', 'Three'];
  crop_status_types: string[] = ['One', 'Two', 'Three'];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  ofListofCrops!: any[];

  constructor(private cropManageService:CropManageService) { }



  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.dataSource = ELEMENT_DATA;

    this.cropDetailsForm = new FormGroup({
      crop_name: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z]+$')
      ]),
      crop_variety: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')
      ]),
      planting_date: new FormControl('', [
        Validators.required,
      ]),
      harvest_date: new FormControl('', [
        Validators.required,
      ]),
      expected_yield: new FormControl('', [
        Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)
      ]),
      soil_type: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z]+$')
      ]),
      fertilizer_control: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')
      ]),
      pesticide_type: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')
      ]),
      crop_status: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z]+$')
      ]),
      cost: new FormControl('', [
        Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)
      ]),
      location: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z]+$')
      ]),
    });

    this.getCropList();
  }

  saveCrop() {
    this.cropManageService.saveCrop(new CropDTO(
      this.cropDetailsForm.get('crop_name')?.value,
      this.cropDetailsForm.get('crop_variety')?.value,
      this.cropDetailsForm.get('planting_date')?.value,
      this.cropDetailsForm.get('harvest_date')?.value,
      this.cropDetailsForm.get('expected_yield')?.value,
      this.cropDetailsForm.get('soil_type')?.value,
      this.cropDetailsForm.get('fertilizer_control')?.value,
      this.cropDetailsForm.get('pesticide_type')?.value,
      this.cropDetailsForm.get('crop_status')?.value,
      this.cropDetailsForm.get('cost')?.value,
    )).subscribe(result => {
      console.log("Crop Successfully Added")
      console.log(result)
      Notiflix.Notify.success('Crop Successfully Added',{
        position: 'center-bottom'
      });
    }, error => {
      Notiflix.Notify.failure(error,{
        position: 'center-bottom'
      });
    });
  }

  getCropList(){
    const cropNames: any[] = [];
    this.cropManageService.getAllCrops().subscribe((res:any)=>{
      console.log(res)
      res.content.forEach((crop: { crop_name: any; }) =>
        // console.log()
        cropNames.push(crop.crop_name),
        this.ofListofCrops = cropNames
      );
      console.log("this.ofListofCrops")
      console.log(this.ofListofCrops)

      // this.ofListofCrops=res.content;
      // if (res.code=='00'){
      //   this.dataSource=res.content;
      // }
    });
  }

  getCropLists(item: any) {
    console.log("Item clck name");
    console.log(item)
  }
}
