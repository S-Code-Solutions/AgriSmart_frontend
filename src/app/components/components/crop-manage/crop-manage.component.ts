import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Injectable } from '@angular/core';
import {CropManageService} from "../../services/crop-manage.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as Notiflix from "notiflix";
import {CropDTO} from "../../dto/CropDTO";
import {MatTableDataSource} from "@angular/material/table";
import {debounceTime, distinctUntilChanged, Observable, Subject, Subscription, timeout} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {PlantingDTO} from "../../dto/PlantingDTO";
import {FertilizingDTO} from "../../dto/FertilizingDTO";
import {HarvestingDTO} from "../../dto/HarvestingDTO";
import {DatePipe} from "@angular/common";
import {MatDatepicker, MatDatepickerInput} from "@angular/material/datepicker";
import {PlantDTO} from "../../dto/PlantDTO";
import {Plant_DetailDTO} from "../../dto/Plant_DetailDTO";
import {MAT_DATE_FORMATS, MatDateFormats} from "@angular/material/core";
import {PlantManageService} from "../../services/plant-manage.service";
import * as SockJS from 'sockjs-client';
import {CompatClient, Message, Stomp} from '@stomp/stompjs';
import {CookieService} from "ngx-cookie";
import {faLeaf} from '@fortawesome/free-solid-svg-icons';
import {MatTabChangeEvent} from "@angular/material/tabs";
import {StompService} from "@stomp/ng2-stompjs";
import {Filter} from "../../../core/filters/Filter";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {SystemConfig} from "../../../core/config/SystemConfig";


