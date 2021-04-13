import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  affirmations: any;
  isAllChecked: boolean = false;
  isButtonEnabled: boolean = false;

  affirmationForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
    imagePath: new FormControl('')
  });
  constructor(
    public affService: AffirmationService,
    private modalService: NgbModal,
    private fb: FormBuilder
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
    console.log(this.affirmations);
    this.isAllChecked = Object.keys(this.affirmations)?.every((id) => {
      return this.affirmations[id]?.checked === true;
    });

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
  openModal(exampleModalContent) {
    this.modalService.open(exampleModalContent, { size: 'lg' });
  }
  openSmallModal(smallModalContent) {
    this.modalService.open(smallModalContent, { size: 'sm' });
  }

  onSubmitAffirmation() {
    console.log(this.affirmationForm.value);
    this.affService.createDoc(this.affirmationForm.value);
    this.affirmationForm.reset();
    this.modalService.dismissAll();
  }
}
