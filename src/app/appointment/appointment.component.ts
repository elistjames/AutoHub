import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  providers: [DatePipe]
})

export class AppointmentComponent implements OnInit {
  appointmentForm = this.fb.group({
    department: [null, Validators.required],
    time: [null, Validators.required]
  });
  selectedDate!: any;
  today!: Date;
  date!: any;

  description: string = '';

  constructor(private fb: FormBuilder, public datepipe: DatePipe) {


  }

  ngOnInit(): void {

  }

  getDate(): string {
    this.date=new Date();
    return <string>this.datepipe.transform(this.date, "yyyy-MM-dd");
  }

  allFilled(): boolean {
    let today = new Date(this.getDate());

    if(this.selectedDate == null || this.selectedDate.valueOf() <= today.valueOf()){
      return false;
    }
    // @ts-ignore
    if(this.appointmentForm.get('time').value == null){
      return false;
    }
    // @ts-ignore
    if(this.appointmentForm.get('department').value == null){
      return false;
    }
    return true;
  }

  onSubmit() {
    console.log(this.selectedDate.format("yyyy-MM-dd"));
    console.log(this.appointmentForm.get('time')?.value);
    console.log(this.appointmentForm.get('department')?.value);
    console.log(this.description);

    //Create Appointment Object
    // send appointment details to Appointment service
  }
}
