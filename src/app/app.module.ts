import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ContentComponent } from './content/content.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignInDialogComponent } from './sign-in-dialog/sign-in-dialog.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleViewComponent } from './vehicle-view/vehicle-view.component';
import { PostVehicleComponent } from './post-vehicle/post-vehicle.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import {MatStepperModule} from "@angular/material/stepper";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSliderModule} from "@angular/material/slider";
import { AppointmentComponent } from './appointment/appointment.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { VehiclesService } from './services/vehicles.service';
import { ProfileComponent } from './profile/profile.component';
import {HammerModule } from '@angular/platform-browser'
import { EmployeeService } from './services/employee.service';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { LoadingPageComponent } from './visuals/loading-page/loading-page.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PartsComponent } from './parts/parts.component';
import { PartComponent } from './part/part.component';
import { PartViewComponent } from './part-view/part-view.component';
import { PostPartComponent } from './post-part/post-part.component';
import { EmployeeLoadingPageComponent } from './visuals/employee-loading-page/employee-loading-page.component';
import { StaffComponent } from './staff/staff.component';
import { EmployeeComponent } from './employee/employee.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentViewComponent } from './appointment-view/appointment-view.component';
import { PartsLoadingPageComponent } from './visuals/parts-loading-page/parts-loading-page.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';
import { InvoiceService } from './services/invoice.service';
import { AppointmentService } from './services/appointment.service';
import { PartService } from './services/part.service';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { SupplierService } from './services/supplier.service';
import { SupplierComponent } from './supplier/supplier.component';



const routes: Routes = [
  {path: '', component: ContentComponent},
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'post-vehicle', component: PostVehicleComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'employee-page', component: EmployeePageComponent },
  { path: 'loading-page', component: LoadingPageComponent },
  { path: 'post-part', component: PostPartComponent },
  { path: 'parts', component: PartsComponent },
  { path: 'employee-loading-page', component: EmployeeLoadingPageComponent },
  { path: 'parts-loading-page', component: PartsLoadingPageComponent },
  { path: 'add-supplier', component: AddSupplierComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContentComponent,
    SignInComponent,
    SignInDialogComponent,
    CreateAccountComponent,
    VehicleComponent,
    VehicleViewComponent,
    PostVehicleComponent,
    AppointmentComponent,
    SearchComponent,
    ProfileComponent,
    EmployeePageComponent,
    EmployeeProfileComponent,
    LoadingPageComponent,
    PartsComponent,
    PartComponent,
    PartViewComponent,
    PostPartComponent,
    EmployeeLoadingPageComponent,
    StaffComponent,
    EmployeeComponent,
    AppointmentsComponent,
    AppointmentViewComponent,
    PartsLoadingPageComponent,
    InvoicesComponent,
    InvoiceViewComponent,
    AddSupplierComponent,
    SupplierComponent,
  ],
  imports: [
    BrowserModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    ImageCropperModule,
    MatStepperModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSliderModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatMomentDateModule,
    HammerModule,
    MatTabsModule,
  ],
  exports: [RouterModule],
  providers: [
    AuthenticationService,
    DatePipe,
    VehiclesService,
    ContentComponent,
    EmployeeService,
    PartsComponent,
    StaffComponent,
    AppointmentsComponent,
    InvoiceService,
    AppointmentService,
    PartService,
    SupplierService,
    AddSupplierComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

//Primary theme color: #c50061
