import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {CookieService} from "ngx-cookie";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  LoginUrl = environment.baseUrl;

  constructor(private http: HttpClient,private cookieService: CookieService
  ) { }


  getTotalCount(username: string): Observable<any> {
    // let authorizationData = 'Basic ' + btoa(userName);
    let queryParams = new HttpParams();
    queryParams = queryParams.append("username",username);
    return this.http.get(this.LoginUrl+'/user/specuser/'+username, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': authorizationData
      })
    });

  }

  verifyLogin():boolean{
    return this.cookieService.hasKey('token');
  }
}
