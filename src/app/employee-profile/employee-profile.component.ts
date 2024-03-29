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

  newPassword: string = '';
  newFirst: string = '';
  newLast: string = '';

  unhashedPassword = '';
  unhashedEmail = '';

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
    this.unhashedEmail = this.empService.getUnHashedEmail();
    this.unhashedPassword = this.empService.getUnHashedPassword();
  }

  updateAccount(): void{
    this.editMode = !this.editMode;
    let updated:Employee = {
      ssn: this.employee.ssn,
      l_name: this.employee.l_name,
      f_name: this.employee.f_name,
      email: this.employee.email,
      password: this.unhashedPassword,
      depNum: this.employee.depNum,
      isManager: this.employee.isManager
    }
    if(this.newPassword?.replace(/\s/g, "") != ''){
      updated.password = this.newPassword;
    }
    if(this.newFirst?.replace(/\s/g, "") != ''){
      updated.f_name = this.newFirst;
    }
    if(this.newLast?.replace(/\s/g, "") != ''){
      updated.l_name = this.newLast;
    }
    this.empService.updateEmployee(updated).subscribe((employee) => {
      this.employee = employee;
      this.empService.signOut();
      this.router.navigate(['/']);
    })
    // call employeeService to send PUT request to api with the new account details
  }

}
