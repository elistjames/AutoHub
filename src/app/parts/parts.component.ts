import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Filter } from '../interfaces/ContentFilter';
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

  contentFilter: Filter = {
    categoryFilter: "all",
    colorFilter: ['all'],
    priceRanges: [{min: 0, max: 100000}],
    make: '',
    minYear: (new Date().getFullYear()-30),
    maxYear: new Date().getFullYear(),
    seats: 0,
    parts: true
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
  

  constructor(private breakpointObserver: BreakpointObserver, private partService: PartService, private router: Router) {
    this.partService.getParts().subscribe((parts) => {
      this.parts = parts as Part[];
      this.parts = this.filterParts(this.parts);
    });
    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
    
  }

  ngOnInit(): void {
    
    this.innerWidth = window.innerWidth;
    
    this.isHandsetObserver.subscribe(currentObserverValue => {
      this.isHandset = currentObserverValue;
      
    })
  }

  postPart(part: Part){
    this.partService.postPart(part).subscribe((part: Part) => {this.parts.push(part)});
  }

  filterParts(filteredParts: Part[]): Part[] {
    
    
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

    

    
    if(this.contentFilter.categoryFilter != "all"){
      filteredParts = filteredParts.filter((part) => part.plateNum == this.contentFilter.categoryFilter);
    }

    
    if(this.contentFilter.make != ''){
      filteredParts = filteredParts.filter((part) => this.isSubstring(this.contentFilter.make.toLowerCase().replace(/[^a-z0-9]+/gi, ''), part.make.toLowerCase().replace(/[^a-z0-9]+/gi, '')));
    }
    
    filteredParts = filteredParts.filter((part) => part.price >= minPrice && part.price <= maxPrice);
    

    return filteredParts;
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
