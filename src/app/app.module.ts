import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddNewPatientComponent } from './patients/add-new-patient/add-new-patient.component';
import { MyPatientsComponent } from './patients/my-patients/my-patients.component';
import { PatientComponent } from './patients/my-patients/patient/patient.component';
import { PatientsService } from './patients/my-patients/patients.service';
import { MatchComponent } from './match/match.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    MyPatientsComponent,
    AddNewPatientComponent,
    PatientComponent,
    MatchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // Only required for database features
    AngularFireAuthModule, // Only required for auth features,
    AngularFireStorageModule, // Only required for storage features
    AngularFireDatabaseModule
  ],
  providers: [PatientsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
