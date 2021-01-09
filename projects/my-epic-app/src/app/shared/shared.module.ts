import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DataTableComponent } from './components/data-table/data-table.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [DataTableComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, DataTableComponent]
})
export class SharedModule {}
