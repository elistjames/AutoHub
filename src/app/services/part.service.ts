import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Part} from '../interfaces/Part'
import { Filter } from '../interfaces/ContentFilter';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class PartService {
  private apiUrl = 'http://localhost:8000/part/';

  partFilter: Filter = {
    categoryFilter: "all",
    colorFilter: ['all'],
    priceRanges: [{min: 0, max: 100000}],
    make: '',
    minYear: (new Date().getFullYear()-30),
    maxYear: new Date().getFullYear(),
    seats: 0,
    parts: true
  };

  constructor(private http: HttpClient) {}

  getFilters(): Filter { return this.partFilter; }

  setFilter(newFilter: Filter){this.partFilter = newFilter;}

  getParts(): Observable<Part[]> {
    return this.http.get<Part[]>(this.apiUrl+'get');
  }

  postPart(part: Part): Observable<Part>{
    return this.http.post<Part>(this.apiUrl+'post', part)
  }

  verifyPartNumber(): Observable<Part[]> {
    return this.http.get<Part[]>(this.apiUrl+'verify');

  }

  updatePart(part: Part): Observable<any>{
    let updated = {
      qty: part.qty,
      supplierID: part.supplierID
    }
    return this.http.put<any>(this.apiUrl+part.partNo, updated)
  }

  deletePart(partNo?: string): Observable<any>{
    return this.http.delete<any>(this.apiUrl+partNo);
  }

  
}
