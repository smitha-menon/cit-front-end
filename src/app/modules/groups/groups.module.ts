import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { GroupsRoutingModule } from './groups-routing.module';
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
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RolePageComponent } from './components/role-page/role-page.component';
import { GroupPageComponent } from './components/group-page/group-page.component';



@NgModule({
  declarations: [
    CreateGroupComponent,
    RolePageComponent,
    GroupPageComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
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
    HttpClientModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
  ]
})
export class GroupsModule { }
