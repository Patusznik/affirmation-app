import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from '../../../shared/shared.module';
import { AffirmationDetailComponent } from './organizer/affirmations/affirmation-detail/affirmation-detail.component';
import {
  AffirmationItemComponent,
} from './organizer/affirmations/affirmation-list/affirmation-item/affirmation-item.component';
import { AffirmationListComponent } from './organizer/affirmations/affirmation-list/affirmation-list.component';
import { AffirmationsComponent } from './organizer/affirmations/affirmations.component';
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
    AffirmationsComponent,
    AffirmationItemComponent,
    AffirmationListComponent,
    AffirmationDetailComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    NgxPaginationModule,
    MatSnackBarModule
  ]
})
export class OrganizerModule {}
