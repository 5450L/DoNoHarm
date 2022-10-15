import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { getDatabase, onValue, ref, remove, update } from 'firebase/database';
import { Patient } from './patient.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  chosenPatient!: Patient;
  dataBase = getDatabase();

  patient!: Patient;
  chosenPatientId!: number;
  editPatientForm: FormGroup = new FormGroup({});
  diseasesArray: FormArray = new FormArray(<never>[]);
  prescriptionsArray: FormArray = new FormArray(<never>[]);

  regularExpression = '^[A-Z][a-z]*$'

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.chosenPatientId = +this.route.snapshot.params['id'];
    this.editPatientForm = new FormGroup({
      patientData: new FormGroup({
        patientName: new FormControl(null),
        patientSecondName: new FormControl(null),
        patientLastName: new FormControl(null),
      }),
      diseases: this.diseasesArray,
      prescriptions: this.prescriptionsArray,
    });

    onValue(ref(this.dataBase, '/patients'), (patients) => {
      this.chosenPatient = patients.val()[this.chosenPatientId];
      if (this.chosenPatient) {
        this.patient = this.chosenPatient;
      } else {
        this.router.navigate(['/my-patients']);
      }

      if (this.chosenPatient.diseases) {
        for (let i = 0; i < this.chosenPatient.diseases.length; i++) {
          let control = new FormControl(
            this.transformStringForDatabase(this.chosenPatient.diseases[i]),
            Validators.required,
          );
          this.diseasesArray.push(control);
        }
      }

      if (this.chosenPatient.currentPrescriptions) {
        for (
          let i = 0;
          i < this.chosenPatient.currentPrescriptions.length;
          i++
        ) {
          let control = new FormControl(
            this.transformStringForDatabase(this.chosenPatient.currentPrescriptions[i]),
            Validators.required
          );
          this.prescriptionsArray.push(control);
        }
      }

      this.editPatientForm = new FormGroup({
        patientData: new FormGroup({
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
        }),
        diseases: this.diseasesArray,
        prescriptions: this.prescriptionsArray,
      });
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

  editPatient() {
    this.router.navigate(['/my-patients']);
    this.transformStringForDatabase('sLAVA');
    update(
      ref(this.dataBase, '/patients/' + this.chosenPatientId),
      (this.patient = {
        fullName: {
          name: this.transformStringForDatabase(this.editPatientForm.get('patientData')?.get('patientName')
            ?.value),
          surname: this.transformStringForDatabase(this.editPatientForm
            .get('patientData')
            ?.get('patientSecondName')?.value),
          lastname: this.transformStringForDatabase(this.editPatientForm
            .get('patientData')
            ?.get('patientLastName')?.value),
        },
        diseases: this.editPatientForm.get('diseases')?.value,
        currentPrescriptions: this.editPatientForm.get('prescriptions')?.value,
      })
    );
  }

  onDeletePatient() {
    this.router.navigate(['/my-patients']);
    remove(ref(this.dataBase, '/patients/' + this.chosenPatientId));
  }

  transformStringForDatabase(str: string) {
    let transformedString: string;

    transformedString = str[0].toUpperCase() + str.substring(1).toLowerCase();
    console.log(transformedString);
    return transformedString;
  }
}
