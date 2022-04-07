import { DatePipe } from '@angular/common';
import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Appointment } from '../interfaces/Appointment';
import { Invoice } from '../interfaces/Invoice';
import {Vehicle} from '../interfaces/Vehicle';
import { AppointmentService } from '../services/appointment.service';
import { AuthenticationService } from '../services/authentication.service';
import { InvoiceService } from '../services/invoice.service';
import { VehiclesService } from '../services/vehicles.service';


@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.css']
})
export class VehicleViewComponent implements OnInit {
  signed_in?:boolean
  subscription!: Subscription;
  signInMessage = false;

  noWeight = false;
  noColour = false;
  noSpeed = false;

  bookDrive = false;

  selectedDate: any;
  today!: Date;
  date!: any;
  preExistingAppointment: boolean = false;
  time = 0;
  confirmationMessage = false;
  purchaseMessage = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Vehicle,
    public authService: AuthenticationService,
    public datepipe: DatePipe,
    public appointmentService: AppointmentService,
    private router: Router,
    private invoiceService: InvoiceService,
    private vehicleService: VehiclesService
  ) {
    if(data.colour == 'none'){
      this.noColour = true;
    }
    if(data.topSpeed == 0){
      this.noSpeed = true;
    }
    if(data.weight == 0){
      this.noWeight = true;
    }
  }

  ngOnInit(): void {
    this.signed_in = this.authService.signedIn();
    console.log(this.signed_in);
    
  }

  bookTestDrive(){
    this.bookDrive = true;
  }

  

  onPurchase(): void{
    console.log('Purchase Vehicle')

    this.invoiceService.getInvoices().subscribe((invoices) => {
      let new_invoice:Invoice = {
        Invoice_num: 0,
        Amount: this.data.price,
        custEmail: this.authService.getProfile().email,
        depNum: 0,
        notes: 'Make: '+this.data.make+'   PlateNum:'+this.data.plateNum+'   Colour: '+this.data.colour,
        date: this.getDate()
      };
      if(invoices.length > 0){
        new_invoice.Invoice_num = invoices.length;
      }

      this.invoiceService.postInvoice(new_invoice).subscribe((invoice) => {return;});
      return;
    });
    this.vehicleService.deleteVehicle(this.data.plateNum).subscribe(() => {
      this.router.navigate(['/loading-page']);
      return;
    });
  }

  getDate(): string {
    this.date=new Date();
    return <string>this.datepipe.transform(this.date, "yyyy-MM-dd");
  }

  allFilled(): boolean {
    let today = new Date(this.getDate());
    let minDate = today.setDate(today.getDate() + 7)
    if(this.selectedDate == null || this.selectedDate.valueOf() <= minDate.valueOf()){
      return false;
    }
    // @ts-ignore
    if(this.time == 0){
      return false;
    }
    return true;
  }

  onSubmit() {
    console.log(this.selectedDate.format("yyyy-MM-dd"));
    console.log(this.time);

    let newAppointment:Appointment = {
      cust_email: this.authService.getProfile().email,
      date: this.getDate(),
      time: this.time,
      depNum: 0,
      description: 'Test Drive with '+this.data.make+' ('+this.data.plateNum+').'
    }

    this.appointmentService.postAppointment(newAppointment).pipe(
      take(1),
      
    ).subscribe((response) => {
      this.preExistingAppointment = this.appointmentService.alreadyHasAppointment();
      if(this.preExistingAppointment){
        console.log('Already has booked appointment Ask to');
        
        this.appointmentService.deleteAppointment(newAppointment).subscribe(()=>{
          this.appointmentService.postAppointment(newAppointment).subscribe((response)=>{
            console.log('overwritten');
            return;
          });
          return;
        })
        return;
      }
      else{
        this.router.navigate(['/']);
        return;
      }
    })
  }
}
