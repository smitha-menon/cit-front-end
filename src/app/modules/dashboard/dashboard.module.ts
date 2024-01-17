import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { GraphDataComponent } from './components/graph-data/graph-data.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    DashboardMainComponent,
    GraphDataComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartsModule,
  ]
})
export class DashboardModule { }
