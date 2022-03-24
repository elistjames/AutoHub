import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject, catchError} from 'rxjs';
import { User } from '../interfaces/User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8000/customer'
  private signed_in: boolean = false;
  private subject = new Subject<any>();
  validLogin: boolean = false;
  user: User = {
    email: '',
    password: '',
    f_name: '',
    l_name: '',
  };

  constructor(private http: HttpClient) { }

  getProfile(): User {
    return this.user;
  }

  verifyUser(password: string, email: string): Observable<any> {
    this.validLogin = true;
    this.subject.next(this.validLogin);
    return this.http.get<any>(this.apiUrl+'/'+password+'/'+email).pipe(catchError((error) => {
      this.validLogin = false;
      this.subject.next(this.validLogin);
      console.log("hi there");
      return error.message;
    }));
  }

  signIn(user: any): void {
    this.user.email = user.email;
    this.user.password = user.password;
    this.user.f_name = user.f_name;
    this.user.l_name = user.l_name;
    this.signed_in = true;
    this.subject.next(this.signed_in);
  }

  signOut(): void {
    this.signed_in = false;
    this.user.email = '';
    this.user.password = '';
    this.user.f_name = '';
    this.user.l_name = '';
    this.subject.next(this.signed_in);
  }

  validateLogin(): boolean {
    return this.validLogin;
  }

  authenticateUser(): Observable<any> {
    return this.subject.asObservable();
  }
}
