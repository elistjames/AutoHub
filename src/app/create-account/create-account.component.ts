import {Component, HostListener} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, take} from "rxjs/operators";
import { User } from '../interfaces/User';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  newUser: User = {
    email: '',
    password: '',
    f_name: '',
    l_name: ''
  }

  accountForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  isHandset: boolean = false;
  public innerWidth: any;
  employeeAccount = false;
  manager = false;
  employeeKeyInput = '';
  employeeKey = 'emp'; //set to whatever you want to set the employee key
  managerKeyInput = '';
  salesManagerKey = 'smgr' //set to whatever you want to set the manager key
  maintenanceManagerKey = 'mmgr'
  validEmployeeKey = false;
  invalidEmployeeKey = false;
  selectedDepartment = 'sales';
  invalidManagerKey = false;
  ssn?: number;
  emailAvailable:boolean = true;

  constructor(private breakpointObserver: BreakpointObserver, private fb: FormBuilder, private router: Router, private authService:AuthenticationService) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.isHandsetObserver.subscribe(currentObserverValue => {
      this.isHandset = currentObserverValue;
      console.log(this.innerWidth);
    })
  }

  isHandsetObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }
      return false;
    })
  );

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
  }

  allFilled(): boolean {
    if(this.employeeAccount){
      if(this.ssn == 0){return false}
    }
    // @ts-ignore
    if(this.accountForm.get('firstName').value == ''){
    
      return false;
    }
    // @ts-ignore
    if(this.accountForm.get('lastName').value == ''){
    
      return false;
    }
    // @ts-ignore
    if(this.accountForm.get('email').value == ''){
    
      return false;
    }
    // @ts-ignore
    if(this.accountForm.get('password').value == ''){
    
      return false;
    }
    return true;
  }

  checkEmployeeKey(): void {
    if(this.employeeKeyInput == this.employeeKey){
      this.invalidEmployeeKey = false;
      this.validEmployeeKey = true;
    }
    else{
      this.invalidEmployeeKey = true;
    }
  }

  checkManagerKey(): boolean {
    if(this.selectedDepartment == 'sales'){
      if(this.managerKeyInput == this.salesManagerKey){
        return true;
      }
    }
    else{
      if(this.managerKeyInput == this.maintenanceManagerKey){
        return true;
      }
    }
    return false;
  }

  managerKeyInputEmpty(): boolean{
    if(this.managerKeyInput != ''){
      return false;
    }
    return true
  }

  onSubmit(): void {
    console.log('creating account');
    // Add new user
    if(this.employeeAccount){

      if(this.manager){
        if(!this.checkManagerKey()){
          this.invalidManagerKey = true;
          this.managerKeyInput = '';
          return;
        }
        this.invalidManagerKey = false;
      }

      console.log('creating account')


    }
    else{
      this.newUser.email = this.accountForm.get('email')?.value;
      this.newUser.password = this.accountForm.get('password')?.value;
      this.newUser.f_name = this.accountForm.get('firstName')?.value;
      this.newUser.l_name = this.accountForm.get('lastName')?.value;

      this.authService.createUser(this.newUser).pipe(
        take(1),
      ).subscribe((response) => {
        this.emailAvailable = this.authService.validateEmail();
        console.log(this.emailAvailable);
        if(this.emailAvailable){
          this.router.navigate(['loading-page']);
        }
        else{
          
        }
      })
    }
  }
}
