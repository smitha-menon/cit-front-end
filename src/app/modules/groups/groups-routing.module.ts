import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateGroupComponent } from './components/create-group/create-group.component';

const route: Routes = [{
  path: '',
  component: CreateGroupComponent
}]

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
