import { AngularFireDatabase } from '@angular/fire/compat/database';
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

export class MatchService {
   
  dbDrugs?:string[];

  dataBase = getDatabase();
  prepRef = ref(this.dataBase);
  constructor(private db: AngularFireDatabase) {}

  

}
