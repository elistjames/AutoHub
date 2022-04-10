import { DatePipe } from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Invoice } from '../interfaces/Invoice';
import { Part } from '../interfaces/Part'
import { Supplier } from '../interfaces/Supplier';
import { PartViewComponent } from '../part-view/part-view.component';
import { AuthenticationService } from '../services/authentication.service';
import { EmployeeService } from '../services/employee.service';
import { InvoiceService } from '../services/invoice.service';
import { PartService } from '../services/part.service';
import { SupplierService } from '../services/supplier.service';

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

  confirmation = false;
  date!: any;

  signed_in = false;
  emp_signed_in = false;
  subscription!: Subscription;

  viewSupplier = false;

  supplier: Supplier = {
    id: 0,
    name: '',
    phoneNum: ''
  };

  constructor(public dialog: MatDialog, 
    public authService: AuthenticationService,
    private empService: EmployeeService, 
    private supplierService: SupplierService, 
    private invoiceService: InvoiceService, 
    private datepipe: DatePipe,
    private partService: PartService,
    private router: Router) {
    
  }

  ngOnInit(): void {
    this.signed_in = this.authService.signedIn();
    this.emp_signed_in = this.empService.signedIn();
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

    this.invoiceService.getInvoices().subscribe((invoices) => {
      let new_invoice:Invoice = {
        Invoice_num: 0,
        Amount: this.partCard.price,
        custEmail: this.authService.getProfile().email,
        depNum: 1,
        notes: 'Make: '+this.partCard.make+'   PlateNum:'+this.partCard.partNo,
        date: this.getDate()
      };
      if(invoices.length > 0){
        new_invoice.Invoice_num = invoices.length;
      }

      this.invoiceService.postInvoice(new_invoice).subscribe((invoice) => {
        this.partCard.qty -= 1;
        console.log(this.partCard.qty);
        this.partService.updatePart(this.partCard).subscribe(() => {
          this.router.navigate(['/parts-loading-page']);
          return;
        });
        return;
      });
      return;
    });
    
  }

  getDate(): string {
    this.date=new Date();
    return <string>this.datepipe.transform(this.date, "yyyy-MM-dd");
  }

  inStock(): boolean{
    if(this.partCard.qty > 0){return true;}
    return false;
  }

  viewSupplierDetails() {
    this.viewSupplier = true;

    this.supplierService.getSupplier(this.partCard.supplierID).subscribe((supplier) => {
      this.supplier = supplier as Supplier;
    });
  }

}
