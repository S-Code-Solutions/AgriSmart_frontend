import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {CropsDTO} from "../dto/CropsDTO";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CRecommendService {

  Url = environment.baseUrl;


  constructor(private http: HttpClient) { }

  getCropData(cropDTO: CropsDTO):Observable<any>  {
    return this.http.post(this.Url+'/predict_crop', {
      N: cropDTO.N,
      P: cropDTO.P,
      K: cropDTO.K,
      temperature: cropDTO.temperature,
      humidity: cropDTO.humidity,
      ph: cropDTO.ph,
      rainfall: cropDTO.rainfall,
      headers:new HttpHeaders({

      })
    })
  }
}
