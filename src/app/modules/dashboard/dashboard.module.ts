import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { GraphDataComponent } from './components/graph-data/graph-data.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChartsModule } from 'ng2-charts';
import { PieIncidentListComponent } from './components/pie-incident-list/pie-incident-list.component';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    DashboardMainComponent,
    GraphDataComponent,
    PieIncidentListComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartsModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
