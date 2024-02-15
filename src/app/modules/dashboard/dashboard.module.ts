import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { GraphDataComponent } from './components/graph-data/graph-data.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChartsModule } from 'ng2-charts';
import { PieIncidentListComponent } from './components/pie-incident-list/pie-incident-list.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';



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
    ReactiveFormsModule,
    MatInputModule,
    NgbModule,
    MatDatepickerModule,
    FormsModule,
    MatNativeDateModule
  ]
})
export class DashboardModule { }
