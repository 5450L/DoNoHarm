import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PatientsService } from '../patients.service';
import { Patient } from './patient.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  patient!: Patient;
  chosenPatientId!: number;
  editPatientForm: FormGroup = new FormGroup({});
  diseasesArray: FormArray = new FormArray(<never>[]);
  prescriptionsArray: FormArray = new FormArray(<never>[]);

  constructor(
    private patientsService: PatientsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.chosenPatientId = +this.route.snapshot.params['id'];
    if (this.patientsService.patients[this.chosenPatientId]) {
      this.patient = this.patientsService.patients[this.chosenPatientId];
    } else {
      this.router.navigate(['/my-patients']);
    }

    this.diseasesArray = this.patientsService.convertDiseasesToFormArray(
      this.patient,
      this.diseasesArray
    );
    this.prescriptionsArray =
      this.patientsService.convertPrescriptionsToFormArray(
        this.patient,
        this.prescriptionsArray
      );
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
    this.patient = {
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
    };

    this.patientsService.patients[this.chosenPatientId] = this.patient;
    this.router.navigate(['/my-patients']);
  }

  onDeletePatient() {
    this.patientsService.deletePatient(this.chosenPatientId);
    this.router.navigate(['/my-patients']);
  }
}
