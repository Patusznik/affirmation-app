import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { User } from 'projects/my-epic-app/src/app/shared/services/user';
import { Observable } from 'rxjs';

import { AuthService } from '../../../../../shared/services/auth.service';
import { Affirmation } from './affirmation.model';

@Injectable({
  providedIn: 'root'
})
export class AffirmationService {
  kotek: Observable<Affirmation[]> = this.auth.usersAffirmations$;
  generalAffirmations: Observable<Affirmation[]> = this.afs
    .collection<any>('affirmations')
    .valueChanges();
  affRef: Observable<any> = this.auth.userAffirmationsForEdit$;
  user$: Observable<User> = this.auth.user$;
  userUID: string = this.auth.userUID;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    // initially load first 5 records/items from database
  }

  deleteDocByID(aff: any) {
    console.log(this.userUID);
    aff.forEach((id) => {
      this.afs
        .doc<User>(`users/${this.userUID}`)
        .collection<any>('affirmations')
        .doc<Affirmation>(id)
        .delete();
    });
  }
  createDoc(aff: any) {
    return this.afs
      .doc<User>(`users/${this.userUID}`)
      .collection<any>('affirmations')
      .add(aff)
      .then((docRef) =>
        this.afs
          .doc<User>(`users/${this.userUID}`)
          .collection<any>('affirmations')
          .doc<Affirmation>(docRef.id)
          .update({
            id: docRef.id,
            createdAt: firebase.firestore.Timestamp.fromDate(new Date())
          })
      );
  }

  copyDoc(aff: any) {
    aff.forEach((id) => {
      this.afs
        .collection('affirmations')
        .doc(id)
        .get()
        .toPromise()
        .then((docRef) => {
          const affirmationData = docRef.data();
          const copiedAffirmation = {
            name: affirmationData['name'],
            description: affirmationData['description'],
            type: affirmationData['type'],
            imagePath: affirmationData['imagePath']
          };
          this.createDoc(copiedAffirmation);
        })
        .catch((error) => {});
    });
  }
  // updateDocByID(id: string, value: boolean) {
  //   console.log(this.userUID);
  //   return this.afs
  //     .doc<User>(`users/${this.userUID}`)
  //     .collection<any>('affirmations')
  //     .doc<Affirmation>(id)
  //     .update({ name: 'kwiatki' });
  // }
}
