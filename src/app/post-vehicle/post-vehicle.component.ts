import { Component, OnInit } from '@angular/core';
import {base64ToFile, ImageCroppedEvent} from 'ngx-image-cropper';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSlider} from "@angular/material/slider";
import { Vehicle } from '../interfaces/Vehicle';
import { VehiclesService } from '../services/vehicles.service';
import { ContentComponent } from '../content/content.component';



@Component({
  selector: 'app-post-vehicle',
  templateUrl: './post-vehicle.component.html',
  styleUrls: ['./post-vehicle.component.css']
})
export class PostVehicleComponent implements OnInit {
  price = 0;
  imageChangedEvent: any = '';
  imageFile: any = '';
  croppedImage: any = '';
  selectedCategory = 'none';
  isLinear = true;
  newVehicle!: Vehicle;
  selectedColor: string = 'none';
  imageFormGroup!: FormGroup;
  specsFormGroup!: FormGroup;



  constructor(private _formBuilder: FormBuilder, private content: ContentComponent) {}



  ngOnInit(): void {
    this.imageFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.specsFormGroup = this._formBuilder.group({
      make: ['', Validators.required],
      year: [0, Validators.required],
      seats: [0, Validators.required],
      speed: [0, Validators.required],
      weight: [0, Validators.required],
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
    // @ts-ignore
    if(this.specsFormGroup.get('seats').value <= 0){
      return false;
    }
    if(this.price <= 0 || this.price > 100000){
      return false;
    }
    return true;
  }



  onSubmit(): void {
    //save uploaded image
    let file = base64ToFile(this.croppedImage);
    console.log(file);
    // Send new vehicle to api

    this.newVehicle = {
      plateNum: Math.random().toString(10),
      numSeats: this.specsFormGroup.get('seats')?.value,
      category: this.selectedCategory,
      weight: this.specsFormGroup.get('weight')?.value,
      topSpeed: this.specsFormGroup.get('speed')?.value,
      colour: this.selectedColor,
      make: this.specsFormGroup.get('make')?.value,
      price: this.price,
      year: this.specsFormGroup.get('year')?.value,
      image: this.croppedImage,
      depNum: 0
    }

    this.content.postVehicle(this.newVehicle);
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
