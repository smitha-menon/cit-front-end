import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './core/layouts/home-layout.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NavbarLayoutComponent } from './core/layouts/navbar-layout.component';

const routes: Routes = [{
  path: '',
  component: HomeLayoutComponent,
  children: [
    {
      path: 'login',
      loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
    },
    {
      path: '',
      component: LandingPageComponent
    }
  ]
},
{
  path: '',
  component: NavbarLayoutComponent,
  children: [
    {
      path: 'incidents',
      loadChildren: () => import('./modules/incident-details/incident-details.module').then((m) => m.IncidentDetailsModule)
    },
    {
      path: 'dashboard',
      loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
