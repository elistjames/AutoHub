import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { NavbarComponent} from "../navbar/navbar.component";
import { SignInDialogComponent } from '../sign-in-dialog/sign-in-dialog.component';
//import {AuthenticationService} from '../services/authentication.service';
//import {Subscription} from "rxjs"



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email : string = '';
  password : string = '';
  //subscription!: Subscription;


  constructor(public dialog: MatDialog, public app: NavbarComponent){

  }

  openDialog() {
    const dialogRef = this.dialog.open(SignInDialogComponent, {
      width: '300px',
      data: {email: '', password: '', employeeMode: false},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result.email != ''){
        console.log("user clicked sign in")
        if(result.employeeMode){
          this.email = result.email;
          this.password = result.password;
        }
        else{
          const currentUser = {
            email: this.email,
            password: this.password,
            firstName: '',
            lastName: '',
          }

          //verify user

          //sign user in
          this.app.signIn(currentUser);

          //reset form
          this.email = "";
          this.password = "";
        }
      }
      else{
        console.log("canceled sign in")
      }

    });
  }

  ngOnInit(): void {}



}
