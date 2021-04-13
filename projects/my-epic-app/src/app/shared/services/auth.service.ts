// import { Injectable, NgZone } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { Router } from '@angular/router';
// import firebase from 'firebase/app';
// import { Observable, of } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../services/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<User>;
  usersAffirmations$: Observable<any>;
  userAffirmationsForEdit$: Observable<any>;
  userUID: string;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // Logged in
        if (user) {
          this.userUID = user.uid;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );

    this.usersAffirmations$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // Logged in
        if (user) {
          return this.afs
            .doc<User>(`users/${user.uid}`)
            .collection<any>('affirmations')
            .valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );

    this.userAffirmationsForEdit$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // Logged in
        if (user) {
          return this.afs
            .doc<User>(`users/${user.uid}`)
            .collection<any>('affirmations')
            .snapshotChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }
  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return (
      this.updateUserData(credential.user),
      this.router.navigate(['/dashboard/home'])
    );
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date())
    };

    return userRef.set(data, { merge: true });
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: user.createdAt
    };

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/sign-in']);
  }
}
