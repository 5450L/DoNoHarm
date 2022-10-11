import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { DataSnapshot, getDatabase, onValue, ref, set } from 'firebase/database';
import { AppModule } from 'src/app/app.module';
import { Patient } from './patient/patient.model';

@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.css'],
})
export class MyPatientsComponent implements OnInit {
  myPatients: Patient[] = [];
  dataBase = getDatabase();

  constructor(
    private db: AngularFireDatabase
  ) {}

  ngOnInit(): void {
    onValue(ref(this.dataBase, '/patients'), (patients) => {
      this.myPatients = patients.val();
    });
  }
}
