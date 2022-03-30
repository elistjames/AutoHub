import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLoadingPageComponent } from './employee-loading-page.component';

describe('EmployeeLoadingPageComponent', () => {
  let component: EmployeeLoadingPageComponent;
  let fixture: ComponentFixture<EmployeeLoadingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeLoadingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLoadingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
