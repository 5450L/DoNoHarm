import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddNewPatientComponent } from './patients/add-new-patient/add-new-patient.component';
import { MyPatientsComponent } from './patients/my-patients/my-patients.component';
import { PatientComponent } from './patients/my-patients/patient/patient.component';
import { PatientsService } from './patients/my-patients/patients.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    MyPatientsComponent,
    AddNewPatientComponent,
    PatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [PatientsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
