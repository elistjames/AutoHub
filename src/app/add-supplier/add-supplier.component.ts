import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Supplier } from '../interfaces/Supplier';
import { EmployeeService } from '../services/employee.service';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {
  public innerWidth: any;
  isHandset: boolean = false;

  supplier:Supplier = {
    id:0,
    name:'',
    phoneNum:''
  };

  invalidPhone = false;
  invalidName = false;
  editMode = false;

  addSupplier = false;

  suppliers: Supplier[] = [];

  /** Based on the screen size, switch from standard to one column per row */
  isHandsetObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }

      return false;
    })
  );

  constructor(private supplierService:SupplierService, private router:Router, private breakpointObserver: BreakpointObserver, public empSevices: EmployeeService) {
    if(!this.empSevices.signedIn()){
      this.router.navigate(['/']);
    }
    this.supplierService.getAllSuppliers().subscribe((suppliers) => {
      this.suppliers = suppliers as Supplier[];
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
  }

  submitNew(){
    this.invalidName = false;
    this.invalidPhone = false;
    
    if(this.supplier.phoneNum.length != 10 || !this.isNumber(this.supplier.phoneNum)){
      this.invalidPhone = true;
    }

    if(this.supplier.name.replace(/\s/g, '') == ''){
      this.invalidName = true;
      return;
    }

    if(this.invalidPhone){ return;}

    this.invalidName = false;
    this.invalidPhone = false;
    this.addSupplier = false;

    let formattedNumber = '';

    for(let i = 0; i < this.supplier.phoneNum.length; i++){
      if(i == 3 || i == 6){
        formattedNumber += '-';
      }
      formattedNumber += this.supplier.phoneNum[i];
    }
    console.log(formattedNumber);

    this.supplier.phoneNum = formattedNumber;

    this.supplierService.getAllSuppliers().subscribe((suppliers) => {
      let current  = suppliers as Supplier[];

      let newID = current[current.length - 1].id+1;

      this.supplier.id = newID;

      this.supplierService.postSupplier(this.supplier).subscribe((suppliers) => {
        this.suppliers = suppliers as Supplier[];
        this.supplier.id = 0;
        this.supplier.name = '';
        this.supplier.phoneNum = '';
        return;
      });
      return;
    });
     
  }

  removeSupplier(id:number){
    this.supplierService.deleteSupplier(id).subscribe(()=>{
      this.supplierService.getAllSuppliers().subscribe((suppliers) => {
        this.suppliers = suppliers as Supplier[];
        return;
      });
      return;
    })
    return;
  }

  editSupplier(supplier: Supplier){
    this.editMode = true;
    this.supplier.id = supplier.id;
    this.supplier.name = supplier.name;
    this.supplier.phoneNum = supplier.phoneNum.replace("-", "");
    this.supplier.phoneNum = this.supplier.phoneNum.replace("-", "");
  }

  updateSupplier(){
    this.invalidName = false;
    this.invalidPhone = false;
    
    if(this.supplier.phoneNum.length != 10 || !this.isNumber(this.supplier.phoneNum)){
      this.invalidPhone = true;
    }

    if(this.supplier.name.replace(/\s/g, '') == ''){
      this.invalidName = true;
      return;
    }

    if(this.invalidPhone){ return;}

    this.invalidName = false;
    this.invalidPhone = false;
    this.editMode = false;

    let formattedNumber = '';

    for(let i = 0; i < this.supplier.phoneNum.length; i++){
      if(i == 3 || i == 6){
        formattedNumber += '-';
      }
      formattedNumber += this.supplier.phoneNum[i];
    }
    console.log(formattedNumber);

    this.supplier.phoneNum = formattedNumber;

    this.supplierService.updateSupplier(this.supplier).subscribe(() => {
      this.supplierService.getAllSuppliers().subscribe((suppliers) => {
        this.suppliers = suppliers as Supplier[];
        return;
      });
      return;
    });
  }

  isNumber(phoneNum: string): boolean{
    for(let i = 0; i < phoneNum.length; i++){
      if(phoneNum[1].charCodeAt(0) < 48 || phoneNum[1].charCodeAt(0) > 57){
        return false;
      }
    }
    return true;
  }
}
