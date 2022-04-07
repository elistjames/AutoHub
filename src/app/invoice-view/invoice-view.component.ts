import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoicesComponent } from '../invoices/invoices.component';
import { Invoice } from '../interfaces/Invoice';
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.css']
})
export class InvoiceViewComponent implements OnInit {
  @Input() invoiceCard: Invoice = {
    Invoice_num: 0,
    Amount: 0,
    custEmail: '',
    depNum: 0,
    notes: '',
    date: ''
  };

  @Input() innerWidth: number = 0;

  constructor(private invoiceService: InvoiceService, private router: Router, private invoices: InvoicesComponent) {
    
  }

  ngOnInit(): void {
  }

  viewDetails(){
    this.invoices.viewDetails(this.invoiceCard);
  }

}
