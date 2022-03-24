import {Component, HostListener} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import { User } from '../interfaces/User';

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

  constructor(private breakpointObserver: BreakpointObserver, private fb: FormBuilder, private router: Router) {}

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

  onSubmit(): void {
    // Add new user
    this.newUser.email = this.accountForm.get('email')?.value;
    this.newUser.password = this.accountForm.get('password')?.value;
    this.newUser.f_name = this.accountForm.get('firstName')?.value;
    this.newUser.l_name = this.accountForm.get('lastName')?.value;


    this.router.navigate(['/']);

  }
}
