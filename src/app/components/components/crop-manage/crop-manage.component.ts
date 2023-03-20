import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {CropManageService} from "../../services/crop-manage.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as Notiflix from "notiflix";
import {CropDTO} from "../../dto/CropDTO";
import {MatTableDataSource} from "@angular/material/table";
import {Subject, Subscription} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {PlantingDTO} from "../../dto/PlantingDTO";
import {FertilizingDTO} from "../../dto/FertilizingDTO";
import {HarvestingDTO} from "../../dto/HarvestingDTO";
import {DatePipe} from "@angular/common";
import {MatDatepicker, MatDatepickerInput} from "@angular/material/datepicker";
import {PlantDTO} from "../../dto/PlantDTO";
import {Plant_DetailDTO} from "../../dto/Plant_DetailDTO";

export const MY_FORMATS = {
  parse: {
    dateInput: "YYYY-MM-DD HH:mm:ss"
  },
  display: {
    dateInput: "YYYY-MM-DD HH:mm:ss",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "YYYY-MM-DD HH:mm:ss",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@Component({
  selector: 'app-crop-manage',
  templateUrl: './crop-manage.component.html',
  styleUrls: ['./crop-manage.component.scss'],
})

export class CropManageComponent implements OnInit,AfterViewInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  cropDetailsForm!: FormGroup;
  apiResponse!: false;
  crop_varieties: string[] = ['One', 'Two', 'Three'];
  soil_types: string[] = ['One', 'Two', 'Three'];
  fertilizer_types: string[] = ['One', 'Two', 'Three'];
  pesticide_types: string[] = ['One', 'Two', 'Three'];
  crop_status_types: string[] = ['One', 'Two', 'Three'];

  components!: Array<CropDTO>[];
  displayedColumns: string[] = ['crop_name', 'crop_variety', 'planting_date', 'harvest_date', 'expected_yield', 'soil_type','fertilizer_control','pesticide_type','crop_status', 'cost', 'location', 'action'];
  dataSource!: MatTableDataSource<Array<CropDTO>>;
  private allComponentsSub!: Subscription;
  ofListofCrops!: any[];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  showComponent = false;
  showSchedule = true;
  loading = false;
  cropName!:any;

  plantingScheduleForm!: FormGroup;
  planting_density: string[] = ['5 plants per sm', '10 plants per sm', '25 plants per sm'];
  seeding_rate: string[] = ['none','2 kg of seed per ht', '5 kg of seed per ht', '10 kg of seed per ht'];
  seeding_depth: string[] = ['none','2 cm', '5 cm', '10 cm'];
  planting_method: string[] = ['Direct seeding', 'Transplanting'];
  soil_preparation: string[] = ['Tilling', 'Adding compost','Leveling '];
  plantingdataSource!: MatTableDataSource<Array<PlantingDTO>>;
  displayedPlantingColumns: string[] = ['crop_name', 'planting_location', 'planting_density', 'seeding_rate', 'seeding_depth', 'planting_method','soil_preparation','planting_date', 'action'];
  @ViewChild('planting_date_picker') planting_date_picker!: MatDatepicker<MatDatepickerInput<Date>>;


  fertilizingScheduleForm!: FormGroup;
  fertilizingdataSource!: MatTableDataSource<Array<FertilizingDTO>>;
  displayedFertilizingColumns: string[] = ['crop_name', 'fertilizer_type', 'fertilizer_app_method', 'fertilizer_app_fre', 'application_rate', 'fertilizer_placement','application_timing','fertigation', 'fertlizing_date', 'action'];


  harvestingScheduleForm!: FormGroup;
  harvestingdataSource!: MatTableDataSource<Array<HarvestingDTO>>;
  displayedHarvestingColumns: string[] = ['crop_name', 'harvest_method', 'harvesting_equipment', 'labor_requirement', 'storage_requirement', 'harvest_quality','market_destination','post_harvest_handling', 'yield_analysis', 'crop_maturity', 'harvest_labor_cost', 'harvest_transport', 'harvest_waste', 'harvesting_date', 'action'];


  constructor(private cropManageService:CropManageService, private datePipe: DatePipe) {
    // this.dataSource = new MatTableDataSource(this.components);
  }


  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };

    this.cropDetailsForm = new FormGroup({
      crop_name: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z]+$')
      ]),
      crop_variety: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')
      ]),
      crop_status: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z]+$')
      ])
    });

    this.plantingScheduleForm = new FormGroup({
      crop_name: new FormControl('', [
        Validators.required,
      ]),
      plantMethod: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z]+$')
      ]),
      planting_location: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z]+$')
      ]),
      planting_density: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z]+$')
      ]),
      seeding_rate: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z]+$')
      ]),
      seeding_depth: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z]+$')
      ]),
      soil_preparation: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z]+$')
      ]),
      planting_date: new FormControl('', [
        Validators.required
      ]),
      water_duration: new FormControl('', [
        Validators.required
      ]),
    })

    this.fertilizingScheduleForm = new FormGroup({
      crop_name: new FormControl('', [
        Validators.required,
      ]),
      fertilizer_type: new FormControl('', [
        Validators.required,
      ]),
      fertilizer_app_method: new FormControl('', [
        Validators.required,
      ]),
      fertilizer_app_fre: new FormControl('', [
        Validators.required,
      ]),
      application_rate: new FormControl('', [
        Validators.required,
      ]),
      fertilizer_placement: new FormControl('', [
        Validators.required,
      ]),
      application_timing: new FormControl('', [
        Validators.required,
      ]),
      fertigation: new FormControl('', [
        Validators.required,
      ]),
      fertlizing_date: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z]+$')
      ]),
    })

    this.harvestingScheduleForm = new FormGroup({
      crop_name: new FormControl('', [
        Validators.required,
      ]),
      harvest_method: new FormControl('', [
        Validators.required,
      ]),
      harvesting_equipment: new FormControl('', [
        Validators.required,
      ]),
      labor_requirement: new FormControl('', [
        Validators.required,
      ]),
      storage_requirement: new FormControl('', [
        Validators.required,
      ]),
      harvest_quality: new FormControl('', [
        Validators.required,
      ]),
      market_destination: new FormControl('', [
        Validators.required,
      ]),
      post_harvest_handling: new FormControl('', [
        Validators.required,
      ]),
      yield_analysis: new FormControl('', [
        Validators.required,
      ]),
      crop_maturity: new FormControl('', [
        Validators.required,
      ]),
      harvest_labor_cost: new FormControl('', [
        Validators.required,
      ]),
      harvest_transport: new FormControl('', [
        Validators.required,
      ]),
      harvest_waste: new FormControl('', [
        Validators.required,
      ]),
      harvesting_date: new FormControl('', [
        Validators.required,
      ]),
    })

    // this.refreshTable();

    this.dataSource = new MatTableDataSource(this.ofListofCrops);
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngAfterViewInit(): void {
    // this.refreshTable();
  }

  previewUrl!: any | ArrayBuffer | null;
  isLoading: boolean = false;
  imageUrl!: string;

  // onFileSelected(event: any): void {
  //   this.isLoading = true;
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     console.log(event.target)
  //     // if (!(event.target != null)) {
  //     //   this.previewUrl = event.target.result;
  //     //   this.isLoading = false;
  //     // }
  //   };
  //   reader.readAsDataURL(file);
  // }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }



  saveCrop() {
    this.cropManageService.saveCrop(new CropDTO(
      this.cropDetailsForm.get('crop_name')?.value,
      this.cropDetailsForm.get('crop_variety')?.value,
      this.cropDetailsForm.get('crop_status')?.value
    )).subscribe(result => {
      console.log("Crop Successfully Added")
      console.log(result)
      Notiflix.Notify.success('Crop Successfully Added',{
        position: 'center-bottom'
      });
    }, error => {
      console.log(error)
      Notiflix.Notify.failure("Crop-Variety Already Exists",{
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
      // console.log("this.ofListofCrops")
      // console.log(this.ofListofCrops)
      // this.dtTrigger.next(this.ofListofCrops)
      // this.ofListofCrops=res.content;
      // if (res.code=='00'){
      //   this.dataSource=res.content;
      // }
    });
  }

  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }

  getCropTableList(){
    this.allComponentsSub = this.cropManageService.getAllCrops()
      // .pipe(timeout(4000))
      .subscribe(result => {
        console.log(result)
        this.dataSource = result.content;
      }, error => {
        console.log(error);
      });
  }

  public refreshTable(): void {
    this.getCropTableList();
    this.getCropList();
  }


  getCropLists(item: any) {
    console.log("Item clck name");
    console.log(item)
    this.loading = true;
    setTimeout(() => {
      this.showComponent = false;
      this.loading = false;
      this.showSchedule = true;
      this.cropName = item
    }, 500); // simulate a 2-second delay for loading the component
  }


  updateProduct(element:any) {

  }

  deleteProduct(element:any) {

  }

  toggleComponent() {
    console.log("toggle")
    this.loading = true;
    setTimeout(() => {
      this.showSchedule = false;
      this.showComponent = !this.showComponent;
      this.loading = false;
    }, 500); // simulate a 2-second delay for loading the component
  }

  savePSchedule() {
    this.cropManageService.savePlant(new PlantDTO(
      this.plantingScheduleForm.get('plantMethod')?.value,
      ''
    )).subscribe(result => {
      console.log(result)
      // this.savePsub()
      // console.log("Plant details Successfully Added")
      // console.log(result)
      // Notiflix.Notify.success('Planting details Successfully Added',{
      //   position: 'center-bottom'
      // });
    }, error => {
      Notiflix.Notify.failure(error,{
        position: 'center-bottom'
      });
    });
  }

  savePsub() {
    this.cropManageService.savePlantDetails(new Plant_DetailDTO(
      this.plantingScheduleForm.get('plantMethod')?.value,
      this.plantingScheduleForm.get('planting_location')?.value,
      this.plantingScheduleForm.get('planting_density')?.value,
      this.plantingScheduleForm.get('seeding_rate')?.value,
      this.plantingScheduleForm.get('seeding_depth')?.value,
      this.plantingScheduleForm.get('soil_preparation')?.value,
      this.plantingScheduleForm.get('planting_date')?.value,
      this.plantingScheduleForm.get('water_duration')?.value,
      '',
      ''
    )).subscribe(result => {
      console.log("Plant details Successfully Added")
      console.log(result)
      Notiflix.Notify.success('Planting details Successfully Added',{
        position: 'center-bottom'
      });
    }, error => {
      Notiflix.Notify.failure(error,{
        position: 'center-bottom'
      });
    });
  }

  saveFSchedule() {

  }

  saveHSchedule() {

  }

  updatePlanting(element:any) {

  }

  deletePlanting(element:any) {

  }

  updateFertilize(element:any) {

  }

  deleteFertilize(element:any) {

  }

  updateHarvest(element:any) {

  }

  deleteHarvest(element:any) {

  }
}
