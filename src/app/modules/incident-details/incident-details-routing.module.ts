import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IncidentDetailsPageComponent } from './components/incident-details-page/incident-details-page.component';
import { ViewDetailedStepsComponent } from './components/view-detailed-steps/view-detailed-steps.component';
import { ResolutionsComponent } from './components/resolutions/resolutions.component';
import { AuthGuard } from 'src/app/auth/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[AuthGuard],
    component: IncidentDetailsPageComponent
  },
  {
    path: 'view-steps',
    canActivate:[AuthGuard],
    component: ViewDetailedStepsComponent
  },
  {
    path: 'resolutions',
    canActivate:[AuthGuard],
    component: ResolutionsComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentDetailsRoutingModule { }
