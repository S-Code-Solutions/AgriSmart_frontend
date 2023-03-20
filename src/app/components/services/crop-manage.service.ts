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
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXNpbmR1Iiwicm9sZSI6IjEiLCJleHAiOjE2Nzg4MzMyNjksImlhdCI6MTY3ODgxNTI2OX0.xAG_xbh9O7RUExv-HY2qOp1I9CF_uI4TohoMm_8jmtthz-ciSMmb8krKOYy1INUYrYb07K70edIATZJVBOBToA'
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
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1ZGFyYSIsInJvbGUiOiIxIiwiZXhwIjoxNjc5MzIzMDUxLCJpYXQiOjE2NzkzMDUwNTF9.spaooXUTDImFBellNyl9kyvwNU7nnkUVI8cQYcYjJf0pGuwuvTSBejbFm-OuLi_NMq7ClMnhX87kVjzH8pnghQ'
      })
    })
  }

  savePlant(complaintDTO: PlantDTO): Observable<any> {
    return this.http.post<any>(this.baseUrl+'/saveplant', {
      plantMethod: complaintDTO.plantMethod,
      MethodDesc: complaintDTO.MethodDesc,
    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXNpbmR1Iiwicm9sZSI6IjEiLCJleHAiOjE2Nzg4MzMyNjksImlhdCI6MTY3ODgxNTI2OX0.xAG_xbh9O7RUExv-HY2qOp1I9CF_uI4TohoMm_8jmtthz-ciSMmb8krKOYy1INUYrYb07K70edIATZJVBOBToA'
      })
    })
  }

  savePlantDetails(complaintDTO: Plant_DetailDTO): Observable<any> {
    return this.http.post<any>(this.baseUrl+'/saveplantdtail', {
      plantMethod: complaintDTO.plantMethod,
      planting_location: complaintDTO.planting_location,
      planting_density: complaintDTO.planting_density,
      seeding_rate: complaintDTO.seeding_rate,
      seeding_depth: complaintDTO.seeding_depth,
      soil_preparation: complaintDTO.soil_preparation,
      planting_date: complaintDTO.planting_date,
      water_duration: complaintDTO.water_duration,
      message: complaintDTO.message,
      crop_id: complaintDTO.crop_id,
    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXNpbmR1Iiwicm9sZSI6IjEiLCJleHAiOjE2Nzg4MzMyNjksImlhdCI6MTY3ODgxNTI2OX0.xAG_xbh9O7RUExv-HY2qOp1I9CF_uI4TohoMm_8jmtthz-ciSMmb8krKOYy1INUYrYb07K70edIATZJVBOBToA'
      })
    })
  }
}
