import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getDatabase } from 'firebase/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'do-no-harm';
  data: any[] = [];
  dataBase = getDatabase();
  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.db.list('prep').valueChanges().subscribe(data =>{
      
    })
  }
}
