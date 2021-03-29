import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'projects/my-epic-app/src/app/shared/services/user';
import { Observable } from 'rxjs';

import { AuthService } from '../../../../../shared/services/auth.service';
import { Affirmation } from './affirmation.model';

@Injectable({
  providedIn: 'root'
})
export class AffirmationService {
  constructor(private afs: AngularFirestore, private auth: AuthService) {}
  kotek: Observable<any[]> = this.auth.usersAffirmations$;
  affRef: Observable<any> = this.auth.userAffirmationsForEdit$;
  user$: Observable<User> = this.auth.user$;
  userUID: string = this.auth.userUID;

  deleteDocByID(aff: any) {
    console.log(this.userUID);
    Object.keys(aff).forEach((id) => {
      if (aff[id].checked === true) {
        return this.afs
          .doc<User>(`users/${this.userUID}`)
          .collection<any>('affirmations')
          .doc<Affirmation>(id)
          .update({ name: 'kwiatki' });
      } else {
        return console.log('not deleted');
      }
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
