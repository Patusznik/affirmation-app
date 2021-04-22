import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Affirmation } from '../affirmation.model';
import { AffirmationService } from '../affirmation.service';

@Component({
  selector: 'ezo-affirmation-list',
  templateUrl: './affirmation-list.component.html',
  styleUrls: ['./affirmation-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AffirmationListComponent {
  @Output() affirmationWasSelected = new EventEmitter<Affirmation>();

  affirmations$: Observable<Affirmation[]> = this.affService.kotek;
  generalAffirmations$: Observable<Affirmation[]> = this.affService
    .generalAffirmations;

  affirmations: any;
  generalAffirmations: any;

  isAllChecked: boolean = false;
  isButtonEnabled: boolean = false;
  lightbulbed: boolean = false;

  numberOfChoosedAffirmations: string;

  p: number = 1;
  p2: number = 1;

  affirmationForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
    imagePath: new FormControl('')
  });
  constructor(
    public affService: AffirmationService,
    private modalService: NgbModal,

    private _snackBar: MatSnackBar
  ) {
    this.affirmations$.subscribe((affirmations: Affirmation[]) => {
      this.affirmations = affirmations.reduce(
        (ac, { id }) => ((ac[id] = { checked: false }), ac),

        {}
      );
    });
    this.generalAffirmations$.subscribe((affirmations: Affirmation[]) => {
      this.generalAffirmations = affirmations.reduce(
        (ac, { id }) => ((ac[id] = { checked: false }), ac),

        {}
      );
    });
  }

  lightOnOff() {
    this.lightbulbed = !this.lightbulbed;
  }

  onButtonEnable(affirmations) {
    this.isButtonEnabled = Object.keys(affirmations)?.some((id) => {
      return affirmations[id]?.checked === true;
    });
  }

  onAffirmationSelected(affirmation: Affirmation) {
    this.affirmationWasSelected.emit(affirmation);
  }

  onAffirmationChecked(foundId: string, value: boolean, aff) {
    aff[foundId].checked = value;
    this.isAllChecked = Object.keys(aff)?.every((id) => {
      return aff[id]?.checked === true;
    });
    this.onButtonEnable(aff);
  }

  isChecked(foundId: string, aff): boolean {
    return aff[foundId].checked;
  }

  checkUncheckAll(value: boolean, aff) {
    this.isAllChecked = value;
    Object.keys(aff).forEach((id) => {
      aff[id].checked = value;
      this.onButtonEnable(aff);
    });
  }

  deleteDocByID() {
    const affirmationIDsToDelete = this.filterAffirmationIDs(this.affirmations);
    this.numberOfChoosedAffirmations = affirmationIDsToDelete.length.toString();
    this.isAllChecked = false;
    this.isButtonEnabled = false;

    affirmationIDsToDelete.forEach((id) => {
      this.affirmations[id].checked = false;
    });
    return this.affService.deleteDocByID(affirmationIDsToDelete);
  }

  copyDocByID() {
    const affirmationIDsToCopy = this.filterAffirmationIDs(
      this.generalAffirmations
    );
    this.numberOfChoosedAffirmations = affirmationIDsToCopy.length.toString();
    this.isAllChecked = false;
    this.isButtonEnabled = false;

    affirmationIDsToCopy.forEach((id) => {
      this.generalAffirmations[id].checked = false;
    });

    return this.affService.copyDoc(affirmationIDsToCopy);
  }

  filterAffirmationIDs(aff: any) {
    return Object.keys(aff)?.filter((id) => {
      return aff[id]?.checked === true;
    });
  }
  openModal(exampleModalContent) {
    this.modalService.open(exampleModalContent, { size: 'lg' });
  }

  openSmallModal(smallModalContent) {
    this.modalService.open(smallModalContent, { size: 'sm' });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  onSubmitAffirmation() {
    this.affService.createDoc(this.affirmationForm.value);
    this.affirmationForm.reset();
    this.modalService.dismissAll();
  }
}
