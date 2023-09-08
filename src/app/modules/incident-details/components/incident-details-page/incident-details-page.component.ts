
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/constant';
import { Incidents } from 'src/app/interfaces/incidents';
import { ApiservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-incident-details-page',
  templateUrl: './incident-details-page.component.html',
  styleUrls: ['./incident-details-page.component.scss']
})

export class IncidentDetailsPageComponent implements OnInit {
  @ViewChild(MatSort)matsort = new MatSort()

  // displayedColumns = ['incidentId', 'active', 'state','priority','openedDate','assignedTo'];
  displayCols = ['Number','Active','State','Priority','OpenedDate','AssignedTo'];  
  incidentDetails: any = [];
  dataSource = new MatTableDataSource(this.incidentDetails);   

incidentDetailForm: boolean = false;

constructor(private routes: Router, private fb: FormBuilder, private apiservice:ApiservicesService ) {}
  

  ngOnInit(): void {
    
    this.loadIncidents();
    console.log(this.incidentDetails);
   
    
    //this.loadResult();
    
  }
  editForm(index: any) {
    console.log(this.incidentDetails[index])
    this.incidentDetailForm = true;

    
  }  

  editCancelButton() {
    this.incidentDetailForm = false;
  }

  searchPageFilter(input: any) {
    this.dataSource.filter= input.target.value;
    console.log(input.value)
  }

  viewIncident(row: any) {
    console.log(row)
    this.routes.navigateByUrl(ROUTES.VIEWSTEPS)
  }

  public loadIncidents() : void 
  {   
    
    this.apiservice.getIncidentsList().subscribe({
      next : (response: any) => {
                        console.log(response);                       
                        this.incidentDetails=response.map((data : any) =>{
                          return {
                            Number :data.incidentId,
                            Active : data.active,
                            State : data.state,
                            Priority : data.priority,
                            AssignedTo :  data.assignedTo,
                            OpenedDate : data.openedDate
                          }});                         
                          this.dataSource = new MatTableDataSource(this.incidentDetails)
                          this.dataSource.sort=this.matsort
                          },
      error: (err: any) => console.log(err)});
    }

   
  // goToIncident() {
  //   this.routes.navigateByUrl(ROUTES.VIEWSTEPS)
  // }
}
