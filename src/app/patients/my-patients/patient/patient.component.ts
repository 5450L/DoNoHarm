import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { PatientsService } from '../patients.service';
import { Patient } from './patient.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  patient!:Patient;

  constructor(
    private patientsService: PatientsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let chosenPatientId = +this.route.snapshot.params['id'];
    this.patient= this.patientsService.patients[chosenPatientId];
  }
}
