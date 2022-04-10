import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, Subject} from 'rxjs';
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
  private apiUrl = 'http://localhost:8000/employee'
  private signed_in: boolean = false;
  private subject = new Subject<any>();
  validLogin: boolean = false;
  emailAvailable: boolean = false;

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

  signedIn(): boolean { return this.signed_in;}

  getEmployeeProfile(): Employee {
    return this.employee;
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl + '/all/all')
  }

  verifyEmployee(password: string, email: string): Observable<any> {
    console.log('ApiURL is: '+ this.apiUrl + password);
    this.validLogin = true;
    this.subject.next(this.validLogin);
    return this.http.get<any>(this.apiUrl+'/'+password+'/'+email).pipe(catchError((error) => {
      this.validLogin = false;
      this.subject.next(this.validLogin);
      console.log("hi there");
      return error.message;
    }));
  }

  createEmployee(employee: Employee): Observable<any>{
    this.emailAvailable = true;
    
    return this.http.post<any>(this.apiUrl+'/'+employee.password+'/'+employee.email, employee).pipe(catchError((error) => {
      this.emailAvailable = false;
      console.log("Email taken");
      return error.message;
    }));
  }

  deleteEmployee(email?:string, password?:string): Observable<Employee[]>{
    return this.http.delete<Employee[]>(this.apiUrl+'/'+password+'/'+email)
  }

  updateEmployee(emp: any): Observable<any>{
    let updated = {
      ssn: emp?.ssn,
      l_name: emp?.l_name,
      f_name: emp?.f_name,
      password: emp?.password,
      depNum: emp?.depNum,
      isManager: true
    }
    return this.http.put<any>(this.apiUrl+'/'+emp?.password+'/'+emp?.email, updated);
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
    this.employee.ssn = 0;
    this.employee.email = '';
    this.employee.password = '';
    this.employee.l_name = '';
    this.employee.f_name = '';
    this.employee.depNum = 2;
    this.employee.isManager = false;
    this.signed_in = false;
    this.subject.next(this.signed_in);
  }

  validateLogin(): boolean {
    return this.validLogin;
  }

  authenticateEmployee(): Observable<any> {
    return this.subject.asObservable();
  }

  validateEmail(): boolean {
    return this.emailAvailable;
  }
}
