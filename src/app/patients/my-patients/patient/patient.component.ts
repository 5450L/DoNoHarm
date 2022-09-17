import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../patients.service';
import { Patient } from './patient.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  
  patient: Patient = this.patientsService.patients[0];
  constructor(private patientsService:PatientsService) {}

  ngOnInit(): void {}
}
