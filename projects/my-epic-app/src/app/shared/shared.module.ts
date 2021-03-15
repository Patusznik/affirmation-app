import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DataTableComponent } from './components/data-table/data-table.component';
import { MaterialModule } from './material.module';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [DataTableComponent, SpinnerComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, DataTableComponent, SpinnerComponent]
})
export class SharedModule {}
