import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'do-no-harm';
  

  // addPrep(prepId:string) {
  //   update(ref(this.dataBase, '/preps/'), {
  //     prepId
  //   });
  // }

  ngOnInit(): void {
    // let newPrep:string = 'morphin';
    // get(child(this.prepRef, `preps/prep${this.id}`)).then((snapshot) => {
    //   console.log(snapshot.val());
    // });

    // let anotherRef = ref(this.dataBase, `preps/prep${this.id}`);
    // onValue(anotherRef, (snapshot) => {
    //   this.data = snapshot.val();
    // });

    // this.addPrep(newPrep);
  }
}
