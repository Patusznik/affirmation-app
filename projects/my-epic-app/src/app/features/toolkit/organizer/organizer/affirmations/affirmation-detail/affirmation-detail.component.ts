import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Affirmation } from '../affirmation.model';
import { AffirmationService } from '../affirmation.service';

@Component({
  selector: 'ezo-affirmation-detail',
  templateUrl: './affirmation-detail.component.html',
  styleUrls: ['./affirmation-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AffirmationDetailComponent implements OnInit {
  @Input() affirmation: Affirmation;
  @Input() types: any[];
  @Input() affirmationForm: FormGroup;
  @Input() lightbulbed: boolean;
  @Output() affirmationToDelete = new EventEmitter<Affirmation>();

  constructor(
    public affService: AffirmationService,
    private _snackBar: MatSnackBar
  ) {}

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
  ngOnInit(): void {}

  onSubmitAffirmation(id) {
    this.affService.updateDocByID(id, this.affirmationForm.value);
    this.affirmation = this.affirmationForm.value;
  }

  shareDoc(af) {
    this.affService.shareDoc(af);
  }
  deleteDoc(id) {
    this.affService.deleteDoc(id);
    this.affirmationToDelete.emit(this.affirmation);
  }
}
