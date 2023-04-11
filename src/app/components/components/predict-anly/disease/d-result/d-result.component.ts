import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-d-result',
  templateUrl: './d-result.component.html',
  styleUrls: ['./d-result.component.scss']
})
export class DResultComponent implements OnInit {

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<DResultComponent>,) { }

  ngOnInit(): void {
  }

}
