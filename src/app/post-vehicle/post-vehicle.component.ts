import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-post-vehicle',
  templateUrl: './post-vehicle.component.html',
  styleUrls: ['./post-vehicle.component.css']
})
export class PostVehicleComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';

  selectedCategory = 'none';
  isLinear = false;
  imageFormGroup!: FormGroup;
  specsFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.imageFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.specsFormGroup = this._formBuilder.group({
      make: ['', Validators.required],
    });
  }

  imageChosen(): boolean {
    if(this.croppedImage == ''){
      this.isLinear = true;
      return false;
    }
    this.isLinear = false;
    return true;
  }

  allFilled(): boolean {
    // @ts-ignore
    if (this.specsFormGroup.get('make').value == '') {

      return false;
    }
    if(this.selectedCategory == 'none'){

      return false;
    }
    return true;
  }

  onSubmit(): void {
    // @ts-ignore
    console.log(this.specsFormGroup.get('make').value)
    // @ts-ignore
    if (this.specsFormGroup.get('make').value == '') {

      return;
    }
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

  checkValues(): void{
    console.log(this.selectedCategory);
    console.log(this.croppedImage);
  }

}
