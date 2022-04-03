import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../interfaces/Employee';
import { EmployeeService } from '../services/employee.service';
import { StaffComponent } from '../staff/staff.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() employeeCard: Employee | undefined;

  constructor(
    private empService : EmployeeService,
    private router: Router,
    private staffPage: StaffComponent
  ) { }

  ngOnInit(): void {
  }

  terminateEmployee(){
    this.staffPage.deleteEmployee(this.employeeCard?.email, this.employeeCard?.password);
  }

  promoteEmployee(){
    this.empService.updateEmployee(this.employeeCard).subscribe((employee) => {
      this.employeeCard = employee;
    })
  }

}
