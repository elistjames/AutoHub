import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../interfaces/Employee';
import { AuthenticationService } from '../services/authentication.service';
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



  constructor(public empSevices: EmployeeService, private router: Router) {
    this.currentEmployee = this.empSevices.getEmployeeProfile();
    if(!this.empSevices.signedIn()){
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }



}
