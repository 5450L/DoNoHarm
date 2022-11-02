import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { Patient } from './my-patients/patient/patient.model';
import { PatientsService } from './patients.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // patientsDBUrl: string =
  //   'https://do-no-harm-3a3d3-default-rtdb.europe-west1.firebasedatabase.app/patients.json';

  constructor(
    private http: HttpClient,
    private patientsService: PatientsService
  ) {}

  loadPatients() {
    this.http
      .get<Patient[]>(
        'https://do-no-harm-3a3d3-default-rtdb.europe-west1.firebasedatabase.app/patients.json'
      )
      .subscribe((patients) => {
        this.patientsService.setPatients(patients);
      });
  }

  storePatients() {
    let patients = this.patientsService.getPatients();
    console.log('dataServicce store method');
    console.log(this.patientsService.getPatients());
    this.http
      .put<Patient[]>(
        'https://do-no-harm-3a3d3-default-rtdb.europe-west1.firebasedatabase.app/patients.json',
        patients
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  

  loadPreps() {}
}
