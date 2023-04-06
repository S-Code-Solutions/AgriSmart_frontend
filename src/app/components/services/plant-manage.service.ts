import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie";
import {PlantDTO} from "../dto/PlantDTO";
import {Observable} from "rxjs";
import {Plant_DetailDTO} from "../dto/Plant_DetailDTO";
import {CompatClient} from "@stomp/stompjs";
import {FertilizingDTO} from "../dto/FertilizingDTO";
import {HarvestingDTO} from "../dto/HarvestingDTO";
// import { SseClient } from 'ngx-sse-client';


@Injectable({
  providedIn: 'root'
})
export class PlantManageService {

  baseUrl=environment.baseUrl;

  constructor(private http: HttpClient, private cookieService:CookieService) { }

  savePlant(complaintDTO: PlantDTO): Observable<any> {
    return this.http.post<any>(this.baseUrl+'/plant/saveplant', {
      plantMethod: complaintDTO.plantMethod,
      planting_location: complaintDTO.planting_location,
      planting_density: complaintDTO.planting_density,
      seeding_rate: complaintDTO.seeding_rate,
      seeding_depth: complaintDTO.seeding_depth,
      soil_preparation: complaintDTO.soil_preparation,
      planting_date: complaintDTO.planting_date,
      water_duration: complaintDTO.water_duration,
      message: complaintDTO.message,
      crop_id: complaintDTO.crop_id
    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }

  saveFertilize(complaintDTO: FertilizingDTO): Observable<any> {
    return this.http.post<any>(this.baseUrl+'/fertilizer/savefert', {
      fertilize_name: complaintDTO.fertilize_name,
      fertilizer_type: complaintDTO.fertilizer_type,
      fertilizer_app_method: complaintDTO.fertilizer_app_method,
      fertilizer_app_fre: complaintDTO.fertilizer_app_fre,
      application_rate: complaintDTO.application_rate,
      fertilizer_placement: complaintDTO.fertilizer_placement,
      application_timing: complaintDTO.application_timing,
      fertigation: complaintDTO.fertigation,
      fertlizing_date: complaintDTO.fertlizing_date,
      message: complaintDTO.message,
      crop_id: complaintDTO.crop_id
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

  // getAllPlants(): Observable<any> {
  //   return this.http.get<any>(this.baseUrl+'/plant/getpmethods', {
  //     headers:new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
  //     })
  //   })
  // }

  saveHarvest(complaintDTO: HarvestingDTO) {
    return this.http.post<any>(this.baseUrl+'/harvest/saveharvest', {
      harvest_method: complaintDTO.harvest_method,
      harvesting_equipment: complaintDTO.harvesting_equipment,
      labor_requirement: complaintDTO.labor_requirement,
      storage_requirement: complaintDTO.storage_requirement,
      harvest_quality: complaintDTO.harvest_quality,
      harvest_cost: complaintDTO.harvest_cost,
      harvest_waste: complaintDTO.harvest_waste,
      harvesting_date: complaintDTO.harvesting_date,
      message: complaintDTO.message,
      crop_id: complaintDTO.crop_id
    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }


  getAllPlants() : Observable<any> {
    return this.http.get<any>(this.baseUrl+'/plant/getallplants', {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }

  getAllFerts() : Observable<any> {
    return this.http.get<any>(this.baseUrl+'/fertilizer/getallferts', {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }

}
