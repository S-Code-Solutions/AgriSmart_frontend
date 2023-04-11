import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {CResultComponent} from "../../crop/c-result/c-result.component";
import {DResultComponent} from "../d-result/d-result.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-d-analyse',
  templateUrl: './d-analyse.component.html',
  styleUrls: ['./d-analyse.component.scss']
})
export class DAnalyseComponent implements OnInit {
  DRForm!: FormGroup;
  fileToUpload: any;
  imageUrl!: string;
  fileName = 'Select File';

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<DAnalyseComponent>,) { }

  ngOnInit(): void {
    this.DRForm = new FormGroup({
      imageURL: new FormControl('', [
        Validators.required
      ])
    });
  }

  predictDisease() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = "res";
    dialogConfig.width = '600px';
    dialogConfig.height = 'auto';
    // console.log(row);
    console.log('----------------------------');
    const dialogRef = this.dialog.open(DResultComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log("response code1")
      console.log(result)
      console.log("response code2")
      // this.refreshTable();
    });
  }

  handleFileInput(file: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = "row";
    dialogConfig.width = '31%';
    dialogConfig.height = 'auto';
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
}
