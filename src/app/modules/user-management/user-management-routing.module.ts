import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { RolesComponent } from './components/roles/roles.component';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  // canActivate: [AuthGuard],
},
{
path: 'create-user',
component: CreateUserComponent,
// canActivate: [AuthGuard],
},
{
  path: 'roles',
  component: RolesComponent
}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
