import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { Vehicle } from '../interfaces/Vehicle';
import { Filter } from '../interfaces/ContentFilter';


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

  vehicleFilter: Filter = {
    categoryFilter: "all",
    colorFilter: ['all'],
    priceRanges: [{min: 0, max: 100000}],
    make: '',
    minYear: (new Date().getFullYear()-30),
    maxYear: new Date().getFullYear(),
    seats: 0,
    parts: false
  };

  getFilters(): Filter { return this.vehicleFilter; }

  setFilter(newFilter: Filter){this.vehicleFilter = newFilter;}

  allVehicles: Vehicle[] = [];

  constructor(private http: HttpClient) {}

  verifyPlateNumber(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);

  }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl)
  }


  postVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehicle);
  }

}
