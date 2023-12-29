import { NgModule } from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CreateApplicationComponent } from './create-application/create-application.component';

const routes: Routes = [{
  path: '',
  component: CreateApplicationComponent  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
