import { Component, DoCheck, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { getDatabase, onValue, ref, remove, update } from 'firebase/database';
import { DataService } from '../../data.service';
import { PatientsService } from '../../patients.service';
import { Patient } from './patient.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  dataBase = getDatabase();
  patients: Patient[] = [];

  patient!: Patient;
  chosenPatient!: Patient;
  chosenPatientId!: number;

  editPatientForm: FormGroup = new FormGroup({});

  patientData: FormGroup = new FormGroup({
    patientName: new FormControl(),
    patientSecondName: new FormControl(),
    patientLastName: new FormControl(),
  });

  diseasesArray: FormArray = new FormArray(<never>[]);
  prescriptionsArray: FormArray = new FormArray(<never>[]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase,
    private patientsService: PatientsService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.chosenPatientId = +this.route.snapshot.params['id'];
    this.editPatientForm = new FormGroup({
      patientData: this.patientData,
      diseases: this.diseasesArray,
      prescriptions: this.prescriptionsArray,
    });

    // onValue(ref(this.dataBase, '/patients'), (patients) => {
    this.chosenPatient =
      this.patientsService.getPatients()[this.chosenPatientId];
    if (this.chosenPatient) {
      this.patient = this.chosenPatient;
    } else {
      this.router.navigate(['/my-patients']);
    }

    this.patientData = new FormGroup({
      patientName: new FormControl(
        this.patient.fullName.name,
        Validators.required
      ),
      patientSecondName: new FormControl(
        this.patient.fullName.surname,
        Validators.required
      ),
      patientLastName: new FormControl(
        this.patient.fullName.lastname,
        Validators.required
      ),
    });

    if (this.chosenPatient.diseases) {
      for (let i = 0; i < this.chosenPatient.diseases.length; i++) {
        let control = new FormControl(
          this.transformStringForDatabase(this.chosenPatient.diseases[i]),
          Validators.required
        );
        this.diseasesArray.push(control);
      }
    }

    if (this.chosenPatient.prescriptions) {
      for (let i = 0; i < this.chosenPatient.prescriptions.length; i++) {
        let control = new FormControl(
          this.transformStringForDatabase(this.chosenPatient.prescriptions[i]),
          [Validators.required, this.checkForCompatibility.bind(this)]
        );
        this.prescriptionsArray.push(control);
      }
    }

    this.editPatientForm = new FormGroup({
      patientData: this.patientData,
      diseases: this.diseasesArray,
      prescriptions: this.prescriptionsArray,
    });
    // });
  }

  ngDoCheck(): void {
    this.prescriptionsArray.controls.forEach((control) => {
      control.updateValueAndValidity();
    });

    this.diseasesArray.controls.forEach((control) => {
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
  }

  editPatient() {
    update(
      ref(this.dataBase, '/patients/' + this.chosenPatientId),
      (this.patient = this.editPatientForm.value)
    );
    this.router.navigate(['/my-patients']);
  }

  onDeletePatient() {
    this.patientsService.deletePatient(this.chosenPatientId);
    update(ref(this.dataBase), {
      patients: this.patientsService.getPatients(),
    });
    this.router.navigate(['/my-patients']);
  }

  transformStringForDatabase(str: string) {
    let transformedString: string;

    transformedString = str[0].toUpperCase() + str.substring(1).toLowerCase();
    return transformedString;
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
