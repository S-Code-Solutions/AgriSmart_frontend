import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {CropDTO} from "../dto/CropDTO";
import {CookieService} from "ngx-cookie";


@Injectable({
  providedIn: 'root'
})
export class CropManageService {

  baseUrl=environment.baseUrl+'/crop';

  constructor(private http: HttpClient, private cookieService:CookieService) { }

  users() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getAllCrops(): Observable<any> {
    return this.http.get<any>(this.baseUrl+'/getall', {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }

  saveCrop(complaintDTO: CropDTO): Observable<any> {
    return this.http.post<any>(this.baseUrl+'/savecrop', {
      crop_name: complaintDTO.crop_name,
      crop_variety: complaintDTO.crop_variety,
      imageURL: complaintDTO.imageURL,
      crop_status: complaintDTO.crop_status
    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }

  saveImg(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.baseUrl+'/upload', {
      formData
    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }

  getImg(): Observable<any> {
    return this.http.get<any>(this.baseUrl+'/files', {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }

  saveImage(files: any) {
    const formData = new FormData();
    formData.append('files', files); // Append only the first file
    return this.http.post<any>(
      this.baseUrl + '/uploadProductImage',
      formData,
      {
        params: new HttpParams().set('formData', 'true'), // Use HttpParams to set the formData parameter
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + JSON.parse(this.cookieService.get('token')),
        }),
      }
    );
  }

  searchComponent(searchKeyWord: any): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("name",searchKeyWord);
    return this.http.get(this.baseUrl+'/getCrop', {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + JSON.parse(<string>this.cookieService.get('token'))
      }),
      params:queryParams,
    });
  }


}
