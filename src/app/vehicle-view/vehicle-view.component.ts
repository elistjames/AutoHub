import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Vehicle} from '../interfaces/Vehicle';


@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.css']
})
export class VehicleViewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Vehicle
  ) { }

  ngOnInit(): void {
  }

}
