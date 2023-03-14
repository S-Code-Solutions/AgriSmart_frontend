import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApprovelDialogComponent} from "../../dialogs/approvel-dialog/approvel-dialog.component";
import {Router} from "@angular/router";
import {ApprovalDialogConfig} from "../../dialogs/model/ApprovalDialogConfig";
import {CookieService} from "ngx-cookie";
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm!: FormGroup;
  hide = true;
  error = '';

  constructor(private authenticationService:LoginService,
              private cookieService: CookieService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
    });
  }

  signIn() {
    let login=false;
    console.log("login")
    this.authenticationService.getTotalCount(this.LoginForm.get('username')?.value)
      .subscribe(res => {
        console.log()
        if (res[0].password == this.LoginForm.get('password')?.value) {
          // this.cookieService.put('token',JSON.stringify(res[0].token),{ expires: new Date(new Date().getTime() +  24000 * 60 * 60) });
          this.router.navigate(['/dashboard']);
          login= true;
        }else{
          console.log("res")
          console.log(res)
          const approval5 = this.dialog.open(ApprovelDialogComponent, {
            width: '450px',
            data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Invalid Username Or Password')
          });
          approval5.afterClosed().subscribe(approve => {
            if (approve) {
              console.log('Login Unsuccessful');
            }else{
              console.log('Login successful');
            }
          });
        }
      })
  }

  logout(){
    this.router.navigate(['/authentication']);
  }

}
