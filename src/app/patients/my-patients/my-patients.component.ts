import { Component, OnInit } from '@angular/core';
import { Patient } from './patient/patient.model';
import { PatientsService } from './patients.service';

@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.css']
})
export class MyPatientsComponent implements OnInit {
myPatients:Patient[] = this.patientsService.patients;

  constructor(private patientsService:PatientsService) { }

  ngOnInit(): void {
  }

}
