import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  exports: [MatCardModule, MatButtonModule, MatTabsModule, MatGridListModule],
  imports: [CommonModule]
})
export class MaterialModule {}
