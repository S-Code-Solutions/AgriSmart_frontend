import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie";
import {PlantDTO} from "../dto/PlantDTO";
import {Observable} from "rxjs";
import {Plant_DetailDTO} from "../dto/Plant_DetailDTO";
import {CompatClient} from "@stomp/stompjs";
// import { SseClient } from 'ngx-sse-client';


@Injectable({
  providedIn: 'root'
})
export class PlantManageService {

  baseUrl=environment.baseUrl+'/plant';

  constructor(private http: HttpClient, private cookieService:CookieService) { }

  savePlant(complaintDTO: PlantDTO): Observable<any> {
    return this.http.post<any>(this.baseUrl+'/saveplant', {
      plantMethod: complaintDTO.plantMethod,
      MethodDesc: complaintDTO.MethodDesc,
    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
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
        'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }


  sendNotify(stompClient: CompatClient){
    // return stompClient.send('/app/sendmsg', {}, JSON.stringify(msg));

    stompClient.send('/app/sendmsg', {}, JSON.parse(this.cookieService.get('token')));
  }

  getAllPlants(): Observable<any> {
    return this.http.get<any>(this.baseUrl+'/getpmethods', {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }
}
