import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Affirmation } from '../affirmation.model';
import { AffirmationService } from '../affirmation.service';

@Component({
  selector: 'ezo-affirmation-list',
  templateUrl: './affirmation-list.component.html',
  styleUrls: ['./affirmation-list.component.scss']
})
export class AffirmationListComponent {
  @Output() affirmationWasSelected = new EventEmitter<Affirmation>();

  affirmations$: Observable<Affirmation[]> = this.affService.kotek;

  affirmations: any;
  isAllChecked: boolean = false;
  isButtonEnabled: boolean = false;
  constructor(
    private affService: AffirmationService,
    private modalService: NgbModal
  ) {
    this.affirmations$.subscribe((affirmations: Affirmation[]) => {
      this.affirmations = affirmations.reduce(
        (ac, { id }) => ((ac[id] = { checked: false }), ac),

        {}
      );
      console.log(this.affirmations);
    });
  }

  onButtonEnable() {
    this.isButtonEnabled = Object.keys(this.affirmations)?.some((id) => {
      return this.affirmations[id]?.checked === true;
    });
  }
  onAffirmationSelected(affirmation: Affirmation) {
    this.affirmationWasSelected.emit(affirmation);
  }
  onAffirmationChecked(foundId: string, value: boolean) {
    this.affirmations[foundId].checked = value;

    this.onButtonEnable();
  }

  isChecked(foundId: string): boolean {
    return this.affirmations[foundId].checked;
  }

  checkUncheckAll(value: boolean) {
    this.isAllChecked = value;
    Object.keys(this.affirmations).forEach((id) => {
      this.affirmations[id].checked = value;
      this.onButtonEnable();
    });
  }
  deleteDocByID() {
    return this.affService.deleteDocByID(this.affirmations);
  }

  openSmallModal(smallModalContent) {
    this.modalService.open(smallModalContent, { size: 'sm' });
  }
}
