import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CRecommendComponent} from "./crop/c-recommend/c-recommend.component";
import {FRecommendComponent} from "./fertilizer/f-recommend/f-recommend.component";
import {faCogs} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-predict-anly',
  templateUrl: './predict-anly.component.html',
  styleUrls: ['./predict-anly.component.scss']
})
export class PredictAnlyComponent implements OnInit {

  faCogs = faCogs;

  constructor(public dialog: MatDialog) { }

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

}
