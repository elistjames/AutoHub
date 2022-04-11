import { Component, OnInit } from '@angular/core';
import {base64ToFile, ImageCroppedEvent} from 'ngx-image-cropper';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSlider} from "@angular/material/slider";
import { ContentComponent } from '../content/content.component';
import { Part } from '../interfaces/Part';
import { PartService } from '../services/part.service';
import { PartsComponent } from '../parts/parts.component';
import { Supplier } from '../interfaces/Supplier';
import { SupplierService } from '../services/supplier.service';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-post-part',
  templateUrl: './post-part.component.html',
  styleUrls: ['./post-part.component.css']
})
export class PostPartComponent implements OnInit {
  price = 0;
  qty = 0;
  imageChangedEvent: any = '';
  imageFile: any = '';
  croppedImage: any = '';
  selectedCategory = 'none';
  selectedSupplier = 0;
  isLinear = true;
  newPart!: Part;
  imageFormGroup!: FormGroup;
  specsFormGroup!: FormGroup;

  suppliers: Supplier[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private content: ContentComponent,
    private partService: PartService,
    private parts:PartsComponent,
    private supplierService: SupplierService,
    private empService: EmployeeService,
    private router: Router
    ) {
      if(!this.empService.signedIn()){
        this.router.navigate(['/']);
      }
      
      this.supplierService.getAllSuppliers().subscribe((suppliers) => {
        this.suppliers = suppliers as Supplier[];
      });
  }



  ngOnInit(): void {
    
    this.imageFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.specsFormGroup = this._formBuilder.group({
      make: ['', Validators.required],
    });
  }



  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  imageChosen(): boolean {
    if(this.croppedImage == ''){
      this.isLinear = true;
      return false;
    }
    else{
      this.isLinear = false;
      return true;
    }
  }

  allFilled(): boolean {
    // @ts-ignore
    if (this.specsFormGroup.get('make').value == '') {
      return false;
    }
    if(this.selectedCategory == 'none'){
      return false;
    }
    if(this.price <= 0 || this.price > 10000){
      return false;
    }
    if(this.qty < 1){
      return false;
    }
    return true;
  }

  generatePartNumber() {
    let plateChars:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let text = "";
    for (let i = 0; i < 3; i++) {
      text += plateChars.charAt(Math.floor(Math.random() * plateChars.length));
    }
      return text;
  }



  onSubmit(): void {
    //save uploaded image
    let file = base64ToFile(this.croppedImage);
    console.log(file);
    // Send new vehicle to api

    this.partService.verifyPartNumber().subscribe((partNums) => {
      let validPN = false;
      let possiblePartNum = "AHP-"+this.generatePartNumber()+"-"+this.generatePartNumber();
      while(!validPN) {
        
        possiblePartNum = "AHP-"+this.generatePartNumber()+"-"+this.generatePartNumber();
        let existingPartNum = partNums.filter((partNum) => partNum.partNo ==  possiblePartNum);
        console.log(existingPartNum.length);
        if(existingPartNum.length == 0){

          console.log("Valid plate number found: "+ possiblePartNum);
          validPN = true;
        }
        else{
          console.log("Plate number taken: "+ possiblePartNum);
           
        }
      }
      

      let newPart: Part = {
        partNo: possiblePartNum,
        price: this.price,
        make: this.specsFormGroup.get('make')?.value,
        plateNum: this.selectedCategory,
        depNum: 1,
        image: this.croppedImage,
        supplierID: this.selectedSupplier,
        qty: this.qty
      }
  
      this.parts.postPart(newPart);
      return;
    });
    
    
  }



  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    console.log(event);
    this.croppedImage = event.base64;

  }
  imageLoaded() {
    /* show cropper */
  }
  cropperReady() {
    /* cropper ready */
  }
  loadImageFailed() {
    /* show message */
  }


  checkValues(): void{
    console.log(this.selectedCategory);
    console.log(this.croppedImage);
  }

}
