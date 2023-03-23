import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {CookieService} from "ngx-cookie";
import {Observable} from "rxjs";
import {UserDTO} from "../dto/UserDTO";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  Url = environment.baseUrl+'/user';

  constructor(private cookieService: CookieService, private http: HttpClient) { }

  verifyLogin():boolean{
    return this.cookieService.hasKey('token');
  }

  getFiles(value : string| number): Observable<any> {
    return this.http.get<any>(this.Url+'/farmer/search/'+value, {
      headers:new HttpHeaders({

      })
    })
  }

  getLoggedIn(username: any, password: any) {
    let authorizationData = 'Basic '+btoa(username + ':' + password);
    // console.log(username + ':' + password)
    return this.http.post(this.Url+'/auth/authenticate', { username, password },{
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': authorizationData
      })
    });
  }

  SendOTP(email: any) {
    return this.http.post(this.Url+'/sendOTP', {  },{
      params:new HttpParams().set('email',email),
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': authorizationData
      })
    });
  }

  GetOTP(email: any) {
    return this.http.post(this.Url+'/getOTP', {  },{
      params:new HttpParams().set('email',email),
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': authorizationData
      })
    });
  }


  AddnewUser(farmerDTO: UserDTO): Observable<any> {
    return this.http.post(this.Url+'/register', {
      password: farmerDTO.password,
      roleCode: farmerDTO.roleCode,
      address: farmerDTO.address,
      username: farmerDTO.username,
      status: farmerDTO.status,
      phoneNo1: farmerDTO.phoneNo1,
      phoneNo2: farmerDTO.phoneNo2,
      idPhoto: farmerDTO.idPhoto,
      remarks: farmerDTO.remarks,
      email: farmerDTO.email,
      name: farmerDTO.name,
      headers:new HttpHeaders({
        'Content-Type':  'application/json'
        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }
}
