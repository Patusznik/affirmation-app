import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'ezo-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // user$: Observable<User> = this.auth.user$;

  constructor(public auth: AuthService) {}

  allowPicToChange: boolean = false;
  onProfilePicChange(event) {
    this.allowPicToChange = !this.allowPicToChange;
    console.log(this.allowPicToChange);
  }
  ngOnInit(): void {}
}
