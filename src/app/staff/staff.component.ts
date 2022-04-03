import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Employee } from '../interfaces/Employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  public innerWidth: any;
  isHandset: boolean = false;
  @Input() depNum: number  | undefined;
  staff: Employee[] = [];

  /** Based on the screen size, switch from standard to one column per row */
  isHandsetObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }

      return false;
    })
  );
  

  constructor(private breakpointObserver: BreakpointObserver, private empService: EmployeeService) {
    this.empService.getAllEmployees().subscribe((employees) => {
      this.staff = employees as Employee[];
      this.staff = this.staff.filter((employee) => (employee.depNum == this.depNum))
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
    console.log(this.innerWidth);
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.isHandsetObserver.subscribe(currentObserverValue => {
      this.isHandset = currentObserverValue;
      console.log(this.innerWidth);
    })
  }

  deleteEmployee(email?: string, password?: string): void {
    this.empService.deleteEmployee(email, password).subscribe((employees) => {
      this.staff = employees as Employee[];
      this.staff = this.staff.filter((employee) => (employee.depNum == this.depNum))
    });
  }

}
