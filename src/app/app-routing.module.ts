import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MatchComponent } from './match/match.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddNewPatientComponent } from './patients/add-new-patient/add-new-patient.component';
import { MyPatientsComponent } from './patients/my-patients/my-patients.component';
import { PatientComponent } from './patients/my-patients/patient/patient.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'app-my-patients', component: MatchComponent },
  {
    path: 'my-patients',
    component: MyPatientsComponent,
  },
  { path: 'my-patients/:id', component: PatientComponent },
  { path: 'add-new-patient', component: AddNewPatientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
