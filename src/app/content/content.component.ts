import {Component, HostListener} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {from, Observable} from "rxjs";
import {images} from './images';
import {Vehicle} from "../interfaces/Vehicle";
import {VehiclesService} from "../services/vehicles.service"

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

  /** Based on the screen size, switch from standard to one column per row */
  isHandsetObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }

      return false;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private vehiclesService: VehiclesService) {}

  ngOnInit(): void {

    this.vehiclesService.getVehicles().subscribe((vehicles) => (this.vehicles = vehicles));
    console.log(this.vehicles)
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
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
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

