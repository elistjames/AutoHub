import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, Subject, of, throwError, EMPTY} from 'rxjs';
import {AppComponent} from '../app.component';
import { Employee } from '../interfaces/Employee';

const httpOptions = {
  headers: new HttpHeaders({
    'responseType': 'text',
  })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5000/employee/'
  private signed_in: boolean = false;
  private subject = new Subject<any>();

  employee: Employee = {
    ssn: 0,
    l_name: '',
    f_name: '',
    email: '',
    password: '',
    depNum: 2,
    isManager: false
  }

  constructor(private http: HttpClient) { }

  getEmployeeProfile(): Employee {
    return this.employee;
  }

  verifyEmployee(password: string): Observable<any> {
    console.log('ApiURL is: '+ this.apiUrl + password);
    return this.http.get<any>(this.apiUrl+password).pipe(catchError((err:HttpErrorResponse) => {
      console.error(err);
      return EMPTY
    }));
  }

  signIn(employee: any): void {
    this.employee.email = employee.email;
    this.employee.password = employee.password;
    this.signed_in = true;
    this.subject.next(this.signed_in);
  }

  signOut(): void {
    this.signed_in = false;
    this.employee.email = '';
    this.employee.password = '';
    this.subject.next(this.signed_in);
  }

  authenticateEmployee(): Observable<any> {
    return this.subject.asObservable();
  }
}
