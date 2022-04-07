import { Component, Input, OnInit } from '@angular/core';
import { Supplier } from '../interfaces/Supplier';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  @Input() supplierCard: Supplier = {
    id: 0,
    name:'',
    phoneNum:''
  };
  @Input() mobile: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  removeSupplier(){
    
  }

}
