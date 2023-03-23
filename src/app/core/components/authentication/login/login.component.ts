import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie";
import {LoginService} from "../../../services/login.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import * as Notiflix from "notiflix";
import {UserDTO} from "../../../dto/UserDTO";
import {OtpscreenComponent} from "../otpscreen/otpscreen.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  farmerForm!: FormGroup;
  LoginForm!:FormGroup;
  showAnime= false;

  constructor(private router: Router,
              private _snackBar: MatSnackBar,
              private authenticationService:LoginService,
              private cookieService: CookieService,public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.farmerForm = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
    });
    this.LoginForm = new FormGroup({
      fusername: new FormControl('', [
        Validators.required
      ]),
      femail: new FormControl('', [
        Validators.required
      ]),
      fphoneNo1: new FormControl('', [
        Validators.required
      ]),
      fpassword: new FormControl('', [
        Validators.required
      ]),
    })
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar() {
    this._snackBar.open('Wrong Credentials', 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['red-snackbar','login-snackbar']
    });
  }

  signIn() {
    this.showAnime = true
    if (this.farmerForm.valid){
      this.authenticationService.getLoggedIn(this.farmerForm.get('username')?.value,this.farmerForm.get('password')?.value)
        .subscribe((res:any) => {
          console.log(res)
          if (res.code === '00') {
            this.showAnime = false
            this.cookieService.put('token',JSON.stringify(res.content.token));
            this.cookieService.put('User', JSON.stringify(res.content.username));
            this.cookieService.put('Arr', JSON.stringify(res.content));
            this.router.navigate(['/dashboard']);
          }},error => {
          console.log(error)
          this.showAnime = false
          Notiflix.Report.failure('Error',
            '"Invalid Username Or Password"',
            'Okay');
        });
    }else {
      this.showAnime = false
      Notiflix.Report.failure('Error',
        '"Please Insert All Values Correctly"',
        'Okay');
    }
  }

  addUser(){
    this.showAnime = true
    if (this.LoginForm.valid){
      this.authenticationService.AddnewUser(new UserDTO(
        this.LoginForm.get('fpassword')?.value,
        "1",
        "",
        this.LoginForm.get('fusername')?.value,
        "",
        this.LoginForm.get('fphoneNo1')?.value,
        "",
        "",
        "",
        this.LoginForm.get('femail')?.value,
        ""
      )).subscribe(res=>{
        console.log(res)
        if (res.code == "00"){
          this.showAnime = false
          Notiflix.Report.success('Success',
            '"User Added Successful!!"',
            'Okay');
          this.clearform();
        }else{
          console.log("error")
          this.showAnime = false
          Notiflix.Report.failure('Error',
            '"Invalid Inputs Or Already registered"',
            'Okay');
        }},error => {
        console.log(error)
        this.showAnime = false
        Notiflix.Report.failure('Error',
          '"Invalid Inputs Or Already registered"',
          'Okay');
      });
    }else {
      this.showAnime = false
      Notiflix.Report.failure('Error',
        '"Please Insert All Values Correctly"',
        'Okay');
    }

  }

  clearform(){
    this.LoginForm.setValue({
      password:'',
      username:'',
      phoneNo1 :'',
      email:'',
    })
  }


  sendOTP(){
    this.showAnime = true
    this.authenticationService.SendOTP(this.LoginForm.get('femail')?.value)
      .subscribe((result:any) => {
        if (result.code == '00'){
          this.showAnime = false
          this.getOTP();
          console.log("This is result")
          console.log(result)
        }else{
          this.showAnime = false
          console.log("This is error")
        }
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OtpscreenComponent, {
      data: this.results,
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result){
      console.log('The dialog was closed');
      this.addUser()
      console.log(result)
      // }else{
      //   this.openFailureSnackBar()
      // }

    });
  }

  results:any

  getOTP(){
    this.showAnime = true
    this.authenticationService.GetOTP(this.LoginForm.get('femail')?.value)
      .subscribe((result:any) => {
        if (result.code == '00'){
          this.showAnime = false
          this.results = result
          this.openDialog();
          console.log("This is getOTP")
          console.log(result)
        }else{
          this.showAnime = false
          console.log("This is getOTP fail")
        }
      });
  }


}
