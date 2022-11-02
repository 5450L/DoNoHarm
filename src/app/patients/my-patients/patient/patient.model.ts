export class Patient {
  public fullName: {
    name: string;
    surname: string;
    lastname: string;
  };
  public diseases: string[];
  public prescriptions: string[];

  constructor(
    fullName: { name: string; surname: string; lastname: string },
    diseases: string[],
    prescriptions: string[]
  ) {
    this.fullName = fullName;
    this.diseases = diseases;
    this.prescriptions = prescriptions;
  }
}
