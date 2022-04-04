import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  @Input() mobile: boolean = false;

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

  constructor(private appointmentService: AppointmentService, private router: Router) {
    this.time = this.appointmentCard?.time;
  }

  ngOnInit(): void {
  }

  timeDisplay(time: number): string {
    return this.timeMap[time];
  }

}
