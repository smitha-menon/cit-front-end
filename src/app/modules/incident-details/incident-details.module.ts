import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentDetailsPageComponent } from './components/incident-details-page/incident-details-page.component';
import { IncidentDetailsRoutingModule } from './incident-details-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ViewDetailedStepsComponent } from './components/view-detailed-steps/view-detailed-steps.component';


@NgModule({
  declarations: [
    IncidentDetailsPageComponent,
    ViewDetailedStepsComponent
  ],
  imports: [
    CommonModule,
    IncidentDetailsRoutingModule,
    MatCardModule,
    MatTableModule,
    MatGridListModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatRadioModule,
   
  ]
})
export class IncidentDetailsModule { }
