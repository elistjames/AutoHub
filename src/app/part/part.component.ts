import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { Subscription } from 'rxjs';
import { Part } from '../interfaces/Part'
import { PartViewComponent } from '../part-view/part-view.component';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit {
  @Input() partCard: Part | undefined;
  signed_in = false;
  subscription!: Subscription;

  constructor(public dialog: MatDialog, public authService: AuthenticationService) {}

  ngOnInit(): void {
    this.subscription = this.authService.authenticateUser().subscribe((value) => (this.signed_in = value));
  }

  openPart(): void {
    const dialogRef = this.dialog.open(PartViewComponent, {
      width: '600px',
      data: this.partCard,
    });
  }

  onPurchase(): void{
    console.log('Purchase Part')
  }

}
