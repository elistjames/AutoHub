import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-loading-page',
  templateUrl: './employee-loading-page.component.html',
  styleUrls: ['./employee-loading-page.component.css']
})
export class EmployeeLoadingPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => { this.router.navigate(['/employee-page']); }, 1500);
  }

}
