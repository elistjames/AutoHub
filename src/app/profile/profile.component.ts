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

  newUsername?: string;
  newPassword?: string;
  newFirst?: string;
  newLast?: string;

  user: User = {
    email: '',
    password: '',
    f_name: '',
    l_name: ''
  };

  tmp_user: User = {
    email: 'test@gmail.com',
    password: 'thisIsATestPassword',
    f_name: 'Eli',
    l_name: 'St. James'
  };



  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    //this.user = this.authService.getProfile();
  }

  updateAccount(): void{
    this.editMode = !this.editMode;

    // call authService to put new account details
  }

  deleteAccount(): void {
    // delete current account
    //authService deleteAccount;
    this.router.navigate(['/']);

  }

}
