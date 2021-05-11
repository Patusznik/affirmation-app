import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { ModalService } from '../../../../../../shared/modal/modal.service';
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
  @Input() types: any[];
  @Input() affirmationForm: FormGroup;
  @Output() isLightBulbedEvent = new EventEmitter<boolean>();

  affirmations$: Observable<Affirmation[]> = this.affService.userAffirmations$;
  generalAffirmations$: Observable<Affirmation[]> = this.affService
    .generalAffirmations$;

  affirmations: any;
  generalAffirmations: any;

  isAllChecked: boolean = false;
  isButtonEnabled: boolean = false;
  isLightBulbed: boolean = false;
  kociak: boolean = true;

  numberOfChoosedAffirmations: string;

  p: number = 1;
  p2: number = 1;

  constructor(
    public affService: AffirmationService,
    private modalService: ModalService,
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
    this.isLightBulbed = !this.isLightBulbed;
    this.isLightBulbedEvent.emit(this.isLightBulbed);
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
    return this.affService.deleteDocsByID(affirmationIDsToDelete);
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

    return this.affService.copyDocsByID(affirmationIDsToCopy);
  }

  filterAffirmationIDs(aff: any) {
    return Object.keys(aff)?.filter((id) => {
      return aff[id]?.checked === true;
    });
  }
  openModal(id: string) {
    this.affService.openModal(id);
  }

  closeModal(id: string) {
    this.affService.closeModal(id);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  onSubmitAffirmation() {
    this.affService.createDoc(this.affirmationForm.value);
    this.affirmationForm.reset();
  }
}
