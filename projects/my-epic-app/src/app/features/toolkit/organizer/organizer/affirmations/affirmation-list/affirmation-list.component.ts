import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { Affirmation } from '../affirmation.model';
import { AffirmationService } from '../affirmation.service';

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

  affirmations$: Observable<Affirmation[]> = this.affService.kotek;
  // affirmation$: Observable<any> = this.affirmations$.pipe(map(affirmation: Affirmation))
  isChecked: boolean = false;

  constructor(private affService: AffirmationService) {}

  ngOnInit(): void {}
  onAffirmationSelected(affirmation: Affirmation) {
    this.affirmationWasSelected.emit(affirmation);
  }

  checkUncheckAll() {}
}
// onAffirmationSelectedToDelete() {
//   this.isaffirmationLighted = !this.isaffirmationLighted;
//   console.log(this.isaffirmationLighted);
// }
