import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
/**
 * sevice for user and garages related api request
 */
@Injectable({
  providedIn: 'root'
})


export class GarageService {
  private apiURL = 'http://localhost:3000/api/v1';

  constructor(private http:HttpClient) { }

  getSavedGarages():  Observable<any> {
    return this.http.get<any>(`${this.apiURL}/user/garages`,{withCredentials:true});
  }

  getGlobalGarages() :Observable<any> {
    return this.http.get<any>(`${this.apiURL}/global-garages?limit=30`,{withCredentials:true});
  }
  addGarages(garages: any[]): Observable<any> {
    return this.http.post(`${this.apiURL}/user/garages`, { garages }, { withCredentials: true });
  }
}
