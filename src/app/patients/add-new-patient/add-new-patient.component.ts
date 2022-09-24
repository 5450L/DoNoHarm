import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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

  newPatientForm: FormGroup;

  constructor(
    private patientsService: PatientsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.newPatientForm = new FormGroup({
      patientData: new FormGroup({
        patientName: new FormControl(null, Validators.required),
        patientSecondName: new FormControl(null, Validators.required),
        patientLastName: new FormControl(null, Validators.required),
      }),
      diseases: new FormArray([]),
      prescriptions: new FormArray([]),
    });
  }

  onAddDisease() {
    let control = new FormControl(null, Validators.required);
    (<FormArray>this.newPatientForm.get('diseases')).push(control);
  }
  get diseases() {
    return (this.newPatientForm.get('diseases') as FormArray).controls;
  }

  onAddPrescription() {
    let control = new FormControl(null, Validators.required);
    (<FormArray>this.newPatientForm.get('prescriptions')).push(control);
  }
  get prescriptions() {
    return (this.newPatientForm.get('prescriptions') as FormArray).controls;
  }

  addPatient() {
    console.log(this.newPatient);
    this.newPatient = {
      fullName: {
        name: this.newPatientForm.get('patientData').get('patientName').value,
        surname: this.newPatientForm.get('patientData').get('patientSecondName')
          .value,
        lastname: this.newPatientForm.get('patientData').get('patientLastName')
          .value,
      },
      diseases: this.newPatientForm.get('diseases').value,
      currentPrescriptions: this.newPatientForm.get('prescriptions').value,
    };

    // this.newPatient.currentPrescriptions = this.newPrescriptions;
    this.patientsService.addToPatients(this.newPatient);
    this.newPatientForm.reset();
    this.ngOnInit();
    // this.router.navigate(['my-patients'])
  }
}
