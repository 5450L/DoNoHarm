import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {
  DataSnapshot,
  getDatabase,
  onValue,
  ref,
  set,
} from 'firebase/database';
import { Subscription } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { DataService } from '../data.service';
import { PatientsService } from '../patients.service';
import { Patient } from './patient/patient.model';

@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.css'],
})
export class MyPatientsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  myPatients: Patient[] = [];
  dataBase = getDatabase();

  constructor(
    private db: AngularFireDatabase,
    private patientsService: PatientsService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.loadPatients();
    this.patientsService.patientsChanged.subscribe((patients) => {
      this.myPatients = patients;
      console.log(this.myPatients);
    });
    // onValue(ref(this.dataBase, '/patients'), (patients) => {
    //   this.myPatients = patients.val();
    // });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
