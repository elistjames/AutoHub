import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {VehicleViewComponent} from "../vehicle-view/vehicle-view.component";
import {Vehicle} from '../interfaces/Vehicle';
import { VehiclesService } from '../services/vehicles.service';


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

  filledMessage = false;

  constructor(public dialog: MatDialog, private vehicleService: VehiclesService) {}

  ngOnInit(): void {
  }

  openVehicle(): void {
    const dialogRef = this.dialog.open(VehicleViewComponent, {
      width: '600px',
      data: this.vehicleCard,
    });
  }

  allFilled(): boolean{
    
    if(this.vehicleCard.price == 0 || this.vehicleCard.price == null|| this.vehicleCard.price > 100000){return false;}
    if(this.vehicleCard.make == ''){return false;}
    return true;
  }

  updateVehicle(): void {
    this.filledMessage = false;
    this.editMode = false;
    // update vehicle to api

    this.vehicleService.updateVehicle(this.vehicleCard).subscribe((vehicle) => {
      this.vehicleCard = vehicle as Vehicle ;
    })
  }
}
