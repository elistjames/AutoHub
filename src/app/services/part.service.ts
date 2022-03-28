import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Part} from '../interfaces/Part'

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

  constructor(private http: HttpClient) {}

  
}
