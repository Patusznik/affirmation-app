import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../features/home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('../features/admin/admin.module').then((m) => m.AdminModule)
      },
      {
        path: 'toolkit',
        loadChildren: () =>
          import('../features/toolkit/toolkit.module').then(
            (m) => m.ToolkitModule
          )
      }
    ]
  }

  // {
  //   path: '**',
  //   redirectTo: 'home'
  // }
];

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    //vendor
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,

    //material
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  exports: [MainLayoutComponent]
})
export class CoreModule {}
