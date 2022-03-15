import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface vehicleData{
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
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.css']
})
export class VehicleViewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: vehicleData
  ) { }

  ngOnInit(): void {
  }

}
