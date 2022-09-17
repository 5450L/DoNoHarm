import { Patient } from './patient/patient.model';

export class PatientsService {
  defaultDiseases: string[] = ['Default disease'];
  defaultPrescriptions: string[] = ['Default prescriptions'];

  public patients: Patient[] = [
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
  
}
