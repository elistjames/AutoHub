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
  validLogin: boolean = false;

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
    this.validLogin = true;
    this.subject.next(this.validLogin);
    return this.http.get<any>(this.apiUrl+password).pipe(catchError((error) => {
      this.validLogin = false;
      this.subject.next(this.validLogin);
      console.log("hi there");
      return error.message;
    }));
  }

  signIn(employee: any): void {
    this.employee.ssn = employee.ssn;
    this.employee.email = employee.email;
    this.employee.password = employee.password;
    this.employee.l_name = employee.l_name;
    this.employee.f_name = employee.f_name;
    this.employee.depNum = employee.depNum;
    this.employee.isManager = employee.isManager;
    this.signed_in = true;
    this.subject.next(this.signed_in);
  }

  signOut(): void {
    this.signed_in = false;
    this.employee.email = '';
    this.employee.password = '';
    this.subject.next(this.signed_in);
  }

  validateLogin(): boolean {
    return this.validLogin;
  }

  authenticateEmployee(): Observable<any> {
    return this.subject.asObservable();
  }
}
