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
  @Input() partCard: Part = {
    partNo: '',
    price: 0,
    make: '',
    plateNum: '',
    depNum: 1,
    image: '',
    supplierID: 0,
    qty: 0
  };

  signed_in = false;
  subscription!: Subscription;

  constructor(public dialog: MatDialog, public authService: AuthenticationService) {
    
    
  }
  ngOnInit(): void {
    this.signed_in = this.authService.signedIn();
    console.log(this.signed_in);
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

  inStock(): boolean{
    if(this.partCard.qty > 0){return true;}
    return false;
  }

}
