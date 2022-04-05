import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parts-loading-page',
  templateUrl: './parts-loading-page.component.html',
  styleUrls: ['./parts-loading-page.component.css']
})
export class PartsLoadingPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => { this.router.navigate(['/parts']); }, 1500);
  }

}
