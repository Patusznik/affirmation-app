import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { AuthService } from '../../../../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AffirmationService {
  constructor(private firestore: AngularFirestore, private auth: AuthService) {}
  user = this.auth.userData;
  kotek: Observable<any[]> = this.auth.usersAffirmations$;
}
