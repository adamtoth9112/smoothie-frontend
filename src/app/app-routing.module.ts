import { SmoothieEditComponent } from './smoothie-edit/smoothie-edit.component';
import { SmoothieStartComponent } from './smoothie-start/smoothie-start.component';
import { SmoothieDetailComponent } from './smoothie-detail/smoothie-detail.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { SmoothieListComponent } from './smoothie-list/smoothie-list.component';
import { inject, NgModule, Component } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { map, take } from 'rxjs/operators';
import { SmoothiesComponent } from './smoothies/smoothies.component';
import { SmoothieResolverService } from './smoothie-resolver.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/smoothies', pathMatch: 'full' },
  { path: 'logout', redirectTo: '/smoothies', pathMatch: 'full' },
  {
    path: 'smoothies',
    component: SmoothiesComponent,
    children: [
      { path: '', component: SmoothieStartComponent },
      {
        path: 'new',
        component: SmoothieEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        component: SmoothieDetailComponent,
        resolve: [SmoothieResolverService],
      },
      {
        path: ':id/edit',
        component: SmoothieEditComponent,
        resolve: [SmoothieResolverService],
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
