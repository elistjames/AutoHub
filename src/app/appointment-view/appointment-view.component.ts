import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentsComponent } from '../appointments/appointments.component';
import { Appointment } from '../interfaces/Appointment';
import { AppointmentService } from '../services/appointment.service';

interface TimeMap {
  [military_time: number] : string;
};

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.css']
})


export class AppointmentViewComponent implements OnInit {
  @Input() appointmentCard: Appointment = {
    cust_email: '',
    date: '',
    time: 9,
    depNum: 0,
    description: ''
  };
  
  @Input() innerWidth: number = 0;

  timeMap: TimeMap = {
    [9]: '9:00 am',
    [10]: '10:00 am',
    [11]: '11:00 am',
    [12]: '12:00 am',
    [13]: '1:00 pm',
    [14]: '2:00 pm',
    [15]: '3:00 pm',
    [16]: '4:00 pm',
    [17]: '5:00 pm',
    
  };

  time = 9;

  constructor(private appointmentService: AppointmentService, private router: Router, private appointments: AppointmentsComponent) {
    this.time = this.appointmentCard?.time;
  }

  ngOnInit(): void {
  }

  timeDisplay(time: number): string {
    return this.timeMap[time];
  }

  markAppointment(){
    this.appointments.markAppointment(this.appointmentCard);
  }

  viewDetails(){
    this.appointments.viewDetails(this.appointmentCard);
  }

}
