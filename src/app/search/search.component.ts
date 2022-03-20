import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Vehicle} from "../Vehicle";
import {Filter} from "../ContentFilter";

interface PriceRange {
  display: string;
  min: number;
  max: number;
}

interface PriceRangeMap {
  [range: string] : { min: number, max: number, };
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  categories = ['Car', 'Truck'];
  colors = ['Red', 'Blue', 'Green', 'Black', 'Grey', 'White', 'Silver', 'Yellow', 'Orange', 'Purple', 'Other'];
  priceMap: PriceRangeMap = {};
  priceRangeNames: string[] = [];
  prices: PriceRange[] = [
    {display: '$0 - $1,000', min: 0, max: 1000},
    {display: '$1,000 - $5,000', min: 1000, max: 5000},
    {display: '$5,000 - $10,000', min: 5000, max: 10000},
    {display: '$10,000 - $20,000', min: 10000, max: 20000},
    {display: '$20,000 - $40,000', min: 20000, max: 40000},
    {display: '$40,000 - $60,000', min: 40000, max: 60000},
    {display: '$60,000 - $100,000', min: 60000, max: 100000},
  ];
  minYears: number[] = [];
  maxYears: number[] = [];
  maxYearOption!: number;
  minYearOption!: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Filter) {

  }

  ngOnInit(): void {
    let currentYear = new Date().getFullYear();
    this.minYearOption = currentYear - 30;
    this.maxYearOption = currentYear;
    this.getYearsInRange(this.data.minYear, this. data.maxYear);
    this.getYearsInRange(this.data.minYear, this. data.maxYear);
    this.setUpPriceMap();
  }

  getYearsInRange(min: number, max: number): void{
    let years = [];
    for (let y = min; y <= max; y++){
      years.push(y);
    }
    this.minYears = years;
    this.maxYears = years;
  }

  updateMaxYear(): void {
    let newYearOptions = [];
    for(let y = this.data.minYear; y <= this.maxYearOption; y++){
      newYearOptions.push(y);
    }
    this.maxYears = newYearOptions;
  }

  updateMinYear(): void {
    let newYearOptions = [];
    for(let y = this.minYearOption; y <= this.data.maxYear; y++){
      newYearOptions.push(y);
    }
    this.minYears = newYearOptions;
  }

  filterColor(color: any) {
    if (color.checked) {
      if(this.data.colorFilter[0] == 'all'){
        this.data.colorFilter = [];
      }
      this.data.colorFilter.push(color.source.value);
    }
    else{
      this.data.colorFilter = this.data.colorFilter.filter((c) => (c !== color.source.value));
      if(this.data.colorFilter.length == 0){
        this.data.colorFilter.push('all');
      }
    }
    console.log(this.data.colorFilter);
  }

  checkState(input: any){
    if(this.data.colorFilter.includes(input)){
      return true;
    }

    if(this.data.priceRanges.includes(this.priceMap[input])){
      return true;
    }
    return false;
  }

  clearFilters() {
    console.log("clearing filters");
    this.data.colorFilter = ['all'];
    this.data.minYear = this.minYearOption;
    this.updateMaxYear();
    this.data.maxYear = this.maxYearOption;
    this.updateMinYear();
    this.data.priceRanges = [{min: 0, max: 100000}];
  }

  filterPrice(range: any) {
    if (range.checked) {
      if(this.data.priceRanges[0].min == 0 && this.data.priceRanges[0].max == 100000){
        this.data.priceRanges = [];
      }
      this.data.priceRanges.push(this.priceMap[range.source.value]);
    }
    else{
      this.data.priceRanges = this.data.priceRanges.filter((r) => (r.min != this.priceMap[range.source.value].min));
      if(this.data.priceRanges.length == 0){
        this.data.priceRanges.push({min: 0, max: 100000});
      }
    }
    console.log(this.data.priceRanges);
  }

  private setUpPriceMap() {
    for(let i = 0; i < this.prices.length; i++){
      let newMin = this.prices[i].min;
      let newMax = this.prices[i].max;
      let newRangeName = this.prices[i].display;
      this.priceMap[newRangeName] = {min: newMin, max: newMax};
      this.priceRangeNames.push(newRangeName)
    }
  }
}
