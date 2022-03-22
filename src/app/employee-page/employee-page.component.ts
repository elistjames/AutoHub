import { Component, OnInit } from '@angular/core';
import { Employee } from '../interfaces/Employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css']
})
export class EmployeePageComponent implements OnInit {
  currentEmployee: Employee = {
    ssn: 0,
    l_name: '',
    f_name: '',
    email: '',
    password: '',
    depNum: 2,
    isManager: false
  }

  constructor(public empSevices: EmployeeService) {
    this.currentEmployee = this.empSevices.getEmployeeProfile();
  }

  ngOnInit(): void {
  }



}
