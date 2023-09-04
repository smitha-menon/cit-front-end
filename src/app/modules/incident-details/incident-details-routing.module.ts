import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IncidentDetailsPageComponent } from './components/incident-details-page/incident-details-page.component';
import { ViewDetailedStepsComponent } from './components/view-detailed-steps/view-detailed-steps.component';

const routes: Routes = [
  {
    path: '',
    component: IncidentDetailsPageComponent
  },
  {
    path: 'view-steps',
    component: ViewDetailedStepsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentDetailsRoutingModule { }
