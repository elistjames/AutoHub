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
    });
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.isHandsetObserver.subscribe(currentObserverValue => {
      this.isHandset = currentObserverValue;
      console.log(this.innerWidth);
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
    console.log(this.innerWidth);
  }

}
