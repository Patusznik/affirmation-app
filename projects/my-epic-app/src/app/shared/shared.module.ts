import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalComponent } from './modal/modal.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [SpinnerComponent, ModalComponent],
  imports: [CommonModule],
  exports: [SpinnerComponent, ModalComponent]
})
export class SharedModule {}
