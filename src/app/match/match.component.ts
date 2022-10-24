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
    this.prepExists = false;
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
    this.prepName = '';
    this.prepGroup = '';
    this.prepContrSubs = [];
    this.prepContrDiseases = [];
    
    onValue(ref(this.dataBase, '/preps'), (snapshot) => {
      snapshot.val().forEach((prep: any) => {
        if (prep.name === this.matchForm.get('prepInput')?.value) {
          this.prepExists = true;
          this.prepName = this.transformStringForDatabase(prep.name);
          this.prepGroup = this.transformStringForDatabase(prep.group);

          for (let i = 1; i < prep.contr.substances.length; i++) {
            this.prepContrSubs?.push(
              this.transformStringForDatabase(prep.contr.substances[i])
            );
          }

          for (let i = 1; i < prep.contr.diseases.length; i++) {
            this.prepContrDiseases?.push(
              this.transformStringForDatabase(prep.contr.diseases[i])
            );
          }
        }
      });
    });
  }

  transformStringForDatabase(str: string) {
    let transformedString: string;

    transformedString = str[0].toUpperCase() + str.substring(1).toLowerCase();
    return transformedString;
  }
}
