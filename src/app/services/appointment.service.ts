import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject, catchError} from 'rxjs';
import {Appointment} from '../interfaces/Appointment'
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8000/appointment/';
  preExistingAppointment: boolean = false;

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  postAppointment(appointment: Appointment): Observable<any> {
    return this.http.post<any>(this.apiUrl, appointment).pipe(catchError((error) => {
      this.preExistingAppointment = true;
      return error.message;
    }));
  }

  updateAppointment(appointment: Appointment): Observable<any> {
    return this.http.put<any>(this.apiUrl, appointment);
  }

  alreadyHasAppointment(): boolean {
    return this.preExistingAppointment;
  }
}
