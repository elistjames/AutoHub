import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Appointment } from '../interfaces/Appointment';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  @Input() depNum: number | undefined;
  appointments: Appointment[] = [];
  public innerWidth: any;
  isHandset: boolean = false;

  appointment_clicked: Appointment = {
    cust_email: '',
    date: '',
    time: 9,
    depNum: 0,
    description: ''
  }

  details = false;

  /** Based on the screen size, switch from standard to one column per row */
  isHandsetObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }

      return false;
    })
  );
  

  constructor(private breakpointObserver: BreakpointObserver, private appointmentService: AppointmentService) {
    this.appointmentService.getAppointments().subscribe((appointments: Appointment[]) => {
      this.appointments = appointments as Appointment[];
      this.appointments = this.appointments.filter((appointment) => appointment.depNum == this.depNum);
    });
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.isHandsetObserver.subscribe(currentObserverValue => {
      this.isHandset = currentObserverValue;
      
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
    
  }

  viewDetails(appointment: Appointment): void {
    this.appointment_clicked = appointment;
    this.details = true;
  }

  markAppointment(appointment: Appointment): void {
    this.details = false;
    this.appointmentService.deleteAppointment(appointment).subscribe((appointments) => {
      this.appointments = appointments as Appointment[];
      this.appointments = this.appointments.filter((appointment) => appointment.depNum == this.depNum);
    });
  }

}
