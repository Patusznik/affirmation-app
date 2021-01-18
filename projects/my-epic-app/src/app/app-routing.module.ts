// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';


// import { AuthComponent } from './auth/auth.component';

// const routes: Routes = [
//   {
//     path: '',
//     pathMatch: 'full',
//     redirectTo: 'home'
//   },
//   {
//     path: 'auth',
//     component: AuthComponent
//   },
//   {
//     path: 'home',
//     loadChildren: () =>
//       import('./features/home/home.module').then((m) => m.HomeModule)
//   },
//   {
//     path: 'admin',
//     loadChildren: () =>
//       import('./features/admin/admin.module').then((m) => m.AdminModule)
//   },
//   {
//     path: 'toolkit',
//     loadChildren: () =>
//       import('./features/toolkit/toolkit.module').then((m) => m.ToolkitModule)
//   },
//   {
//     path: '**',
//     redirectTo: 'home'
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}

// Required services for navigation
// Import all the components for which navigation service has to be activated
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
