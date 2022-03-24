import {Component, HostListener} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {from, Observable} from "rxjs";
import {images} from './images';
import {Vehicle} from "../interfaces/Vehicle";
import {VehiclesService} from "../services/vehicles.service"
import { Filter } from '../interfaces/ContentFilter';

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
    minSeats: 1,
    maxSeats: 7,
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

  constructor(private breakpointObserver: BreakpointObserver, private vehiclesService: VehiclesService) {
    this.vehiclesService.getVehicles().subscribe((vehicles) => (this.vehicles = vehicles as Vehicle[]));
    
    this.innerWidth = window.innerWidth;
    this.isHandsetObserver.subscribe(currentObserverValue => {
      this.isHandset = currentObserverValue;
      console.log(this.innerWidth);
    })
  }

  ngOnInit(): void {
  }

  postVehicle(vehicle: Vehicle) {
    this.vehiclesService.postVehicle(vehicle).subscribe((vehicle: Vehicle) => (this.vehicles.push(vehicle)));
    console.log("vehicle added");
    console.log(this.vehicles);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
    console.log(this.vehicles)
  }

  filterContent(): void{
    if(this.contentFilter.categoryFilter != "all"){
      
    }
    this.vehicles = this.vehicles.filter((vehicle) => {
      vehicle.category == this.contentFilter.categoryFilter
    })
  }

  // vehicles: Vehicle[] = [
  //   {
  //     plateNum: '',
  //     numSeats: 4,
  //     category: 'car',
  //     weight: 4000,
  //     topSpeed: 200,
  //     color: 'red',
  //     make: 'Honda Accord',
  //     price: 20000,
  //     year: 2015,
  //     image: images[0],
  //     Dnum: 0

  //   },
  //   {
  //     plateNum: '',
  //     numSeats: 4,
  //     category: 'car',
  //     weight: 4000,
  //     topSpeed: 200,
  //     color: 'red',
  //     make: 'Ford F-150',
  //     price: 20000,
  //     year: 2015,
  //     image: images[0],
  //     Dnum: 0

  //   },
  //   {
  //     plateNum: '',
  //     numSeats: 4,
  //     category: 'car',
  //     weight: 4000,
  //     topSpeed: 200,
  //     color: 'red',
  //     make: 'Infinity G-37x',
  //     price: 20000,
  //     year: 2015,
  //     image: images[0],
  //     Dnum: 0
  //   },
  //   {
  //     plateNum: '',
  //     numSeats: 4,
  //     category: 'car',
  //     weight: 4000,
  //     topSpeed: 200,
  //     color: 'red',
  //     make: 'Subaru WRX sti',
  //     price: 20000,
  //     year: 2015,
  //     image: images[1],
  //     Dnum: 0
  //   },
  //   {
  //     plateNum: '',
  //     numSeats: 4,
  //     category: 'car',
  //     weight: 4000,
  //     topSpeed: 200,
  //     color: 'red',
  //     make: 'Honda Civic',
  //     price: 20000,
  //     year: 2015,
  //     image: images[1],
  //     Dnum: 0
  //   },
  // ];


}
function subscribe(arg0: (vehicle: Vehicle) => number) {
  throw new Error('Function not implemented.');
}

