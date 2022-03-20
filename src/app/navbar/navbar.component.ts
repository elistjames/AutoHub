import {Component, Input} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../app.component';
import {VehicleViewComponent} from "../vehicle-view/vehicle-view.component";
import {MatDialog} from "@angular/material/dialog";
import {Filter} from "../ContentFilter";
import {SearchComponent} from "../search/search.component";

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

  @Input() contentFilter: Filter = {
    categoryFilter: "all",
    colorFilter: ['all'],
    priceRanges: [{min: 0, max: 100000}],
    make: '',
    minYear: (new Date().getFullYear()-30),
    maxYear: new Date().getFullYear(),
    minSeats: 1,
    maxSeats: 7,
  }

  signed_in = false;
  subscription!: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthenticationService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.subscription = this.authService.authenticateUser().subscribe((value) => (this.signed_in = value));

  }

  signIn(user: User): void{
    console.log(user.email);
    console.log(user.password);
    this.authService.signIn(user);
  }

  openSearch(): void {

    const dialogRef = this.dialog.open(SearchComponent, {
      width: '800px',
      data: this.contentFilter,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
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
