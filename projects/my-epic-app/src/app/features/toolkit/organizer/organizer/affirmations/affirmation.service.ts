import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'projects/my-epic-app/src/app/shared/services/user';
import { Observable } from 'rxjs';

import { AuthService } from '../../../../../shared/services/auth.service';
import { Affirmation } from './affirmation.model';

@Injectable({
  providedIn: 'root'
})
export class AffirmationService {
  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private afAuth: AngularFireAuth
  ) {}
  kotek: Observable<any[]> = this.auth.usersAffirmations$;
  affRef: Observable<any> = this.auth.userAffirmationsForEdit$;
  user$: Observable<User> = this.auth.user$;
  userUID: string = this.auth.userUID;

  // updateDoc(_id: string, _value: boolean) {
  //   let doc = this.afs.collection('affirmations', (ref) =>
  //     ref.where('id', '==', _id)
  //   );
  //   doc.snapshotChanges().subscribe((res: any) => {
  //     // let id = res.payload.doc.id;
  //     this.afs.collection('affirmations').doc(_id).update({ checked: _value });
  //   });
  // }

  updateDocByID(id: string, value: boolean) {
    console.log(this.userUID);
    return this.afs
      .doc<User>(`users/${this.userUID}`)
      .collection<any>('affirmations')
      .doc<Affirmation>(id)
      .update({ checked: value });
  }
  // isChecked(id: string, value: boolean) {
  //   console.log(this.userUID);
  //   //

  // }

  // update(id: string, data: any): Promise<void> {
  //  this.affRef.pipe(switchMap(id: string, data:any))
  //   this.tutorialsRef.doc(id).update(data);
  // }
  //   updateTutorial(): void {
  //     const data = {
  //       title: this.currentTutorial.title,
  //       description: this.currentTutorial.description
  //     };

  //     this.tutorialService.update(this.currentTutorial.id, data)
  //       .then(() => this.message = 'The tutorial was updated successfully!')
  //       .catch(err => console.log(err));
  //   }

  //   SetUserData(user) {
  //     const userRef: AngularFirestoreDocument<User> = this.afs.doc(
  //       `users/${user.uid}`
  //     );

  //     const data = {
  //       uid: user.uid,
  //       email: user.email,
  //       displayName: user.displayName,
  //       photoURL: user.photoURL,
  //       createdAt: user.createdAt
  //     };

  //     return userRef.set(data, { merge: true });
  //   }
}
