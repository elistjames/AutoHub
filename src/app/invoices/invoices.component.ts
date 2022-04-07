import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Invoice } from '../interfaces/Invoice'
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  @Input() depNum: number | undefined;
  invoices: Invoice[] = [];
  public innerWidth: any;
  isHandset: boolean = false;

  invoice_clicked: Invoice = {
    Invoice_num: 0,
    Amount: 0,
    custEmail: '',
    depNum: 0,
    notes: '',
    date: ''
  };

  /** Based on the screen size, switch from standard to one column per row */
  isHandsetObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }

      return false;
    })
  );

  details = false;

  constructor(private breakpointObserver: BreakpointObserver, private invoiceService: InvoiceService) {
     this.invoiceService.getInvoices().subscribe((invoices: Invoice[]) => {
       this.invoices = invoices as Invoice[];
       this.invoices = this.invoices.reverse();
    });
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.isHandsetObserver.subscribe(currentObserverValue => {
      this.isHandset = currentObserverValue;
      console.log(this.innerWidth);
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
    console.log(this.innerWidth);
  }

  viewDetails(invoice: Invoice): void {
    this.invoice_clicked = invoice;
    this.details = true;
  }

}
