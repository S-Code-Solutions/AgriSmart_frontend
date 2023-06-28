import { Component, OnInit } from '@angular/core';
import {
    faCarrot, faDownload,
    faDrumstickBite,
    faHandsHelping,
    faMale,
    faSeedling, faSpinner,
    faTractor, faUpload
} from '@fortawesome/free-solid-svg-icons';
import {MatTableDataSource} from "@angular/material/table";
import * as Notiflix from "notiflix";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DAnalyseComponent} from "../predict-anly/disease/d-analyse/d-analyse.component";
import {EditComponent} from "./components/edit/edit.component";

export interface PeriodicElement {
  orderid: string;
  cus_name: string;
  desc: string;
  ord_date: string;
  ord_amount: number;
  status: any;
  Action: any;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {orderid: 'Ord-1',cus_name:'Nimal', desc: '50kg Maize', ord_date: '2024-04-12',ord_amount:10000, status: 'Ongoing', Action:''},
  {orderid: 'Ord-2',cus_name:'Kamal', desc: '150kg Corn', ord_date: '2024-04-12',ord_amount:15000, status: 'Completed', Action:''},
  {orderid: 'Ord-3',cus_name:'Wimal', desc: '200kg Rice', ord_date: '2024-04-14',ord_amount:20500, status: 'Completed', Action:''},
  {orderid: 'Ord-4',cus_name:'Nimal', desc: '250kg Maize', ord_date: '2024-04-14',ord_amount:10000, status: 'Completed', Action:''},
  {orderid: 'Ord-5',cus_name:'Kamal', desc: '350kg Corn', ord_date: '2024-04-15',ord_amount:15500, status: 'Pending', Action:''},
  {orderid: 'Ord-6',cus_name:'Wimal', desc: '400kg Rice', ord_date: '2024-04-16',ord_amount:21000, status: 'Completed', Action:''},
  {orderid: 'Ord-7',cus_name:'Wimal', desc: '500kg Rice', ord_date: '2024-04-20',ord_amount:34000, status: 'Pending', Action:''},
  {orderid: 'Ord-8',cus_name:'Wimal', desc: '200kg Rice', ord_date: '2024-04-20',ord_amount:22000, status: 'Pending', Action:''},
  {orderid: 'Ord-9',cus_name:'Wimal', desc: '200kg Rice', ord_date: '2024-04-20',ord_amount:25000, status: 'Ongoing', Action:''},
];

@Component({
  selector: 'app-colab-fn-c',
  templateUrl: './colab-fn-c.component.html',
  styleUrls: ['./colab-fn-c.component.scss']
})
export class ColabFnCComponent implements OnInit {

  protected readonly faTractor = faTractor;
  protected readonly faSeedling = faSeedling;
  protected readonly faMale = faMale;
  protected readonly faDrumstickBite = faDrumstickBite;
  protected readonly faCarrot = faCarrot;
  protected readonly faDownload = faDownload;
  protected readonly faSpinner = faSpinner;
  protected readonly faUpload = faUpload;
  faHandsHelping = faHandsHelping;

  displayedColumns: string[] = ['orderid','cus_name', 'desc', 'ord_date', 'ord_amount','status','Action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  myFilter = (d: Date | null | undefined): boolean => {
    const currentDate = new Date();
    return (d ?? currentDate).getTime() >= currentDate.getTime();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteItem() {
    Notiflix.Confirm.show(
      'Delete Item',
      'Do you Want to Delete This Item?',
      'Yes',
      'No',
      () => {
        alert('Item Deleted.');
      },
      () => {
        alert('Item Not Deleted...');
      },
      {
        titleColor:"#e74c3c",
        messageColor:"#e74c3c",
        okButtonColor:"white",
        okButtonBackground:"#e74c3c",
        cancelButtonColor:"white",
        cancelButtonBackground:"#2ecc71"
      },
    );
  }

  updateItem() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = "row";
    dialogConfig.width = '60%';
    dialogConfig.height = 'auto';
    // console.log(row);
    console.log('----------------------------');
    const dialogRef = this.dialog.open(EditComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log("response code1")
      console.log(result)
      console.log("response code2")
      // this.refreshTable();
    });
  }
}
