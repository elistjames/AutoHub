import {Component, HostListener} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {from, Observable} from "rxjs";
import {images} from './images';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  public innerWidth: any;
  isHandset: boolean = false;
  /** Based on the screen size, switch from standard to one column per row */
  isHandsetObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }

      return false;
    })
  );

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.isHandsetObserver.subscribe(currentObserverValue => {
      this.isHandset = currentObserverValue;
      console.log(this.innerWidth);
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
    console.log(this.innerWidth);
  }

  vehicles = [
    {
      user: 'ehstjames@gmail.com',
      plateNum: '',
      numSeats: 4,
      color: 'red',
      make: 'Honda Accord',
      price: 20000,
      year: 2015,
      image: images[0],
    },
    {
      user: 'ehstjames@gmail.com',
      plateNum: '',
      numSeats: 4,
      color: 'red',
      make: 'Ford F-150',
      price: 20000,
      year: 2015,
      image: images[0],
    },
    {
      user: 'ehstjames@gmail.com',
      plateNum: '',
      numSeats: 4,
      color: 'red',
      make: 'Infinity G-37x',
      price: 20000,
      year: 2015,
      image: images[0],
    },
    {
      user: 'ehstjames@gmail.com',
      plateNum: '',
      numSeats: 4,
      color: 'red',
      make: 'Subaru WRX sti',
      price: 20000,
      year: 2015,
      image: images[0],
    },
    {
      user: 'ehstjames@gmail.com',
      plateNum: '',
      numSeats: 4,
      color: 'red',
      make: 'Honda Civic',
      price: 20000,
      year: 2015,
      image: images[0],
    },
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}
}
