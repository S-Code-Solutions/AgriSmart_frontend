import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {FertDTO} from "../dto/FertDTO";

@Injectable({
  providedIn: 'root'
})
export class FRecommendService {

  Url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getFertData(fertDTO: FertDTO):Observable<any>  {
    return this.http.post(this.Url+'/predict_fertilizer', {
      Nitrogen: fertDTO.Nitrogen,
      Phosphorous: fertDTO.Phosphorous,
      Potassium: fertDTO.Potassium,
      Temparature: fertDTO.Temparature,
      Humidity: fertDTO.Humidity,
      Moisture: fertDTO.Moisture,
      soil_type: fertDTO.soil_type,
      crop_type: fertDTO.crop_type,
      headers:new HttpHeaders({

      })
    })
  }
}
