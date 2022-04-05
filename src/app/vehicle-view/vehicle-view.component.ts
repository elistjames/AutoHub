import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {Vehicle} from '../interfaces/Vehicle';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.css']
})
export class VehicleViewComponent implements OnInit {
  signed_in?:boolean
  subscription!: Subscription;
  signInMessage = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Vehicle,
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.subscription = this.authService.authenticateUser().subscribe((value) => (this.signed_in = value));
  }

  bookTestDrive(){

    // TODO: Make Book Test drive functionality
    if(this.signed_in){

    }
    else{
      this.signInMessage = true;

      
    }
  }

}
