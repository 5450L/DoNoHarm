import { FormArray, FormControl, Validators } from '@angular/forms';
import { Patient } from './patient/patient.model';

export class PatientsService {
  defaultDiseases: string[] = ['Default disease'];
  defaultPrescriptions: string[] = ['Default prescriptions'];

  private patientsDefault: Patient[] = [
    new Patient(
      { name: 'Fedor', surname: 'Anatoliysson', lastname: 'Tsootsanskiy' },

      this.defaultDiseases,
      this.defaultPrescriptions
    ),
    new Patient(
      { name: 'Darya', surname: 'Alexiyevna', lastname: 'Pokryshkina' },

      this.defaultDiseases,
      this.defaultPrescriptions
    ),
  ];

  public patients = this.patientsDefault;

  addToPatients(patient: Patient) {
    this.patients.push(patient);
  }

  convertDiseasesToFormArray(patient: Patient, diseasesArray: FormArray) {
    for (let i = 0; i < patient.diseases.length; i++) {
      let control = new FormControl(patient.diseases[i], Validators.required);
      diseasesArray.push(control);
    }
    return diseasesArray;
  }

  convertPrescriptionsToFormArray(
    patient: Patient,
    prescriptionsArray: FormArray
  ) {
    for (let i = 0; i < patient.currentPrescriptions.length; i++) {
      let control = new FormControl(
        patient.currentPrescriptions[i],
        Validators.required
      );
      prescriptionsArray.push(control);
    }
    return prescriptionsArray;
  }

  deletePatient(index: number) {
    let ar: number[] = [1, 2, 3, 4];
    ar.splice(0, 1);
    console.log(ar);
    let show = this.patients.splice(index, 1);
    console.log(show);
  }
}
