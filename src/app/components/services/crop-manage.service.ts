import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {CropDTO} from "../dto/CropDTO";
import {CookieService} from "ngx-cookie";
import {PlantingDTO} from "../dto/PlantingDTO";
import {PlantDTO} from "../dto/PlantDTO";
import {Plant_DetailDTO} from "../dto/Plant_DetailDTO";

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
      crop_status: complaintDTO.crop_status
    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }


}
