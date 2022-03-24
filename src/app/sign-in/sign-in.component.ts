import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { NavbarComponent} from "../navbar/navbar.component";
import { SignInDialogComponent } from '../sign-in-dialog/sign-in-dialog.component';
import {AuthenticationService} from '../services/authentication.service';
import {EmployeeService} from '../services/employee.service';
import { Subscription, take } from 'rxjs';
import {Employee} from '../interfaces/Employee';
import { Router } from '@angular/router';
import { User } from '../interfaces/User';
//import {Subscription} from "rxjs"



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email : string = '';
  password : string = '';
  subscription!: Subscription;
  validLogin : boolean = true;



  constructor(public dialog: MatDialog, 
    public app: NavbarComponent, 
    public authService: AuthenticationService, 
    public empService: EmployeeService,
    public router: Router){

  }

  openDialog() {
    const dialogRef = this.dialog.open(SignInDialogComponent, {
      width: '300px',
      data: {email: '', password: '', employeeMode: false, validLogin: this.validLogin},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result.email != ''){
        console.log("user clicked sign in")
        if(result.employeeMode){
          this.email = result.email;
          this.password = result.password;

          // verify employee login
          this.empService.verifyEmployee(this.password, this.email).pipe(
            take(1),
          ).subscribe((response) => {
            console.log("cool")
            this.validLogin = this.empService.validateLogin();
            if(this.validLogin){
              console.log("Signed In");
              const currentEmployee: Employee = {
                ssn: response.ssn,
                l_name: response.l_name,
                f_name: response.f_name,
                email: response.email,
                password: response.password,
                depNum: response.depNum,
                isManager: response.isManager
              }

              this.empService.signIn(currentEmployee);
              
              this.router.navigate(['/employee-page']);
            }
            else{
              console.log('invalidLogin');

              this.openDialog();
            }
          })
        }
        else{
          this.email = result.email;
          this.password = result.password;

          // verify employee login
          this.authService.verifyUser(this.password, this.email).pipe(
            take(1),
          ).subscribe((response) => {
            console.log("cool")
            this.validLogin = this.authService.validateLogin();
            if(this.validLogin){
              console.log("Signed In");
              const currentUser: User = {
                email: result.email,
                password: result.password,
                f_name: result.f_name,
                l_name: result.l_name
              }

              this.authService.signIn(currentUser);
              
              this.router.navigate(['/loading-page']);
            }
            else{
              console.log('invalidLogin');

              this.openDialog();
            }
          });
          this.email = "";
          this.password = "";
        }
      }
      else{
        console.log("canceled sign in")
      }

    });
  }

  ngOnInit(): void {
    //this.subscription = this.empService.authenticateEmployee().subscribe((value) => (this.validLogin = value));
  }

}
