import { Component, OnInit } from '@angular/core';

import { Affirmation } from './affirmation.model';

@Component({
  selector: 'ezo-affirmations',
  templateUrl: './affirmations.component.html',
  styleUrls: ['./affirmations.component.scss']
})
export class AffirmationsComponent implements OnInit {
  selectedAffirmation: Affirmation;
  constructor() {}

  ngOnInit(): void {}
}
