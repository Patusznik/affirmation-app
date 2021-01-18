import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'ezo-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
