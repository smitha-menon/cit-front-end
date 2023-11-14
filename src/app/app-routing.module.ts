import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './core/layouts/home-layout.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NavbarLayoutComponent } from './core/layouts/navbar-layout.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { HasRolesGuard } from './auth/guard/has-roles.guard';
import { userRoles } from './core/constants/constant';
const routes: Routes = [{
  path: '',
  component: HomeLayoutComponent,
  children: [
    {
      path: 'login',      
      loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
    },    
    {path:'', redirectTo:'/login',pathMatch:'full'}  
  ]
},
{
  path: '',
  component: NavbarLayoutComponent,
  children: [
    {
      path: 'incidents',
      canActivate:[AuthGuard],
      loadChildren: () => import('./modules/incident-details/incident-details.module').then((m) => m.IncidentDetailsModule)
    },
    {
      path: 'dashboard',
      canActivate:[AuthGuard],
      loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule)
    },  
    {
      path: 'create-incident',
      canActivate: [AuthGuard, HasRolesGuard],
      data:{
        role:userRoles.SRE+','+userRoles.GA
      },
      loadChildren: () => import('./modules/create-incident/create-incident.module').then((m) => m.CreateIncidentModule)
    },
    {
      path: 'users',
      canActivate: [AuthGuard],
      // data: {
      //   role: userRoles.SRE
      // },
      loadChildren: () => import('./modules/user-management/user-management.module').then((m) => m.UserManagementModule)
    },
    {
      path: 'groups',
      canActivate: [AuthGuard],
      // data: {
      //   role: userRoles.SRE
      // },
      loadChildren: () => import('./modules/groups/groups.module').then((m) => m.GroupsModule)
    },
    {
      path:'incident-approval',
      canActivate: [AuthGuard],
      loadChildren: () => import('./modules/approvals/approvals.module').then((m) => m.ApprovalsModule)
    }
    
    // {path:'', redirectTo:'/login',pathMatch:'full'}  
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
