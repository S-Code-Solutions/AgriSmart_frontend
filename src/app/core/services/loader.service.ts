import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {delay, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private http: HttpClient) { }

  getProductDetails(): Observable<any> {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/posts', {
      headers:new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }).pipe(delay(2000))
  }
}
