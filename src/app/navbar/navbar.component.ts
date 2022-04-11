import {Component, Input} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../interfaces/User';
import {VehicleViewComponent} from "../vehicle-view/vehicle-view.component";
import {MatDialog} from "@angular/material/dialog";
import {Filter} from "../interfaces/ContentFilter";
import {SearchComponent} from "../search/search.component";
import { EmployeeService } from '../services/employee.service';
import {VehiclesService} from '../services/vehicles.service';
import { Router } from '@angular/router';
import { PartService } from '../services/part.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  current: User = {
    email: '',
    password: '',
    f_name: '',
    l_name: '',
  };

  @Input() contentFilter: Filter = {
    categoryFilter: "all",
    colorFilter: ['all'],
    priceRanges: [{min: 0, max: 100000}],
    make: '',
    minYear: (new Date().getFullYear()-30),
    maxYear: new Date().getFullYear(),
    seats: 0,
    parts: false
  }

  signed_in = false;
  emp_signed_in = false;
  subscription!: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthenticationService,
              public dialog: MatDialog, public empService: EmployeeService, public vehiclesService: VehiclesService,
              private partService: PartService,
              private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.authService.authenticateUser().subscribe((value) => (this.signed_in = value));
    this.subscription = this.empService.authenticateEmployee().subscribe((value) => (this.emp_signed_in = value));
  }

  openSearch(): void {
    
    const dialogRef = this.dialog.open(SearchComponent, {
      width: '800px',
      data: this.contentFilter,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.parts){
        this.partService.setFilter(result);
        this.router.navigate(['/parts-loading-page']);
      }
      else{
        this.vehiclesService.setFilter(result);
        this.router.navigate(['/loading-page']);
      }
    });
  }

  onSignOut(): void {
    
    if(this.signed_in){
      this.authService.signOut();
    }
    if(this.emp_signed_in){
      this.empService.signOut();
    }
  }

}
