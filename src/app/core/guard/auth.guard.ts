import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from "../services/login.service";
import * as Notiflix from "notiflix";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authenticationService:LoginService,
              private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authenticationService.verifyLogin()){
      return true;
    }
    Notiflix.Report.failure('Error',
      '"Login not verfied"',
      'Okay');
    this.router.navigate(['/login']);
    return true;
  }

}
