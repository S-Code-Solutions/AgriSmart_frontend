import { Component, OnInit } from '@angular/core';
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
// import chart from 'chart.js';

export interface PeriodicElement {
  Transaction: string;
  Amount: number;
  DateandTime: string;
  Status: string;
  Action: any;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {Transaction: 'Transcation-1', Amount: 1000, DateandTime: '2024-04-24', Status: 'Expense', Action:''},
  {Transaction: 'Transcation-2', Amount: 2000, DateandTime: '2024-04-24', Status: 'Income', Action:''},
  {Transaction: 'Transcation-3', Amount: 3000, DateandTime: '2024-04-24', Status: 'Pending', Action:''},
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
  displayedColumns: string[] = ['Transaction', 'Amount', 'DateandTime', 'Status','Action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols":[
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
      invoice_number: new FormControl('', [
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
  }

  myFilter = (d: Date | null | undefined): boolean => {
    const currentDate = new Date();
    return (d ?? currentDate).getTime() >= currentDate.getTime();
  }

  savePayment() {

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
}
