export class Patient {
  public fullName: {
    name: string;
    surname: string;
    lastname: string;
  };
  public diseases: string[];
  public currentPrescriptions: string[];

  constructor(
    fullName: { name: string; surname: string; lastname: string },
    diseases: string[],
    currentPrescriptions: string[]
  ) {
    this.fullName = fullName;
    this.diseases = diseases;
    this.currentPrescriptions = currentPrescriptions;
  }
}
