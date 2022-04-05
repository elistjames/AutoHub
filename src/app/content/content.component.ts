import {Component, HostListener} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {Observable} from "rxjs";
import {images} from './images';
import {Vehicle} from "../interfaces/Vehicle";
import {VehiclesService} from "../services/vehicles.service"
import { Filter } from '../interfaces/ContentFilter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  public innerWidth: any;
  isHandset: boolean = false;
  contentTitle: string = "Vehicles";
  vehicles: Vehicle[] = [];

  contentFilter: Filter = {
    categoryFilter: "all",
    colorFilter: ['all'],
    priceRanges: [{min: 0, max: 100000}],
    make: '',
    minYear: (new Date().getFullYear()-30),
    maxYear: new Date().getFullYear(),
    seats: 0,
    parts: false
  };

  /** Based on the screen size, switch from standard to one column per row */
  isHandsetObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }

      return false;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private vehiclesService: VehiclesService, private router: Router) {
    this.contentFilter = this.vehiclesService.getFilters();
    console.log(this.contentFilter);
    this.vehiclesService.getVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles as Vehicle[];
      console.log(this.vehicles);
      this.vehicles = this.filterContent(this.vehicles);
      
    });
    
    //this.filterContent();
    
  }

  ngOnInit(): void {
    
    this.innerWidth = window.innerWidth;
    this.isHandsetObserver.subscribe(currentObserverValue => {
      this.isHandset = currentObserverValue;
      console.log(this.innerWidth);
    })
  }

  postVehicle(vehicle: Vehicle) {
    this.vehiclesService.postVehicle(vehicle).subscribe((vehicle: Vehicle) => (this.vehicles.push(vehicle)));
    console.log("vehicle added");
    console.log(this.vehicles);
    this.router.navigate(['/loading-page'])
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
  }

  filterContent(filteredVehicles: Vehicle[]): Vehicle[] {
    let maxPrice = 0;
    let minPrice = 100000
    for(let i = 0; i < this.contentFilter.priceRanges.length; i++){
      let possibleMax = this.contentFilter.priceRanges[i].max;
      let possibleMin = this.contentFilter.priceRanges[i].min;

      if(possibleMin < minPrice){
        minPrice = possibleMin;
      }
      if(possibleMax > maxPrice){
        maxPrice = possibleMax;
      }
    }

    console.log(maxPrice);
    console.log(minPrice);

    console.log(filteredVehicles);
    if(this.contentFilter.categoryFilter != "all"){
      filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.category == this.contentFilter.categoryFilter);
    }
    console.log(filteredVehicles);
    if(this.contentFilter.colorFilter[0] != "all"){
      filteredVehicles = filteredVehicles.filter((vehicle) => this.contentFilter.colorFilter.includes(vehicle.colour));
    }
    console.log(filteredVehicles);
    if(this.contentFilter.seats != 0){
      filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.numSeats == this.contentFilter.seats);
    }
    console.log(filteredVehicles);
    if(this.contentFilter.make != ''){
      filteredVehicles = filteredVehicles.filter((vehicle) => this.isSubstring(this.contentFilter.make.toLowerCase().replace(/[^a-z0-9]+/gi, ''), vehicle.make.toLowerCase().replace(/[^a-z0-9]+/gi, '')));
    }
    console.log(filteredVehicles);
    filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.price >= minPrice && vehicle.price <= maxPrice);
    console.log(filteredVehicles);
    filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.year >= this.contentFilter.minYear && vehicle.year <= this.contentFilter.maxYear);
    console.log(filteredVehicles);

    return filteredVehicles;
  }

  isSubstring(str1: string, str2: string): boolean {
    let m = str1.length;
    let n = str2.length;

    for(let i = 0; i < (n-m)+1; i++){
      var j;
      for(j = 0; j < m; j++){
        if(str2[i+j] != str1[j]){
          break;
        }
      }
      if(j == m){
        return true;
      }
      
    }
    return false;
  }


}

