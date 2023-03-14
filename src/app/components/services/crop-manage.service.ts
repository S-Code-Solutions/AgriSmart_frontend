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
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXNpbmR1Iiwicm9sZSI6IjEiLCJleHAiOjE2Nzg3NTIzMjQsImlhdCI6MTY3ODczNDMyNH0.Pl2pt80MdrLe_BAsNfvOl7WcH2_X-IL5pdz4h-QgTDdb-sU5k8CRVXpPBkEcCNdauhTGlwQ-a3yv0LxbWsue6Q'
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
    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXNpbmR1Iiwicm9sZSI6IjEiLCJleHAiOjE2Nzg3NTIzMjQsImlhdCI6MTY3ODczNDMyNH0.Pl2pt80MdrLe_BAsNfvOl7WcH2_X-IL5pdz4h-QgTDdb-sU5k8CRVXpPBkEcCNdauhTGlwQ-a3yv0LxbWsue6Q'
      })
    })
  }
}
