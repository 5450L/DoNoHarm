import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  child,
  Database,
  get,
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
} from 'firebase/database';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
})
export class MatchComponent implements OnInit {
  dataBase = getDatabase();
  prepRef = ref(this.dataBase);
  prep?: any;
  prepExists = false;
  prepId?: number;
  prepName?: string;
  prepGroup?: string;
  prepContrSubs?: string[] = [];
  prepContrDiseases?: string[] = [];
  names?: string[] = [];

  matchForm: FormGroup = new FormGroup({});
  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    onValue(ref(this.dataBase, '/preps'), (snapshot) => {
      snapshot.val().forEach((prep: any) => {
        this.names?.push(prep.name);
      });
    });
    this.matchForm = new FormGroup({
      prepInput: new FormControl(null, Validators.required),
    });
  }

  onGet() {
    onValue(ref(this.dataBase, '/preps'), (snapshot) => {
      snapshot.val().forEach((prep: any) => {
        if (prep.name === this.matchForm.get('prepInput')?.value) {
          this.prepExists = true;
          this.prepName = prep.name;
          this.prepGroup = prep.group;

          for (let i = 1; i < prep.contr.substances.length; i++) {
            this.prepContrSubs?.push(prep.contr.substances[i]);
          }
          for (let i = 1; i < prep.contr.diseases.length; i++) {
            this.prepContrDiseases?.push(prep.contr.diseases[i]);
            console.log(this.prepContrDiseases);
          }

          console.log(prep);
        }
      });
    });
  }
}
