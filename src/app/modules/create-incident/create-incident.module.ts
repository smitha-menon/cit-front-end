import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddIncidentComponent } from './components/add-incident/add-incident.component';
import { CreateIncidentRoutingModule } from './create-incident-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddIncidentComponent
  ],
  imports: [
    CommonModule,
    CreateIncidentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CreateIncidentModule { }
