import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';

const routes: Routes = [{
  path: '',
  component: DashboardMainComponent,
  // canActivate: [AuthGuard],
},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
