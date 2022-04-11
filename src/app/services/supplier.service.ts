import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddSupplierComponent } from '../add-supplier/add-supplier.component';
import { Supplier } from '../interfaces/Supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl = 'http://localhost:8000/supplier/';

  constructor(private http: HttpClient) {}

  getAllSuppliers(): Observable<Supplier[]> {
    let id = 0;
    return this.http.get<Supplier[]>(this.apiUrl+id)
  }

  getSupplier(id: number): Observable<Supplier>{
    return this.http.get<Supplier>(this.apiUrl+id);
  }

  postSupplier(supplier: Supplier): Observable<Supplier[]> {
    let supDetails = {
      name: supplier.name,
      phoneNum: supplier.phoneNum
    }
    return this.http.post<Supplier[]>(this.apiUrl+supplier.id, supDetails);
  }

  deleteSupplier(id:number): Observable<any> {
    return this.http.delete<any>(this.apiUrl+id);
  }

  updateSupplier(supplier: Supplier): Observable<any> {
    let updated = {
      name: supplier.name,
      phoneNum: supplier.phoneNum
    }
    return this.http.put(this.apiUrl+supplier.id, updated)
  }
}
