import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { User } from 'projects/my-epic-app/src/app/shared/services/user';
import { Observable } from 'rxjs';

import { AuthService } from '../../../../../../../shared/services/auth.service';
import { Affirmation } from '../../affirmation.model';
import { AffirmationService } from '../../affirmation.service';

@Component({
  selector: 'ezo-affirmation-item',
  templateUrl: './affirmation-item.component.html',
  styleUrls: ['./affirmation-item.component.scss']
})
export class AffirmationItemComponent implements OnInit {
  @Input() affirmation: Affirmation;
  @Input() checked: boolean = false;
  @Output() affirmationSelected = new EventEmitter<void>();
  @Output() affirmationChecked = new EventEmitter<boolean>();

  user$: Observable<User> = this.auth.user$;

  constructor(
    private auth: AuthService,
    public affService: AffirmationService
  ) {}

  ngOnInit(): void {}

  @HostListener('click', ['$event'])
  onSelected(event: Event) {
    this.affirmationSelected.emit();
  }

  checkUncheck() {
    this.affirmationChecked.emit(!this.checked);
  }
}
