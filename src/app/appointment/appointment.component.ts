import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})


export class AppointmentComponent implements OnInit {
  appointmentForm = this.fb.group({
    department: [null, Validators.required],
    time: [null, Validators.required]
  });
  selected!: Date | null;

    currentDate!: Date
  constructor(private fb: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  getToday(): void {
    this.currentDate=new Date();
    let latest_date =this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    console.log(latest_date);
  }

  onSubmit() {
    this.getToday();
  }
}
