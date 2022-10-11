import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getDatabase, onValue, push, ref, update } from 'firebase/database';
import { Patient } from '../my-patients/patient/patient.model';

@Component({
  selector: 'app-add-new-patient',
  templateUrl: './add-new-patient.component.html',
  styleUrls: ['./add-new-patient.component.css'],
})
export class AddNewPatientComponent implements OnInit {
  dataBase = getDatabase();

  newPatient = {
    fullName: {
      name: '',
      surname: '',
      lastname: '',
    },
    diseases: [''],
    currentPrescriptions: [''],
  };

  newPatientForm: FormGroup = new FormGroup({});

  diseasesArray: FormArray = new FormArray(<never>[]);
  prescriptionsArray: FormArray = new FormArray(<never>[]);

  constructor(
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.newPatientForm = new FormGroup({
      patientData: new FormGroup({
        patientName: new FormControl(null, Validators.required),
        patientSecondName: new FormControl(null, Validators.required),
        patientLastName: new FormControl(null, Validators.required),
      }),
      diseases: this.diseasesArray,
      prescriptions: this.prescriptionsArray,
    });
  }

  onAddDisease() {
    let control = new FormControl(null, Validators.required);
    this.diseasesArray.push(control);
  }
  onDeleteDisease(index: number) {
    this.diseasesArray.removeAt(index);
  }

  onAddPrescription() {
    let control = new FormControl(null, Validators.required);
    this.prescriptionsArray.push(control);
  }
  onDeletePrescription(index: number) {
    this.prescriptionsArray.removeAt(index);
  }

  addPatient() {
    let id = 0;
    onValue(ref(this.dataBase, '/patients/'), (patients) => {
      let check: boolean = true;
      while (check === true) {
        check = patients.hasChild('' + id);
        if (check === true) {
          id++;
        }
      }
    });
    update(
      ref(this.dataBase, '/patients/' + id),
      (this.newPatient = {
        fullName: {
          name: this.newPatientForm.get('patientData')?.get('patientName')
            ?.value,
          surname: this.newPatientForm
            .get('patientData')
            ?.get('patientSecondName')?.value,
          lastname: this.newPatientForm
            .get('patientData')
            ?.get('patientLastName')?.value,
        },
        diseases: this.newPatientForm.get('diseases')?.value,
        currentPrescriptions: this.newPatientForm.get('prescriptions')?.value,
      })
    );

    alert('Patient added');
    this.newPatientForm.reset();
    this.diseasesArray.controls = [];
    this.prescriptionsArray.controls = [];
  }
}
