import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {VehicleViewComponent} from "../vehicle-view/vehicle-view.component";
import {Vehicle} from '../interfaces/Vehicle';
import { VehiclesService } from '../services/vehicles.service';
import { ContentComponent } from '../content/content.component';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  @Input() vehicleCard: Vehicle = {
    plateNum: '',
    numSeats: 0,
    category: '',
    weight: 0,
    topSpeed: 0,
    colour: '',
    make: '',
    price: 0,
    year: 0,
    image: '',
    depNum: 0
  };
  @Input() employee: boolean = false;

  editMode: boolean = false;
  markAsSold: boolean = false;

  newPrice!: number;
  newMake!: string;
  
  signed_in = false;

  filledMessage = false;

  constructor(public dialog: MatDialog, private content: ContentComponent, private vehicleService: VehiclesService, private authService: AuthenticationService) {

  }

  ngOnInit(): void {
    this.signed_in = this.authService.signedIn();
    console.log(this.signed_in);
    this.newPrice = this.vehicleCard.price;
    this.newMake = this.vehicleCard.make;
  }

  openVehicle(): void {
    const dialogRef = this.dialog.open(VehicleViewComponent, {
      width: '600px',
      data: this.vehicleCard,
    });
  }

  allFilled(): boolean{
    
    if(this.newPrice == 0 || this.newPrice == null|| this.newPrice > 100000){return false;}
    if(this.newMake == ''){return false;}
    return true;
  }

  updateVehicle(): void {
    this.filledMessage = false;
    this.editMode = false;

    this.vehicleCard.make = this.newMake;
    this.vehicleCard.price = this.newPrice;
    // update vehicle to api

    this.vehicleService.updateVehicle(this.vehicleCard).subscribe((vehicle) => {
      this.vehicleCard = vehicle as Vehicle ;
      return;
    });
  }

  

  markVehicle(){
    this.content.markVehicle(this.vehicleCard.plateNum);
    this.markAsSold = false;
  }
}
