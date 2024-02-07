import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { PieIncidentListComponent } from './components/pie-incident-list/pie-incident-list.component';

const routes: Routes = [{
  path: '',
  component: DashboardMainComponent,
  // canActivate: [AuthGuard],
},
{
  path: 'pie-incident-list',
  component: PieIncidentListComponent,
  // canActivate: [AuthGuard],
}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
