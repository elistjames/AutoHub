import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Part } from '../interfaces/Part';

@Component({
  selector: 'app-part-view',
  templateUrl: './part-view.component.html',
  styleUrls: ['./part-view.component.css']
})
export class PartViewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Part) { }

  ngOnInit(): void {
  }

}
