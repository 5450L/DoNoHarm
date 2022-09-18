import { Component, OnInit } from '@angular/core';
import { Patient } from '../my-patients/patient/patient.model';
import { PatientsService } from '../my-patients/patients.service';

@Component({
  selector: 'app-add-new-patient',
  templateUrl: './add-new-patient.component.html',
  styleUrls: ['./add-new-patient.component.css'],
})
export class AddNewPatientComponent implements OnInit {
  newPatient = {
    fullName: {
      name: '',
      surname: '',
      lastname: '',
    },
    diseases: [''],
    currentPrescriptions: [''],
  };

  newPrescriptions: string[] = [''];

  constructor(private patientsService: PatientsService) {}

  ngOnInit() {}

  morePrescriptions() {
    console.log(this.newPatient.currentPrescriptions)
    this.newPrescriptions.push('');
    console.log(this.newPatient.currentPrescriptions)
  }

  addPatient() {
    console.log(this.newPatient);
    // this.newPatient.currentPrescriptions = this.newPrescriptions;
    this.patientsService.addToPatients(this.newPatient);
  }
}
