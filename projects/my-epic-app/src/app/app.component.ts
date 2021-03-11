import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'ezo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-epic-app';
  constructor(private db: AngularFirestore) {
    // const things = db.collection('affirmations').valueChanges();
    // things.subscribe(console.log);
  }
}
