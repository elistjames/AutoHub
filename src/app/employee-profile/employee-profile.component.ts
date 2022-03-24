import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../interfaces/Employee';
import { EmployeeService } from '../services/employee.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  hidePassword = true;
  editMode = false;
  deleteMode = false;

  newUsername?: string;
  newPassword?: string;
  newFirst?: string;
  newLast?: string;

  @Input() employee: Employee = {
    ssn: 0,
    l_name: '',
    f_name: '',
    email: '',
    password: '',
    depNum: 2,
    isManager: false
  };

  constructor(private empService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
  }

  updateAccount(): void{
    this.editMode = !this.editMode;

    // call employeeService to send PUT request to api with the new account details
  }

}