const MY_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-crop-manage',
  templateUrl: './crop-manage.component.html',
  styleUrls: ['./crop-manage.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
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
  crop_status_types: string[] = ['Germinate', 'Seedling', 'Vegetative','Reproductive','Mature','Senescence'];

  components!: Array<CropDTO>[];
  displayedColumns: string[] = ['crop_name', 'crop_variety', 'crop_status', 'action'];
  dataSource!: MatTableDataSource<Array<CropDTO>>;
  private allCropsSub!: Subscription;
  private allPlantingsSub!: Subscription;
  private allFertilizsSub!: Subscription;
  private allHarvestsSub!: Subscription;
  ofListofCrops!: any[];
  ofListofCropss: string[] = ['Planting Details', 'Fertilizing Details', 'Harvesting Details'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  showComponent = true;
  showSchedule = false;
  loading = false;
  cropName!: any;
  cropId!: any;

  plantingForm!: FormGroup;
  plantingDtailForm!: FormGroup;
  planting_density: string[] = ['5 plants per sm', '10 plants per sm', '25 plants per sm'];
  seeding_rate: string[] = ['none', '2 kg of seed per ht', '5 kg of seed per ht', '10 kg of seed per ht'];
  seeding_depth: string[] = ['none', '2 cm', '5 cm', '10 cm'];
  planting_method: string[] = ['Direct seeding', 'Transplanting'];
  soil_preparation: string[] = ['Tilling', 'Adding compost', 'Leveling '];
  plantingdataSource!: MatTableDataSource<Array<PlantingDTO>>;
  displayedPlantingColumns: string[] = ['crop_name', 'planting_location', 'planting_density', 'seeding_rate', 'seeding_depth', 'planting_method', 'soil_preparation', 'planting_date', 'action'];
  @ViewChild('planting_date_picker') planting_date_picker!: MatDatepicker<MatDatepickerInput<Date>>;
  selectedDate!: Date;
  faLeaf = faLeaf;
  manageplanting = false
  plantingtable = false
  plantmethods!: any[];
  pmethod!:any
  actStatus = 'Available'
  showDtails = false
  plantingbtn= false
  fertilizingbtn= false
  harvetingbtn = false

  filterDetailsForm!: FormGroup;
  search = new Subject();
  filters: Filter[] = [{key: 'ALL', value: 'All'}, {key: 'NAME', value: 'Name'}, {key: 'DESC', value: 'Desc'}, {key: 'URL', value: 'Url'}, {
    key: 'QTY', value: 'qty'},{key: 'PRICE', value: 'Price'},{key: 'CODE', value: 'Code'}];
  cropDetails!: any[];
  searchedWords!: string[];

  plantingDetails!: any[];
  fertiliingDetails!: any[];
  harvestDetails!: any[];

  fileToUpload: any;
  // fileName: any;
  currentFile?: File;
  progress = 0;
  message: string[] = [];
  fileName = 'Select File';
  fileInfos?: Observable<any>;
  progressbar = true;
  progressInfos: any[] = [];

  fertilizingScheduleForm!: FormGroup;
  fertilizingdataSource!: MatTableDataSource<Array<FertilizingDTO>>;
  displayedFertilizingColumns: string[] = ['crop_name', 'fertilizer_type', 'fertilizer_app_method', 'fertilizer_app_fre', 'application_rate', 'fertilizer_placement', 'application_timing', 'fertigation', 'fertlizing_date', 'action'];
  managefertilizing = false
  fertilizingtable = false
  FertilizeForm!: FormGroup;

  harvestingScheduleForm!: FormGroup;
  harvestingdataSource!: MatTableDataSource<Array<HarvestingDTO>>;
  displayedHarvestingColumns: string[] = ['crop_name', 'harvest_method', 'harvesting_equipment', 'labor_requirement', 'storage_requirement', 'harvest_quality', 'market_destination', 'post_harvest_handling', 'yield_analysis', 'crop_maturity', 'harvest_labor_cost', 'harvest_transport', 'harvest_waste', 'harvesting_date', 'action'];
  manageharvesting = false
  harvestingtable = false
  harvestingForm!: FormGroup;

  public stompClient!: CompatClient;
  messages: any[] = [];
  private fileDatas!: File;
  previews: string[] = [];

  private searchComponentsSub!: Subscription;
  CropList! :any[];
  pageCount = 0;
  pageEvent!: PageEvent;
  length = 50;
  pageSize = 10;
  disabled = false;
  showFirstLastButtons = true;
  showPageSizeOptions = true;
  pageSizeOptions!: number[];
  hidePageSize = false;
  pageIndex = 0;

  constructor(private cropManageService: CropManageService,
              private datePipe: DatePipe, private plantManageService: PlantManageService, private cookieService: CookieService,private stompService: StompService) {
    this.dataSource = new MatTableDataSource(this.components);
    // const webSocket = new SockJS('http://localhost:8080/websocket');
    // this.stompClient = Stomp.over(webSocket);
    // const socket = new SockJS('http://localhost:8080/websocket');
    this.initializeWebSocketConnection();
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
      imageURL: new FormControl('', [
        Validators.required
      ]),
      crop_status: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z]+$')
      ])
    });

    this.plantingForm = new FormGroup({
      plantMethod: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z]+$')
      ]),
      methodDesc: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z]+$')
      ])
    })

    this.plantingDtailForm = new FormGroup({
      plantMethod: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z0-9\\s\\W]+$')
      ]),
      planting_location: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z0-9\\s\\W]+$')
      ]),
      planting_density: new FormControl('', [
        Validators.required, Validators.pattern('^[0-9]+$')
      ]),
      seeding_rate: new FormControl('', [
        Validators.required, Validators.pattern('^[0-9]+$')
      ]),
      seeding_depth: new FormControl('', [
        Validators.required, Validators.pattern('^[0-9]+$')
      ]),
      soil_preparation: new FormControl('', [
        Validators.required, Validators.pattern('^[a-zA-Z0-9\\s\\W]+$')
      ]),
      planting_date: new FormControl('', [
        Validators.required
      ]),
      water_duration: new FormControl('', [
        Validators.required, Validators.pattern('^[0-9]+$')
      ]),
    })

    this.FertilizeForm = new FormGroup({
      fertilize_name: new FormControl('', [
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
        Validators.required,
      ]),
    })
    //
    this.harvestingForm = new FormGroup({
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
      harvest_cost: new FormControl('', [
        Validators.required,
      ]),
      harvest_waste: new FormControl('', [
        Validators.required,
      ]),
      harvesting_date: new FormControl('', [
        Validators.required,
      ])
    })
    this.filterDetailsForm = new FormGroup({
      searchKeyWord: new FormControl('', [
        Validators.required
      ]),
    });

    // this.refreshTable();
    // this.connect();

    this.getCropTableList()
    this.getCropList();
    this.dataSource = new MatTableDataSource(this.ofListofCrops);
    this.fileInfos = this.cropManageService.getImg();
    this.search.pipe(
      debounceTime(SystemConfig.getDebounceTime()),
      distinctUntilChanged())
      .subscribe(() => {
        this.searchedWords = this.filterDetailsForm.get('searchKeyWord')?.value.trim().split(' ');
        this.refreshTable();

      });

  }

  // connect() {
  //   this.stompService.initAndConnect();
  // }


  ngAfterViewInit(): void {
    this.stompService.initAndConnect();
    this.stompService.connectObservable.subscribe(() => {
      this.initializeWebSocketConnection();
      this.sendMessage();
      this.gotMessage();
    });
  }
  ngOnDestroy(): void {
    // this.client.deactivate();
    // close WebSocket connection on component destruction
    // this.stompClient.disconnect();
  }

  initializeWebSocketConnection() {
    const serverUrl = window.location.protocol === 'https:' ? 'wss://' + window.location.host + '/notify-websocket' : 'ws://' + window.location.host + '/notify-websocket';
    const ws = new WebSocket(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;

    this.stompClient.connect({}, function() {
      that.stompClient.subscribe('/notify/notification', message => {
        that.cookieService.get('User');
        console.log(message);
      });
    });
  }




  addMessage(message: any, username: string, avatar: string) {
    this.messages.push({
      text: message,
      date: new Date(),
      user: {
        name: username,
        avatar: avatar
      }
    });
  }

  sendMessage() {
    this.stompService.connectObservable.subscribe(connected => {
      if (connected) {
        this.stompService.publish('/app/sendnotification', this.cookieService.get('User'));
      } else {
        this.stompService.initAndConnect();
      }
    });
  }

  gotMessage() {
    this.stompService.subscribe('/my-subscription').subscribe((message: Message) => {
      console.log(`Received message: ${message.body}`);
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  myFilter = (d: Date | null | undefined): boolean => {
    const currentDate = new Date();
    return (d ?? currentDate).getTime() >= currentDate.getTime();
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

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }

  upload(): void {
    // this.progress = 0;
    // this.message = "";
    //
    // if (this.currentFile) {
    //   this.cropManageService.saveImg(this.currentFile).subscribe(
    //     (event: any) => {
    //       if (event.type === HttpEventType.UploadProgress) {
    //         this.progress = Math.round(100 * event.loaded / event.total);
    //       } else if (event instanceof HttpResponse) {
    //         this.message = event.body.message;
    //         this.fileInfos = this.cropManageService.getImg();
    //       }
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.progress = 0;
    //
    //       if (err.error && err.error.message) {
    //         this.message = err.error.message;
    //       } else {
    //         this.message = 'Could not upload the file!';
    //       }
    //
    //       this.currentFile = undefined;
    //     });
    // }

  }

  uploadFile(fileInput: any): void {
    this.message = [];
    this.progressInfos = [];
    this.fileDatas = <File>fileInput.target.files[0];
    this.previews = [];

    if (this.fileDatas) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(e.target.result);
        this.previews.push(e.target.result);
      };
      reader.readAsDataURL(this.fileDatas);
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      console.log(e.target.result);
      this.previews.push(e.target.result);
    };
  }


  handleFileInput(file: any) {
    this.fileToUpload = file.files.item(0);
    console.log(file)
    console.log(file.files)
    console.log(file.files.item(0))
    console.log(this.fileToUpload)
    // Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    // this.imageUrl = this.fileToUpload.name;
    console.log(this.imageUrl);
    this.fileName = this.fileToUpload.name;
    console.log(this.fileName)
  }

  onSaveImg() {

    if (this.fileToUpload) {

      this.cropManageService.saveImage(this.fileToUpload).subscribe(res => {
        if (res) {
          if (res.code == '00') {
          console.log(res)
          console.log("Crop Successfully Added")
          Notiflix.Notify.success('Crop Successfully Added!',{
            position: 'center-center',
            width:'500px',
            backOverlay:true,
            backOverlayColor:'rgba(0,0,0,0.5)',
            cssAnimationStyle:'zoom',
            fontSize:'33px'

          });
          this.getCropTableList();
          }else{
            Notiflix.Notify.failure("Crop Adding Unsuccessful!",{
              position: 'center-center',
              width:'500px',
              backOverlay:true,
              backOverlayColor:'rgba(0,0,0,0.5)',
              cssAnimationStyle:'zoom',
              fontSize:'33px'
            });
          }
          // this.state = true;
        }
      })
    }
  }


  saveCrop() {
    this.cropManageService.saveCrop(new CropDTO(
      this.cropDetailsForm.get('crop_name')?.value,
      this.cropDetailsForm.get('crop_variety')?.value,
      this.fileName,
      this.cropDetailsForm.get('crop_status')?.value
    )).subscribe(result => {
      if (result.code == '00') {
        this.onSaveImg();
      }else{
        Notiflix.Notify.failure("Crop Adding Unsuccessful!",{
          position: 'center-center',
          width:'500px',
          backOverlay:true,
          backOverlayColor:'rgba(0,0,0,0.5)',
          cssAnimationStyle:'zoom',
          fontSize:'33px'
        });
      }
    }, error => {
      console.log(error)
      Notiflix.Notify.failure("Crop-Variety Already Exists",{
        position: 'center-center',
        width:'500px',
        backOverlay:true,
        backOverlayColor:'rgba(0,0,0,0.5)',
        cssAnimationStyle:'zoom',
        fontSize:'33px'
      });
    });
  }

  getCropList(){
    const cropNames: any[] = [];
    this.cropManageService.getAllCrops().subscribe((res:any)=>{
      console.log(res)
      res.content.forEach((crop: { crop_name: any, crop_id: any }) => {
        const cropObj = {
          crop_id: crop.crop_id,
          crop_name: crop.crop_name
        };
        cropNames.push(cropObj);
      });
      this.ofListofCrops = cropNames;
    });
  }


  // ngOnDestroy(): void {
  //   // this.dtTrigger.unsubscribe();
  // }



  getCropTableList(){
    this.allCropsSub = this.cropManageService.getAllCrops()
      // .pipe(timeout(4000))
      .subscribe(result => {
        console.log(result)
        // this.dataSource = result.content;
        this.cropDetails = result.content;
      }, error => {
        console.log(error);
      });
  }

  public refreshTable(): void {
    const searchKeyWord = this.filterDetailsForm.get('searchKeyWord')?.value;
    this.getCropTableList();
    this.searchTable(searchKeyWord)
    this.getCropList();
  }

  searchTable(searchKeyWord: string): void {
    this.searchComponentsSub = this.cropManageService.searchComponent(searchKeyWord)
      .pipe(timeout(4000))
      .subscribe(result => {
        console.log(result.content)
        this.paginator.length = result.content.length;
        this.cropDetails = result.content;
        this.refreshPageCount();
      }, error => {
        console.log(error);
      });
  }

  public refreshPageCount(): void {
    if (this.paginator){
      console.log('refresh page count');
      this.pageCount = Math.ceil(this.paginator.length / this.paginator.pageSize);
      console.log('refresh page count after');
    }
  }


  getCropLists(crop_name: any, crop_id:any) {
    console.log("Item clck name");
    console.log(crop_name)
    console.log("Item clck crop_id");
    console.log(crop_id)
    this.loading = true;
    setTimeout(() => {
      this.showComponent = false;
      this.loading = false;
      this.showSchedule = false;
      this.cropName = crop_name
      this.cropId = crop_id
      this.showDtails = true
    }, 500); // simulate a 2-second delay for loading the component
  }

  getDtailLists(item: any,cropName:any) {
    if (item == 'Planting Details'){
      console.log(item)
      this.loading = true;
      setTimeout(() => {
        this.getPlantingList();
        this.showComponent = false;
        this.loading = false;
        this.fertilizingtable = false
        this.fertilizingbtn = false
        this.harvestingtable = false
        this.harvetingbtn = false
        this.managefertilizing = false;
        this.manageharvesting = false;
        this.fertilizingtable = false;
        this.harvestingtable = false;
        this.loading = false;
        this.showSchedule = true;
        this.plantingtable = true
        this.plantingbtn = true
        this.cropName = cropName
      }, 500); // simulate a 2-second delay for loading the component
    }else if (item == 'Fertilizing Details'){
      console.log(item)
      this.loading = true;
      setTimeout(() => {
        this.getFertilizingList();
        this.showComponent = false;
        this.loading = false;
        this.plantingtable = false
        this.plantingbtn = false
        this.harvestingtable = false
        this.harvetingbtn = false
        this.manageharvesting = false;
        this.harvestingtable = false;
        this.manageplanting = false
        this.plantingtable = false;
        this.loading = false;
        this.showSchedule = true;
        this.fertilizingtable = true
        this.fertilizingbtn = true
        this.cropName = cropName
      }, 500); // simulate a 2-second delay for loading the component
    }else if (item == 'Harvesting Details'){
      console.log(item)
      this.loading = true;
      setTimeout(() => {
        this.getHarvestingList();
        this.showComponent = false;
        this.loading = false;
        this.fertilizingtable = false
        this.fertilizingbtn = false
        this.plantingtable = false
        this.plantingbtn = false
        this.manageplanting = false
        this.plantingtable = false;
        this.managefertilizing = false;
        this.fertilizingtable = false;
        this.loading = false;
        this.showSchedule = true;
        this.harvestingtable = true
        this.harvetingbtn = true
        this.cropName = cropName
      }, 500); // simulate a 2-second delay for loading the component
    }else{
      console.log(item)
      this.loading = true;
      setTimeout(() => {
        this.showComponent = false;
        this.loading = false;
        this.fertilizingtable = false
        this.fertilizingbtn = false
        this.harvestingtable = false
        this.harvetingbtn = false
        this.managefertilizing = false;
        this.manageharvesting = false;
        this.fertilizingtable = false;
        this.harvestingtable = false;
        this.loading = false;
        this.showSchedule = true;
        this.plantingtable = true
        this.plantingbtn = true
        this.cropName = cropName
      }, 500); // simulate a 2-second delay for loading the component
    }

  }

  plantingDtails() {
    this.loading = true;
    setTimeout(() => {
      this.showComponent = false;
      this.managefertilizing = false;
      this.manageharvesting = false;
      this.fertilizingtable = false;
      this.harvestingtable = false;
      this.loading = false;
      this.showSchedule = true;
      this.manageplanting = true
      this.plantingtable = true;
    }, 500);
  }

  fertilizDtails() {
    this.loading = true;
    setTimeout(() => {
      this.showComponent = false;
      this.manageharvesting = false;
      this.harvestingtable = false;
      this.manageplanting = false
      this.plantingtable = false;
      this.loading = false;
      this.showSchedule = true;
      this.managefertilizing = true;
      this.fertilizingtable = true;
    }, 500);

  }

  harvestDtails() {
    this.loading = true;
    setTimeout(() => {
      this.showComponent = false;
      this.manageplanting = false
      this.plantingtable = false;
      this.managefertilizing = false;
      this.fertilizingtable = false;
      this.loading = false;
      this.showSchedule = true;
      this.manageharvesting = true;
      this.harvestingtable = true;
    }, 500);
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
    // this.plantManageService.savePlant(new PlantDTO(
    //   this.plantingScheduleForm.get('plantMethod')?.value,
    //   ''
    // )).subscribe(result => {
    //   console.log(result)
    //   // this.savePsub()
    //   // console.log("Plant details Successfully Added")
    //   // console.log(result)
    //   // Notiflix.Notify.success('Planting details Successfully Added',{
    //   //   position: 'center-bottom'
    //   // });
    // }, error => {
    //   Notiflix.Notify.failure(error,{
    //     position: 'center-bottom'
    //   });
    // });
  }

  savePsub() {
    // this.plantManageService.savePlantDetails(new Plant_DetailDTO(
    //   this.plantingScheduleForm.get('plantMethod')?.value,
    //   this.plantingScheduleForm.get('planting_location')?.value,
    //   this.plantingScheduleForm.get('planting_density')?.value,
    //   this.plantingScheduleForm.get('seeding_rate')?.value,
    //   this.plantingScheduleForm.get('seeding_depth')?.value,
    //   this.plantingScheduleForm.get('soil_preparation')?.value,
    //   this.plantingScheduleForm.get('planting_date')?.value,
    //   this.plantingScheduleForm.get('water_duration')?.value,
    //   '',
    //   ''
    // )).subscribe(result => {
    //   console.log("Plant details Successfully Added")
    //   console.log(result)
    //   Notiflix.Notify.success('Planting details Successfully Added',{
    //     position: 'center-bottom'
    //   });
    // }, error => {
    //   Notiflix.Notify.failure(error,{
    //     position: 'center-bottom'
    //   });
    // });
  }

  saveFSchedule() {
    console.log(this.cropId)
    this.plantManageService.saveFertilize(new FertilizingDTO(
      this.FertilizeForm.get('fertilize_name')?.value,
      this.FertilizeForm.get('fertilizer_type')?.value,
      this.FertilizeForm.get('fertilizer_app_method')?.value,
      this.FertilizeForm.get('fertilizer_app_fre')?.value,
      this.FertilizeForm.get('application_rate')?.value,
      this.FertilizeForm.get('fertilizer_placement')?.value,
      this.FertilizeForm.get('application_timing')?.value,
      this.FertilizeForm.get('fertigation')?.value,
      this.FertilizeForm.get('fertlizing_date')?.value,
      '',
      this.cropId
    )).subscribe(result => {
      console.log("Fertilizing Method Successfully Added")
      console.log(result)
      Notiflix.Notify.success('Fertilizing Method Successfully Added',{
        position: 'center-bottom'
      });
      this.getFertilizingList()
    }, error => {
      console.log(error)
      Notiflix.Notify.failure("Fertilizing Method Already Exists",{
        position: 'center-bottom'
      });
    });
  }

  saveHSchedule() {
    this.plantManageService.saveHarvest(new HarvestingDTO(
      this.harvestingForm.get('harvest_method')?.value,
      this.harvestingForm.get('harvesting_equipment')?.value,
      this.harvestingForm.get('labor_requirement')?.value,
      this.harvestingForm.get('storage_requirement')?.value,
      this.harvestingForm.get('harvest_quality')?.value,
      this.harvestingForm.get('harvest_cost')?.value,
      this.harvestingForm.get('harvest_waste')?.value,
      this.harvestingForm.get('harvesting_date')?.value,
      '',
      this.cropId
    )).subscribe(result => {
      console.log("Harvesting Method Successfully Added")
      console.log(result)
      Notiflix.Notify.success('Harvesting Method Successfully Added',{
        position: 'center-bottom'
      });
      this.getHarvestingList()
    }, error => {
      console.log(error)
      Notiflix.Notify.failure("Harvesting Method Already Exists",{
        position: 'center-bottom'
      });
    });
  }

  getPlantingList(){
    this.allPlantingsSub = this.plantManageService.getAllPlants()
      // .pipe(timeout(4000))
      .subscribe(result => {
        console.log(result)
        // this.dataSource = result.content;
        this.plantingDetails = result.content;
      }, error => {
        console.log(error);
      });
  }

  getFertilizingList(){
    this.allFertilizsSub = this.plantManageService.getAllFerts()
      // .pipe(timeout(4000))
      .subscribe(result => {
        console.log(result)
        // this.dataSource = result.content;
        this.fertiliingDetails = result.content;
      }, error => {
        console.log(error);
      });
  }

  getHarvestingList(){
    this.allHarvestsSub = this.plantManageService.getAllHarvest()
      // .pipe(timeout(4000))
      .subscribe(result => {
        console.log(result)
        // this.dataSource = result.content;
        this.harvestDetails = result.content;
      }, error => {
        console.log(error);
      });
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





  savePlantDtail() {
    this.plantManageService.savePlant(new PlantDTO(
      this.plantingDtailForm.get('plantMethod')?.value,
      this.plantingDtailForm.get('planting_location')?.value,
      this.plantingDtailForm.get('planting_density')?.value,
      this.plantingDtailForm.get('seeding_rate')?.value,
      this.plantingDtailForm.get('seeding_depth')?.value,
      this.plantingDtailForm.get('soil_preparation')?.value,
      this.plantingDtailForm.get('planting_date')?.value,
      this.plantingDtailForm.get('water_duration')?.value,
      'message',
      this.cropId
    )).subscribe(result => {
      console.log("Plant Method Successfully Added")
      console.log(result)
      Notiflix.Notify.success('Plant Method Successfully Added',{
        position: 'center-bottom'
      });
      this.getPlantingList()
    }, error => {
      console.log(error)
      Notiflix.Notify.failure("Plant Method Already Exists",{
        position: 'center-bottom'
      });
    });
  }

  tabClick($event: MatTabChangeEvent) {
    if($event.tab.textLabel == 'PlantingDetails'){
      this.loadPlantMethods()
    }else{
      Notiflix.Notify.failure("No Plant Methods Exist",{
        position: 'center-bottom'
      });
    }
  }

  loadPlantMethods() {
    this.plantManageService.getAllPlants()
      // .pipe(timeout(4000))
      .subscribe(result => {
        console.log(result)
        this.plantmethods = result.content.plantMethod;
      }, error => {
        console.log(error);
      });
  }

  getPMethod(item: any) {
    this.pmethod = item
  }


  viewDetails(componetID: any) {
    // viewDetails(itemId:any): void {
    //   this.itemsservice.getItemDetails(itemId).subscribe(res => {
    //     console.log(res)
    //     const dialogConfig = new MatDialogConfig();
    //     dialogConfig.disableClose = true;
    //     dialogConfig.autoFocus = true;
    //     dialogConfig.data = res;
    //     console.log('----------------------------');
    //     const dialogRef = this.dialog.open(ItemDetailsComponent, dialogConfig);
    //     dialogRef.afterClosed().subscribe(result => {
    //       this.loader = false;
    //       console.log("response code1")
    //       console.log(result)
    //       console.log("response code2")
    //       this.refreshTable();
    //     });
    //
    //   })
    // }
  }

  updateCustomer(items: any) {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.data = row;
    // dialogConfig.width = '100%';
    // dialogConfig.height = '95%';
    // console.log(row);
    // console.log('----------------------------');
    // const dialogRef = this.dialog.open(UpdateItemsComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(result => {
    //   this.loader = false;
    //   console.log("response code1")
    //   console.log(result)
    //   console.log("response code2")
    //   this.refreshTable();
    // });
  }

  deleteCustomer(items: any) {
    // const approval = this.dialog.open(ApprovelDialogComponent, {
    //   width: '350px',
    //   data: new ApprovalDialogConfig('Delete', 'Warning !', 'Are you sure you want to delete '+row.componetName+' Item?')
    // });
    // approval.afterClosed().subscribe(approve => {
    //   if (approve) {
    //     this.loader = false;
    //     console.log(approve)
    //     this.itemsservice.deleteComponent(row.componetID).subscribe(res => {
    //       console.log(res);
    //       this.refreshTable();
    //     });
    //
    //   }else{
    //     const approval4 = this.dialog.open(ApprovelDialogComponent, {
    //       width: '350px',
    //       data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item '+row.componetName+' Is Not Deleted')
    //     });
    //     approval4.afterClosed().subscribe(approve => {
    //       if (approve) {
    //         this.loader = false;
    //         this.refreshTable();
    //
    //       }
    //     })
    //   }
    // });
  }


  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
}
