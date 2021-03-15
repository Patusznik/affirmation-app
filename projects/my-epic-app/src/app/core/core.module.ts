import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProfileComponent } from '../components/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './layout/footer/footer.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

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
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }

  // {
  //   path: '**',
  //   redirectTo: 'home'
  // }
];

@NgModule({
  declarations: [
    MainLayoutComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    //vendor
    // BrowserModule,
    // BrowserAnimationsModule,
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,

    //material
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    NgbModule
  ],
  exports: [
    MainLayoutComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NgbModule
  ]
})
export class CoreModule {}
