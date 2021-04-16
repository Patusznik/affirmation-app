import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
  generalAffirmations$: Observable<Affirmation[]> = this.affService
    .generalAffirmations;
  affirmations: any;
  generalAffirmations: any;

  isAllChecked: boolean = false;
  isButtonEnabled: boolean = false;

  lightbulbed: boolean = false;
  p: number = 1;
  p2: number = 1;
  collection = [];
  affirmationForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
    imagePath: new FormControl('')
  });
  constructor(
    public affService: AffirmationService,
    private modalService: NgbModal,
    private afs: AngularFirestore,
    private fb: FormBuilder
  ) {
    this.affirmations$.subscribe((affirmations: Affirmation[]) => {
      this.affirmations = affirmations.reduce(
        (ac, { id }) => ((ac[id] = { checked: false }), ac),

        {}
      );
      console.log(this.affirmations);
    });
    this.generalAffirmations$.subscribe((affirmations: Affirmation[]) => {
      this.generalAffirmations = affirmations.reduce(
        (ac, { id }) => ((ac[id] = { checked: false }), ac),

        {}
      );
      console.log(this.generalAffirmations);
    });
  }
  lightOnOff() {
    this.lightbulbed = !this.lightbulbed;
    console.log(this.lightbulbed);
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
    console.log(aff);
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
    return this.affService.deleteDocByID(this.affirmations);
  }

  copyDocByID() {
    const affirmationIDsToCopy = Object.keys(this.generalAffirmations)?.filter(
      (id) => {
        return this.generalAffirmations[id]?.checked === true;
      }
    );
    affirmationIDsToCopy.forEach((id) => {
      this.afs
        .collection('affirmations')
        .doc(id)
        .get()
        .toPromise()
        .then((docRef) => {
          const affirmationData = docRef.data();
          const copiedAffirmation = {
            name: affirmationData['name'],
            description: affirmationData['description'],
            type: affirmationData['type'],
            imagePath: affirmationData['imagePath']
          };
          this.affService.createDoc(copiedAffirmation);
        })
        .catch((error) => {});
    });

    // return this.affService.createDoc(this.generalAffirmations);
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
