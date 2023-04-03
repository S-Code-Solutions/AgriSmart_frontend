import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PredictAnlyService {

  constructor(private http: HttpClient) { }

  getClimatedata(value: any):Observable<any>  {
    return this.http.post('http://api.weatherapi.com/v1/current.json?key=59a2ab65a150489db6c122100230304&q='+value+'&aqi=yes', {
      headers:new HttpHeaders({

      })
    })
  }


  getLangtdata(value: any):Observable<any>  {
    return this.http.post('https://nominatim.openstreetmap.org/search?q='+value+', Sri Lanka&format=json', {
      headers:new HttpHeaders({

      })
    })
  }


  getSoiltdata(lat:any,lon:any):Observable<any>  {
    return this.http.get('https://rest.isric.org/soilgrids/v2.0/properties/query?lon='+lon+'&lat='+lat+'&property=nitrogen&property=phh2o&depth=15-30cm&value=Q0.5', {
      headers:new HttpHeaders({

      })
    })
  }

}
