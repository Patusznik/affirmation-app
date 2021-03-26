import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { Affirmation } from '../affirmation.model';
import { AffirmationService } from '../affirmation.service';

@Component({
  selector: 'ezo-affirmation-list',
  templateUrl: './affirmation-list.component.html',
  styleUrls: ['./affirmation-list.component.scss']
})
export class AffirmationListComponent implements OnInit {
  @Output() affirmationWasSelected = new EventEmitter<Affirmation>();

  affirmations$: Observable<Affirmation[]> = this.affService.kotek;

  affirmations: any;
  isAllChecked: boolean = false;
  affId: string;
  constructor(private affService: AffirmationService) {
    this.affirmations$.subscribe((affirmations: Affirmation[]) => {
      this.affirmations = affirmations.reduce(
        (ac, { id }) => ((ac[id] = { checked: false }), ac),

        {}
      );
      console.log(this.affirmations);
    });
  }

  ngOnInit(): void {}
  onAffirmationSelected(affirmation: Affirmation) {
    this.affirmationWasSelected.emit(affirmation);
  }
  onAffirmationChecked(foundId: string, value: boolean) {
    this.affirmations[foundId].checked = value;
    this.affId = foundId;
  }

  isChecked(foundId: string): boolean {
    return this.affirmations[foundId].checked;
  }

  checkUncheckAll(value: boolean) {
    this.isAllChecked = value;
    Object.keys(this.affirmations).forEach((id) => {
      this.affirmations[id].checked = value;
    });
  }
}
