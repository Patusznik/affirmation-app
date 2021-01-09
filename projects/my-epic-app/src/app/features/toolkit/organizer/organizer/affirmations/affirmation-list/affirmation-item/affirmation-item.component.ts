import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Affirmation } from '../../affirmation.model';

@Component({
  selector: 'ezo-affirmation-item',
  templateUrl: './affirmation-item.component.html',
  styleUrls: ['./affirmation-item.component.scss']
})
export class AffirmationItemComponent implements OnInit {
  @Input() affirmation: Affirmation;
  @Output() affirmationSelected = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}
}
