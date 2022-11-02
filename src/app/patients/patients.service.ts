import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from './data.service';
import { Patient } from './my-patients/patient/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private patients: Patient[] = [];

  patientsChanged = new Subject<Patient[]>();

  constructor() {}

  setPatients(patients: Patient[]) {
    this.patients = patients;
    if (patients) {
      this.patientsChanged?.next(this.patients.slice());
      console.log('patients service ' + this.patients);
    }
  }

  getPatients(): Patient[] {
    console.log('getPatient worked');
    console.log(this.patients);
    if (this.patients) {
      return this.patients.slice();
    }
    let empty: Patient[] = [];
    return empty;
  }

  addPatient(patient: Patient) {
    this.patients.push(patient);
    console.log(this.patients);

    if (this.patients) {
      this.patientsChanged?.next(this.patients.slice());
    }
  }

  deletePatient(id: number) {
    this.patients.splice(id, 1);
    if (this.patients) {
      this.patientsChanged?.next(this.patients.slice());
    }
  }
}
