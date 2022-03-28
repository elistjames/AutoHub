import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { Part } from '../interfaces/Part'
import { PartViewComponent } from '../part-view/part-view.component';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit {
  @Input() partCard: Part | undefined;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openPart(): void {
    const dialogRef = this.dialog.open(PartViewComponent, {
      width: '600px',
      data: this.partCard,
    });
  }

}
