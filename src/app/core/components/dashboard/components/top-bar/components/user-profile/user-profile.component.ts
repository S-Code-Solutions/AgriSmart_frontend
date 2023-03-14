import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private cookieService: CookieService,
              private router: Router,) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.cookieService.remove('token');
    this.router.navigate(['/authentication']);
  }

}
