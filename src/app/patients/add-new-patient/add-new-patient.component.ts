import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
export class AddNewPatientComponent implements OnInit, DoCheck{
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

  patientData: FormGroup = new FormGroup({
    patientName: new FormControl(null, Validators.required),
    patientSecondName: new FormControl(null, Validators.required),
    patientLastName: new FormControl(null, Validators.required),
  });

  diseasesArray: FormArray = new FormArray(<never>[]);
  prescriptionsArray: FormArray = new FormArray(<never>[]);

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.newPatientForm = new FormGroup({
      patientData: this.patientData,
      diseases: this.diseasesArray,
      prescriptions: this.prescriptionsArray,
    });
  }

  ngDoCheck(): void {
    this.prescriptionsArray.controls.forEach(control => {
      control.updateValueAndValidity();
    });

    this.diseasesArray.controls.forEach(control =>{
      control.updateValueAndValidity();
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
    let control = new FormControl(null, [
      Validators.required,
      this.checkForCompatibility.bind(this),
    ]);
     this.prescriptionsArray.push(control);
  }
  onDeletePrescription(index: number) {
    this.prescriptionsArray.removeAt(index);
    this.newPatientForm.updateValueAndValidity();
  }

  addPatient() {
    // for(let i = 0; i < this.newPatient.diseases.length; i++){
    //   this.newPatient.diseases[i]. = this.transformStringForDatabase(this.newPatient.diseases)
    // }
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
          name: this.transformStringForDB(
            this.newPatientForm.get('patientData')?.get('patientName')?.value
          ),
          surname: this.transformStringForDB(
            this.newPatientForm.get('patientData')?.get('patientSecondName')
              ?.value
          ),
          lastname: this.transformStringForDB(
            this.newPatientForm.get('patientData')?.get('patientLastName')
              ?.value
          ),
        },
        diseases: this.transformStringArrayForDB(
          this.newPatientForm.get('diseases')?.value
        ),
        currentPrescriptions: this.transformStringArrayForDB(
          this.newPatientForm.get('prescriptions')?.value
        ),
      })
    );

    this.newPatientForm.reset();
    this.diseasesArray.controls = [];
    this.prescriptionsArray.controls = [];
    alert('Patient added');
  }

  transformStringForDB(str: string) {
    let transformedString: string;

    transformedString = str[0].toUpperCase() + str.substring(1).toLowerCase();
    return transformedString;
  }
  transformStringArrayForDB(str: string[]) {
    for (let i = 0; i < str.length; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substring(1).toLowerCase();
    }
    return str;
  }

  checkForCompatibility(control: FormControl): { [s: string]: boolean } | null {
    let _preps: any = [];

    let contrSubs: string[] = [];
    let contrDiseases: string[] = [];

    onValue(ref(this.dataBase, '/preps'), (preps) => {
      _preps = preps.val();
      for (let i = 0; i < _preps.length; i++) {
        if (control.value === _preps[i].name) {
          if (_preps[i].contr.substances) {
            contrSubs = _preps[i].contr.substances;
          }
          if (_preps[i].contr.diseases) {
            contrDiseases = _preps[i].contr.diseases;
          }
        }
      }
    });

    for (let i = 0; i < contrSubs.length; i++) {
      for (let j = 0; j < this.prescriptionsArray.controls.length; j++) {
        if (contrSubs[i] === this.prescriptionsArray.controls[j].value) {
          return { Inappropriate: true };
        } else {
          continue;
        }
      }
    }

    for (let i = 0; i < contrDiseases.length; i++) {
      for (let j = 0; j < this.diseasesArray.controls.length; j++) {
        if (contrDiseases[i] === this.diseasesArray.controls[j].value) {
          return { Inappropriate: true };
        } else {
          continue;
        }
      }
    }
    return null;
  }
}
