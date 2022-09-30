import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import * as firebase from 'firebase/compat';
import { child, get, getDatabase, onValue, ref } from 'firebase/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'do-no-harm';
  dataBase = getDatabase();
  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    let prepRef = ref(this.dataBase);
    get(child(prepRef,'preps/steroids/hydrocor')).then((snapshot)=>{
      console.log(snapshot.val());
    })
  }
}
