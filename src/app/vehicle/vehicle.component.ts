import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {VehicleViewComponent} from "../vehicle-view/vehicle-view.component";
import {Vehicle} from '../Vehicle';


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  @Input() vehicleCard: Vehicle | undefined;
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
