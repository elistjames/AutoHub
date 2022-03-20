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



const routes: Routes = [
  {path: '', component: ContentComponent},
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'post-vehicle', component: PostVehicleComponent },
  { path: 'appointment', component: AppointmentComponent },
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
    SearchComponent
  ],
  imports: [
    BrowserModule,
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
  ],
  exports: [RouterModule],
  providers: [AuthenticationService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

//Primary theme color: #c50061
