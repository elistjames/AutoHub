import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { Vehicle } from '../interfaces/Vehicle';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private apiUrl = 'http://localhost:8000/vehicle/'

  allVehicles: Vehicle[] = [];

  constructor(private http: HttpClient) {}

  verifyPlateNumber(plateNum: string): boolean {
    //this.allVehicles = this.http.get<Vehicle[]>(this.apiUrl);

    let tmp = true;
    if(tmp){
      return true;
    }
    return true;
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl)
  }


  postVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehicle);
  }

}
