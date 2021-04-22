import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { Affirmation } from '../../affirmation.model';
import { AffirmationService } from '../../affirmation.service';

@Component({
  selector: 'ezo-affirmation-item',
  templateUrl: './affirmation-item.component.html',
  styleUrls: ['./affirmation-item.component.scss']
})
export class AffirmationItemComponent {
  @Input() affirmation: Affirmation;
  @Input() checked: boolean = false;
  @Output() affirmationSelected = new EventEmitter<void>();
  @Output() affirmationChecked = new EventEmitter<boolean>();

  constructor(public affService: AffirmationService) {}

  @HostListener('click', ['$event'])
  onSelected(event: Event) {
    this.affirmationSelected.emit();
  }

  checkUncheck(event: Event) {
    event.stopPropagation();
    this.affirmationChecked.emit(!this.checked);
  }
}
