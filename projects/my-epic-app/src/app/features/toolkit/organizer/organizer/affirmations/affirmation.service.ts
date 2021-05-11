import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { User } from 'projects/my-epic-app/src/app/shared/services/user';
import { Observable } from 'rxjs';

import { ModalService } from '../../../../../shared/modal/modal.service';
import { AuthService } from '../../../../../shared/services/auth.service';
import { Affirmation } from './affirmation.model';

@Injectable({
  providedIn: 'root'
})
export class AffirmationService {
  userAffirmations$: Observable<Affirmation[]> = this.auth.usersAffirmations$;
  generalAffirmations$: Observable<Affirmation[]> = this.afs
    .collection<any>('affirmations')
    .valueChanges();
  user$: Observable<User> = this.auth.user$;
  userUID: string = this.auth.userUID;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private modalService: ModalService
  ) {
    // initially load first 5 records/items from database
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  deleteDocsByID(aff: any) {
    console.log(this.userUID);
    aff.forEach((id) => {
      this.afs
        .doc<User>(`users/${this.userUID}`)
        .collection<any>('affirmations')
        .doc<Affirmation>(id)
        .delete();
    });
  }

  deleteDoc(id: string) {
    return this.afs
      .doc<User>(`users/${this.userUID}`)
      .collection<any>('affirmations')
      .doc<Affirmation>(id)
      .delete();
  }

  shareDoc(aff: any) {
    return this.afs
      .collection<any>('affirmations')
      .add(aff)
      .then((docRef) =>
        this.afs
          .collection<any>('affirmations')
          .doc<Affirmation>(docRef.id)
          .update({
            id: docRef.id,
            createdAt: firebase.firestore.Timestamp.fromDate(new Date())
          })
      );
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

  copyDocsByID(aff: any) {
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
  updateDocByID(id: string, value) {
    console.log(this.userUID);
    return this.afs
      .doc<User>(`users/${this.userUID}`)
      .collection<any>('affirmations')
      .doc<Affirmation>(id)
      .update(value);
  }
}
