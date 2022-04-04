import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/User';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  hidePassword = true;
  editMode = false;
  deleteMode = false;

  unhashedPassword = '';
  unhashedEmail = '';

  newPassword: string = '';
  newFirst: string = '';
  newLast: string = '';

  user: User = {
    email: '',
    password: '',
    f_name: '',
    l_name: ''
  };

  tmp_user: User = {
    email: '',
    password: '',
    f_name: 'Eli',
    l_name: 'St. James'
  };



  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.getProfile();
    this.unhashedEmail = this.authService.getUnHashedEmail();
    this.unhashedPassword = this.authService.getUnHashedPassword();
  }

  updateAccount(): void{
    this.editMode = !this.editMode;
    let updated:User = {
      l_name: this.user.l_name,
      f_name: this.user.f_name,
      email: this.user.email,
      password: this.user.password
    }
    if(this.newPassword?.replace(/\s/g, "") != ''){
      updated.password = this.newPassword;
    }
    if(this.newFirst?.replace(/\s/g, "") != ''){
      updated.f_name = this.newFirst;
    }
    if(this.newLast?.replace(/\s/g, "") != ''){
      updated.l_name = this.newLast;
    }
    this.authService.updateUser(updated).subscribe((user) => {
      this.user = user;
    })
    // call employeeService to send PUT request to api with the new account details
    // call authService to put new account details
  }

  deleteAccount(): void {
    // delete current account
    //authService deleteAccount;

    this.authService.deleteAccount(this.user.email, this.user.password).subscribe(() => {});
    this.router.navigate(['/']);

  }

}
