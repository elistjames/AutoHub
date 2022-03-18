import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Time} from "@angular/common";


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})


export class AppointmentComponent implements OnInit {
  appointmentForm = this.fb.group({
    department: [null, Validators.required],
  });
  selected!: Date | null;
  selectedTime!: Time


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }



  onSubmit() {

  }
}
