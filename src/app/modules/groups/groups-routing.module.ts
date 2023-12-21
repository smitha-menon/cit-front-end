import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { CreateGroupPageComponent } from './components/create-group-page/create-group-page.component';
import { CreateRolePageComponent } from './components/create-role-page/create-role-page.component';

const route: Routes = [{
  path: '',
  component: CreateGroupComponent
},
{
  path: 'role-page',
  component: CreateRolePageComponent
},
{
  path: 'group-page',
  component: CreateGroupPageComponent
}]

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
