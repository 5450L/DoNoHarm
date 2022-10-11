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
  patientData = new FormGroup({
    patientName: new FormControl<string | null>(<never>null),
    patientSecondName: new FormControl<string | null>(<never>null),
    patientLastName: new FormControl<string | null>(<never>null),
  });
  chosenPatientId!: number;
  editPatientForm: FormGroup = new FormGroup({});
  diseasesArray: FormArray = new FormArray(<never>[]);
  prescriptionsArray: FormArray = new FormArray(<never>[]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.chosenPatientId = +this.route.snapshot.params['id'];

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
            this.chosenPatient.diseases[i],
            Validators.required
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
            this.chosenPatient.currentPrescriptions[i],
            Validators.required
          );
          this.prescriptionsArray.push(control);
        }
      }

      if (this.chosenPatient.fullName) {
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
      }

      this.editPatientForm = new FormGroup({
        patientData:this.patientData
        
        //  new FormGroup({
        //   patientName: new FormControl(
        //     this.patient.fullName.name,
        //     Validators.required
        //   ),
        //   patientSecondName: new FormControl(
        //     this.patient.fullName.surname,
        //     Validators.required
        //   ),
        //   patientLastName: new FormControl(
        //     this.patient.fullName.lastname,
        //     Validators.required
        //   ),
        // })
        ,
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
    update(
      ref(this.dataBase, '/patients/' + this.chosenPatientId),
      (this.patient = {
        fullName: {
          name: this.editPatientForm.get('patientData')?.get('patientName')
            ?.value,
          surname: this.editPatientForm
            .get('patientData')
            ?.get('patientSecondName')?.value,
          lastname: this.editPatientForm
            .get('patientData')
            ?.get('patientLastName')?.value,
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
}
