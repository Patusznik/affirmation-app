import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../shared/guard/auth.guard';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'organizer'
      },
      {
        path: 'organizer',
        loadChildren: () =>
          import('./organizer/organizer.module').then((m) => m.OrganizerModule)
      }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule]
})
export class ToolkitModule {}
