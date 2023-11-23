import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './components/reports/reports.component';
import { AuthGuard } from 'src/app/auth/guard/auth.guard';

const route: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ReportsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
