import { Component, OnInit } from '@angular/core';
import {base64ToFile, ImageCroppedEvent} from 'ngx-image-cropper';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSlider} from "@angular/material/slider";
import { Vehicle } from '../interfaces/Vehicle';
import { VehiclesService } from '../services/vehicles.service';
import { ContentComponent } from '../content/content.component';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';



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
  yearOptions: number[] = [];
  numSeatsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedSeats: number = 1;
  selectedYear: number = new Date().getFullYear() - 10;
  plateNum = '';
  selectedDate: any;
  today!: Date;
  date!: any;
  preExistingAppointment: boolean = false;
  time = 0;

  


  constructor(private _formBuilder: FormBuilder, 
    private content: ContentComponent,
    private vehicleService:VehiclesService, 
    public datepipe: DatePipe,
    private authService:AuthenticationService,
    private router:Router
    ) {

      if(!this.authService.signedIn()){
        this.router.navigate(['/']);
      }
      this.setupYears();
  }



  ngOnInit(): void {
    this.imageFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.specsFormGroup = this._formBuilder.group({
      make: ['', Validators.required],
      year: [0, Validators.required],
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

  setupYears():void {
    let currentYear = new Date().getFullYear();
    let minYear = currentYear - 30;

    for(let y = minYear; y <= currentYear; y++){
      this.yearOptions.push(y);
    }
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
    if(this.price <= 0 || this.price > 100000){
      return false;
    }
    return true;
  }

  generatePlateNumber() {
    let plateChars:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let text = "";
    for (let i = 0; i < 3; i++) {
      text += plateChars.charAt(Math.floor(Math.random() * plateChars.length));
    }
      return text;
  }

  confirmDate(){
    this.today = new Date(this.getDate());
    this.date = this.today.setDate(this.today.getDate() + 7);
    
  }



  onSubmit(): void {
    //save uploaded image
    let file = base64ToFile(this.croppedImage);
    
    // Send new vehicle to api

    
    this.vehicleService.verifyPlateNumber().subscribe((plateNums) => {
      let validPN = false;
      let possiblePlateNum = "AH-"+this.generatePlateNumber()+"-"+this.generatePlateNumber();
      while(!validPN) {
        
        possiblePlateNum = "AH-"+this.generatePlateNumber()+"-"+this.generatePlateNumber();
        let existingPlateNum = plateNums.filter((plateNum) => plateNum.plateNum ==  possiblePlateNum);
        
        if(existingPlateNum.length == 0){

          
          validPN = true;
        }
        else{
          
           
        }
      }
      

      this.newVehicle = {
        plateNum: possiblePlateNum,
        numSeats: this.selectedSeats,
        category: this.selectedCategory,
        weight: this.specsFormGroup.get('weight')?.value,
        topSpeed: this.specsFormGroup.get('speed')?.value,
        colour: this.selectedColor,
        make: this.specsFormGroup.get('make')?.value,
        price: this.price,
        year: this.selectedYear,
        image: this.croppedImage,
        depNum: 0
      }
  
      this.content.postVehicle(this.newVehicle);
      return;
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    
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

  getDate(): string {
    this.date=new Date();
    return <string>this.datepipe.transform(this.date, "yyyy-MM-dd");
  }


  checkValues(): void{
    
  }

}
