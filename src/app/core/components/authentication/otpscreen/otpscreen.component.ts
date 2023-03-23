import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-otpscreen',
  templateUrl: './otpscreen.component.html',
  styleUrls: ['./otpscreen.component.scss']
})
export class OtpscreenComponent implements OnInit {

  searchText: any;
  incomeData!:number
  constructor(public dialogRef: MatDialogRef<OtpscreenComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log("This Is OTPScreenComponent")
    console.log(this.data)
    this.incomeData = this.data.content
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
