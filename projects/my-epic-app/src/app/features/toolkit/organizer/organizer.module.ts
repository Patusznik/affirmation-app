import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';

import { AffirmationDetailComponent } from './organizer/affirmation-list/affirmation-detail/affirmation-detail.component';
import { AffirmationItemComponent } from './organizer/affirmation-list/affirmation-item/affirmation-item.component';
import { AffirmationListComponent } from './organizer/affirmation-list/affirmation-list.component';
import { OrganizerComponent } from './organizer/organizer.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizerComponent
  }
];

@NgModule({
  declarations: [
    OrganizerComponent,
    AffirmationListComponent,
    AffirmationItemComponent,
    AffirmationDetailComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    //material
    MatCardModule,
    MatButtonModule
  ]
})
export class OrganizerModule {}
