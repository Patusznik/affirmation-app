import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
        loadChildren: () => import('./organizer/organizer.module').then(m => m.OrganizerModule)
      },
    ]
  },
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ToolkitModule { }
