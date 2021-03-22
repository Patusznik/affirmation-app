import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuard } from '../shared/guard/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './layout/footer/footer.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'dashboard',
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
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    MainLayoutComponent,
    ProfileComponent
  ],
  imports: [
    //vendor
    // BrowserModule,
    // BrowserAnimationsModule,
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    //material
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    NgbModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    MainLayoutComponent,
    ProfileComponent,
    NgbModule
  ]
})
export class CoreModule {}
