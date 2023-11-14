import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidentApprovalComponent } from './incident-approval/incident-approval.component';


const routes: Routes = [{
  path: '',
  component: IncidentApprovalComponent  
},
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalsRoutingModule { }
