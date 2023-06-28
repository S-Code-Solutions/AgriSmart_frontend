import {Component, OnInit} from '@angular/core';
import {
  faCarrot,
  faChartLine,
  faDownload, faDrumstickBite, faMale,
  faMoneyBillWave, faSeedling, faSpinner, faTractor,
  faUpload,
  faWallet
} from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CRecommendComponent} from "../predict-anly/crop/c-recommend/c-recommend.component";
import {EditTransactionComponent} from "./components/edit-transaction/edit-transaction.component";
import {DeleteTransactionComponent} from "./components/delete-transaction/delete-transaction.component";
import {FinanceService} from "../../services/finance.service";
import {FinanceDTO} from "../../dto/financeDTO";
import * as Notiflix from "notiflix";
import {Subscription} from "rxjs";
import {DatePipe} from "@angular/common";

// import chart from 'chart.js';

export interface PeriodicElement {
  Invoice: string;
  Desc: string;
  Amount: number;
  DateandTime: string;
  Status: string;
  Action: any;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {Invoice: 'Transcation-1', Desc: 'desc-1', Amount: 1000, DateandTime: '2024-04-24', Status: 'Expense', Action: ''},
  {Invoice: 'Transcation-2', Desc: 'desc-2', Amount: 2000, DateandTime: '2024-04-24', Status: 'Income', Action: ''},
  {Invoice: 'Transcation-3', Desc: 'desc-3', Amount: 3000, DateandTime: '2024-04-24', Status: 'Pending', Action: ''},
];

@Component({
  selector: 'app-finance-mgt',
  templateUrl: './finance-mgt.component.html',
  styleUrls: ['./finance-mgt.component.scss']
})
export class FinanceMgtComponent implements OnInit {

  faMoneyBillWave = faMoneyBillWave;
  public chart: any;
  paymentForm!: FormGroup;
  selectedDate!: Date;
  displayedColumns: string[] = ['Invoice', 'Desc', 'Amount', 'DateandTime', 'Status', 'Action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  private allFinancesSub!: Subscription;
  financeDetails!: any[];
  formattedDate:any
  options: string[] = ['Cash', 'Card'];
  optionsx: string[] = ['Expense', 'Income'];

  constructor(public dialog: MatDialog, private fiannceService: FinanceService,private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        {
          "description": "Bairaha Farms",
          "proName": "CSELK:BFL.N0000"
        },
        {
          "description": "Browns Investments",
          "proName": "CSELK:BIL.N0000"
        },
        {
          "description": "Renuka Agri Foods",
          "proName": "CSELK:RAL.N0000"
        },
        {
          "description": "Maskeliya Plantation",
          "proName": "CSELK:MASK.N0000"
        },
        {
          "description": "Hayleys PLC",
          "proName": "CSELK:HAYL.N0000"
        },
        {
          "description": "Agstar PLC",
          "proName": "CSELK:AGST.N0000"
        },
        {
          "description": "Jat Holdings",
          "proName": "CSELK:JAT.N0000"
        },
        {
          "description": "AGALAWATTE PLANTATIONS PLC",
          "proName": "CSELK:AGAL.N0000"
        },
        {
          "description": "CIC HOLDINGS PLC",
          "proName": "CSELK:CIC.X0000"
        },
        {
          "description": "TALAWAKELLE TEA ESTATES PLC",
          "proName": "CSELK:TPL.N0000"
        },
        {
          "description": "WATAWALA PLANTATIONS PLC",
          "proName": "CSELK:WATA.N0000"
        },
        {
          "description": "KELANI VALLEY PLANTATIONS PLC",
          "proName": "CSELK:KVAL.N0000"
        },
        {
          "description": "KOTAGALA PLANTATIONS PLC",
          "proName": "CSELK:KOTA.N0000"
        }
      ],
      "showSymbolLogo": true,
      "colorTheme": "light",
      "isTransparent": false,
      "displayMode": "adaptive",
      "locale": "en"
    });
    const tickerTapeElement = document.getElementById('tv-ticker-tape');
    if (tickerTapeElement) {
      tickerTapeElement.appendChild(script);
    }

    this.paymentForm = new FormGroup({
      invoice_no: new FormControl('', [
        Validators.required,
      ]),
      payment_date: new FormControl('', [
        Validators.required,
      ]),
      payment_category: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [
        Validators.required,
      ]),
      payment_type: new FormControl('', [
        Validators.required
      ]),
      amount: new FormControl('', [
        Validators.required,
      ])
    });
    this.getAllFinance()
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'd MMMM yyyy');
    this.formattedDate = formattedDate;
  }

  myFilter = (d: Date | null | undefined): boolean => {
    const currentDate = new Date();
    return (d ?? currentDate).getTime() >= currentDate.getTime();
  }

  savePayment() {
    this.fiannceService.savePayment(new FinanceDTO(
      this.paymentForm.get('invoice_no')?.value,
      this.paymentForm.get('payment_date')?.value,
      this.paymentForm.get('payment_category')?.value,
      this.paymentForm.get('description')?.value,
      this.paymentForm.get('payment_type')?.value,
      this.paymentForm.get('amount')?.value,
    )).subscribe(result => {
      console.log("Income/Expense Successfully Added")
      console.log(result)
      Notiflix.Notify.success('Income/Expense Successfully Added', {
        position: 'center-bottom'
      });
      this.getAllFinance()
    }, error => {
      console.log(error)
      Notiflix.Notify.failure("Income/Expense Already Exists", {
        position: 'center-bottom'
      });
    });
  }

  getAllFinance(){
    this.allFinancesSub = this.fiannceService.getAllFinance()
      // .pipe(timeout(4000))
      .subscribe(result => {
        console.log(result)
        // this.dataSource = result.content;
        this.financeDetails = result.content;
      }, error => {
        console.log(error);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  protected readonly faWallet = faWallet;
  protected readonly faDownload = faDownload;
  protected readonly faUpload = faUpload;
  protected readonly faChartLine = faChartLine;
  protected readonly faCarrot = faCarrot;
  protected readonly faDrumstickBite = faDrumstickBite;
  protected readonly faTractor = faTractor;
  protected readonly faSeedling = faSeedling;
  protected readonly faMale = faMale;
  protected readonly faSpinner = faSpinner;

  editItem(row: any) {
    this.fiannceService.getFinanceDtail(row).subscribe(res=>{
      console.log(res)
      if (res.code == '00'){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = res.content;
        const dialogRef = this.dialog.open(EditTransactionComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          console.log("response code1")
          console.log(result)
          console.log("response code2")
          this.getAllFinance()
        });

      }else{
        // this.openFailureSnackBar();
      }

    })
  }

  deleteItem(finance_id: any) {
    this.fiannceService.deleteComponent(finance_id).subscribe(res => {
      console.log(res);
      // this.refreshTable();
    });
  }
}
