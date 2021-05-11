import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OutsideClickDirective } from './directives/outside-click.directive';
import { ModalComponent } from './modal/modal.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [SpinnerComponent, ModalComponent, OutsideClickDirective],
  imports: [CommonModule],
  exports: [SpinnerComponent, ModalComponent, OutsideClickDirective]
})
export class SharedModule {}
