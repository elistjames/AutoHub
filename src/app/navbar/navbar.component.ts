import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  current: User = {
    email: '',
    password: ''
  };

  signed_in = false;
  subscription!: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.subscription = this.authService.authenticateUser().subscribe((value) => (this.signed_in = value));
  }

  signIn(user: User): void{
    console.log(user.email);
    console.log(user.password);
    this.authService.signIn(user);
  }

  onSignOut(): void {
    console.log(this.signed_in);
    if(this.signed_in){
      this.authService.signOut();
    }
    else{
      alert("You are already signed out");
    }
  }

}
