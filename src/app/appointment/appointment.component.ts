import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import { Appointment } from '../interfaces/Appointment';
import { AuthenticationService } from '../services/authentication.service';
import { AppointmentService } from '../services/appointment.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';


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
  selectedDate: any;
  today!: Date;
  date!: any;
  preExistingAppointment: boolean = false;

  description: string = '';

  constructor(private fb: FormBuilder, public datepipe: DatePipe, private authService: AuthenticationService, public appointmentService: AppointmentService, private router: Router) {
    if(!this.authService.signedIn()){
      this.router.navigate(['/']);
    }
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

    let newAppointment:Appointment = {
      cust_email: this.authService.getProfile().email,
      date: this.getDate(),
      time: this.appointmentForm.get('time')?.value,
      depNum: 0,
      description: this.description
    }

    if(this.appointmentForm.get('department')?.value == 'm'){
      newAppointment.depNum = 1;
    }

    this.appointmentService.postAppointment(newAppointment).pipe(
      take(1),
      
    ).subscribe((response) => {
      this.preExistingAppointment = this.appointmentService.alreadyHasAppointment();
      if(this.preExistingAppointment){
        console.log('Already has booked appointment (update appointment)');
        this.updateAppointment(newAppointment);
      }
      else{
        this.router.navigate(['/']);
      }
    })

    //Create Appointment Object
    // send appointment details to Appointment service
  }

  updateAppointment(newAppointment: Appointment){
    this.appointmentService.getAppointments().subscribe((appointments) => {
      let current = appointments;
      console.log(current);
      current = current.filter((appointment) => (appointment.cust_email == newAppointment.cust_email));
      console.log(current);
      let updated:Appointment = {
        cust_email: current[0].cust_email,
        date: current[0].date,
        time: current[0].time,
        depNum: current[0].depNum,
        description: current[0].description + '-> Also, '+newAppointment.description
      }
      this.appointmentService.updateAppointment(updated).subscribe((appointment:any) => {});
      console.log('appointment updated');
      
    });
    return;
  }
}
