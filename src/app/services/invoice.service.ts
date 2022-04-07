import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../interfaces/Invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'http://localhost:8000/invoice/'

  constructor(private http: HttpClient) { }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.apiUrl+411);
  }

  postInvoice(invoice: Invoice): Observable<Invoice>{
    let new_invoice = {
      Amount: invoice.Amount,
      custEmail: invoice.custEmail,
      depNum: invoice.depNum,
      notes: invoice.notes,
      date: invoice.date
    }
    return this.http.post<Invoice>(this.apiUrl+invoice.Invoice_num, new_invoice);
  }
}
