import { Component, Input, OnInit } from '@angular/core';

import { Affirmation } from '../../affirmation.model';

@Component({
  selector: 'ezo-affirmation-item',
  templateUrl: './affirmation-item.component.html',
  styleUrls: ['./affirmation-item.component.scss']
})
export class AffirmationItemComponent implements OnInit {
  @Input() affirmation: Affirmation;
  constructor() {}

  ngOnInit(): void {}
}
