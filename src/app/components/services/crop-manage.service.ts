import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXNpbmR1Iiwicm9sZSI6IjEiLCJleHAiOjE2Nzg4MzMyNjksImlhdCI6MTY3ODgxNTI2OX0.xAG_xbh9O7RUExv-HY2qOp1I9CF_uI4TohoMm_8jmtthz-ciSMmb8krKOYy1INUYrYb07K70edIATZJVBOBToA'
      })
    })
  }

  saveCrop(complaintDTO: CropDTO): Observable<any> {
    return this.http.post<any>(this.baseUrl+'/savecrop', {
      crop_name: complaintDTO.crop_name,
      crop_variety: complaintDTO.crop_variety,
      planting_date: complaintDTO.planting_date,
      harvest_date: complaintDTO.harvest_date,
      expected_yield: complaintDTO.expected_yield,
      soil_type: complaintDTO.soil_type,
      fertilizer_control: complaintDTO.fertilizer_control,
      pesticide_type: complaintDTO.pesticide_type,
      crop_status: complaintDTO.crop_status,
      cost: complaintDTO.cost,
      location: complaintDTO.location,
    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXNpbmR1Iiwicm9sZSI6IjEiLCJleHAiOjE2Nzg4MzMyNjksImlhdCI6MTY3ODgxNTI2OX0.xAG_xbh9O7RUExv-HY2qOp1I9CF_uI4TohoMm_8jmtthz-ciSMmb8krKOYy1INUYrYb07K70edIATZJVBOBToA'
      })
    })
  }
}
