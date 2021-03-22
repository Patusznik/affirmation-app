import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

import { Affirmation } from '../../affirmation.model';

@Component({
  selector: 'ezo-affirmation-item',
  templateUrl: './affirmation-item.component.html',
  styleUrls: ['./affirmation-item.component.scss']
})
export class AffirmationItemComponent implements OnInit {
  @Input() affirmation: Affirmation;
  @Output() affirmationSelected = new EventEmitter<void>();
  // @Input() areAffirmationsLighted: boolean = false;
  @Input() isChecked: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  @HostListener('click', ['$event'])
  onSelected() {
    this.affirmationSelected.emit();
  }

  checkUncheck() {
    this.affirmation.checked = !this.affirmation.checked;
    console.log(this.affirmation.checked);
    console.log(this.isChecked);
  }
}
