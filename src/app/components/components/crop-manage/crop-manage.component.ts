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

@Component({
  selector: 'app-crop-manage',
  templateUrl: './crop-manage.component.html',
  styleUrls: ['./crop-manage.component.scss']
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
  showComponent = true;
  showSchedule = false;
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


  fertilizingScheduleForm!: FormGroup;
  fertilizingdataSource!: MatTableDataSource<Array<FertilizingDTO>>;
  displayedFertilizingColumns: string[] = ['crop_name', 'fertilizer_type', 'fertilizer_app_method', 'fertilizer_app_fre', 'application_rate', 'fertilizer_placement','application_timing','fertigation', 'fertlizing_date', 'action'];


  harvestingScheduleForm!: FormGroup;
  harvestingdataSource!: MatTableDataSource<Array<HarvestingDTO>>;
  displayedHarvestingColumns: string[] = ['crop_name', 'harvest_method', 'harvesting_equipment', 'labor_requirement', 'storage_requirement', 'harvest_quality','market_destination','post_harvest_handling', 'yield_analysis', 'crop_maturity', 'harvest_labor_cost', 'harvest_transport', 'harvest_waste', 'harvesting_date', 'action'];


  constructor(private cropManageService:CropManageService) {
    // this.dataSource = new MatTableDataSource(this.components);
  }


  ngOnInit(): void {
    // this.dtOptions = {
    //   pagingType: "full_numbers",
    //   serverSide: false,
    //   processing: true,
    //   deferRender: true,
    //   lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, 'Tous']],
    //   order: [[1, 'desc']],
    //   // Declare the use of the extension in the dom parameter
    //   dom: 'Blfrtip',
    //   stateSave: true,
    //   columns: [
    //     { data: "crop_name" },
    //     { data: "crop_variety" },
    //     { data: "planting_date" },
    //     { data: "harvest_date" },
    //     { data: "expected_yield" },
    //     { data: "soil_type" },
    //     { data: "fertilizer_control" },
    //     { data: "pesticide_type" },
    //     { data: "crop_status" },
    //     { data: "cost" },
    //     { data: "location" },
    //     { data: "action" }
    //   ],
    //   columnDefs: [
    //     {
    //       targets: 0,
    //       searchable: true,
    //       orderable: false,
    //       className: "dt-body-center"
    //     }
    //     ]
    // };

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

    this.plantingScheduleForm = new FormGroup({
      crop_name: new FormControl('', [
        Validators.required,
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
      planting_method: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z]+$')
      ]),
      soil_preparation: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z]+$')
      ]),
      planting_date: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z]+$')
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

    this.refreshTable();

    this.dataSource = new MatTableDataSource(this.ofListofCrops);
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngAfterViewInit(): void {
    this.refreshTable();
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
      this.cropDetailsForm.get('location')?.value,
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
