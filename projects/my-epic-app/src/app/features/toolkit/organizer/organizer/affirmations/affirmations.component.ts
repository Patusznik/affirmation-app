import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Affirmation } from './affirmation.model';

@Component({
  selector: 'ezo-affirmations',
  templateUrl: './affirmations.component.html',
  styleUrls: ['./affirmations.component.scss']
})
export class AffirmationsComponent implements OnInit {
  selectedAffirmation: Affirmation;
  lightbulbed: boolean = false;

  types: any[] = [
    { type: 'work' },
    { type: 'sport' },
    { type: 'home' },
    { type: 'place' },
    { type: 'holiday' },
    { type: 'animals' },
    { type: 'self-development' },
    { type: 'music' },
    { type: 'health' },
    { type: 'appearance' },
    { type: 'well-being' },
    { type: 'meditation' },
    { type: 'relationships' },
    { type: 'hobby' },
    { type: 'mood' },
    { type: 'motivation' },
    { type: 'habit' }
  ];

  affirmationForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
    imagePath: new FormControl('')
  });
  constructor() {}

  ngOnInit(): void {}

  selectAffirmation(event: Affirmation) {
    this.selectedAffirmation = event;
  }

  deleteDetailComponent(event: Affirmation) {
    this.selectedAffirmation = event;
    this.selectedAffirmation = null;
  }
  turnOnLightBulb(event: boolean) {
    this.lightbulbed = event;
    this.selectedAffirmation = null;
  }
}
