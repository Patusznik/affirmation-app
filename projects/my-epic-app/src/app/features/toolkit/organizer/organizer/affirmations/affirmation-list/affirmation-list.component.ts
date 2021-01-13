import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Affirmation } from '../affirmation.model';

// import {MatPaginator} from '@angular/material/paginator';
// import {MatSort} from '@angular/material/sort';
// import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'ezo-affirmation-list',
  templateUrl: './affirmation-list.component.html',
  styleUrls: ['./affirmation-list.component.scss']
})
export class AffirmationListComponent implements OnInit {
  @Output() affirmationWasSelected = new EventEmitter<Affirmation>();

  affirmations: Affirmation[] = [
    new Affirmation(
      'A Test affirmation',
      'This is simply a test',
      'lorem ipsum dolor',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'
    ),
    new Affirmation(
      'Another Test affirmation',
      'This is simply a test',
      'loremmmmm ipsummmm memememe ',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'
    ),
    new Affirmation(
      'third',
      'This is weird',
      'wtf',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'
    )
  ];
  constructor() {}

  ngOnInit(): void {}
  onAffirmationSelected(affirmation: Affirmation) {
    this.affirmationWasSelected.emit(affirmation);
  }
}
