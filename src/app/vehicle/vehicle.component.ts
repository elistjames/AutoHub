import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {VehicleViewComponent} from "../vehicle-view/vehicle-view.component";

interface vehicle{
  user: string,
  plateNum: string,
  numSeats: number,
  color: string,
  make: string,
  price: number,
  year: number,
  image: string,
};

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  @Input() vehicleCard: vehicle | undefined;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openVehicle(): void {
    const dialogRef = this.dialog.open(VehicleViewComponent, {
      width: '600px',
      data: this.vehicleCard,
    });
  }
}
