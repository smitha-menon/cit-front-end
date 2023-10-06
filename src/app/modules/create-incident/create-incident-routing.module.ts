import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateIncidentModule } from './create-incident.module';
import { AddIncidentComponent } from './components/add-incident/add-incident.component';

const routes: Routes = [{
  path: '',
  component: AddIncidentComponent,
  // canActivate: [AuthGuard],
},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateIncidentRoutingModule { }
