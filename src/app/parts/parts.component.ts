import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Part } from '../interfaces/Part';
import { PartService } from '../services/part.service';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.css']
})
export class PartsComponent implements OnInit {
  public innerWidth: any;
  isHandset: boolean = false;
  contentTitle: string = "Parts";
  parts: Part[] = [];

  /** Based on the screen size, switch from standard to one column per row */
  isHandsetObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }

      return false;
    })
  );
  

  constructor(private breakpointObserver: BreakpointObserver, private partService: PartService, private router: Router) {
    this.partService.getParts().subscribe((parts) => {this.parts = parts as Part[]});
    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
  }

  ngOnInit(): void {
    
    this.innerWidth = window.innerWidth;
    this.isHandsetObserver.subscribe(currentObserverValue => {
      this.isHandset = currentObserverValue;
      console.log(this.innerWidth);
    })
  }

  postPart(part: Part){
    this.partService.postPart(part).subscribe((part: Part) => {this.parts.push(part)});
  }

  // parts:Part[] = [
  //   { 
  //     partNo: 'AHP-5HJ-HJ8',
  //     price: 300,
  //     make: 'Steering Wheel',
  //     plateNum: 'CAT',
  //     depNum: 1
  //   },
  //   { 
  //     partNo: 'AHP-56H-JS9',
  //     price: 550,
  //     make: 'exaust pipe',
  //     plateNum: 'CAT',
  //     depNum: 1
  //   },
  //   { 
  //     partNo: 'AHP-NBC-878',
  //     price: 1000,
  //     make: 'Turbo',
  //     plateNum: 'CAT',
  //     depNum: 1
  //   },


  // ]

}
