
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ROUTES } from 'src/app/core/constants/constant';
import { INCIDENT_ID_KEY } from 'src/app/core/constants/local-storage-keys';
import { Incidents } from 'src/app/interfaces/incidents';
import { ApiservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-incident-details-page',
  templateUrl: './incident-details-page.component.html',
  styleUrls: ['./incident-details-page.component.scss']
})

export class IncidentDetailsPageComponent implements OnInit {
  @ViewChild(MatSort)matsort = new MatSort()
  @ViewChild(MatPaginator)paginator : MatPaginator | any;

  currentPage: number = 0;
  //itemsPerPage: number = 10;
  //totalItems: number=0;
  totalPages:number =0;
  startIndex:number=0;
  endIndex:number =11;
  displayCols = ['Number','Active','State','Priority','Opened Date','Assigned To'];  
  incidentDetails: any = [];
  dataSource = new MatTableDataSource(this.incidentDetails);   

incidentDetailForm: boolean = false;

constructor(private routes: Router, private fb: FormBuilder, private apiservice:ApiservicesService ) {}
  

  ngOnInit(): void {
    
    this.loadIncidents();
    console.log(this.incidentDetails);  
    
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
  onPageChange(event: PageEvent)
  {
    this.currentPage=event.pageIndex;
    console.log("pageindex"+event.pageIndex);
    console.log("pagesize"+event.pageSize);
    console.log(event.length);
    
    this.totalPages = Math.ceil(event.length / event.pageSize);
    console.log("totalpages"+this.totalPages);
    if(this.currentPage + 1 >= this.totalPages)
    {
      this.startIndex= event.length;
      this.endIndex=this.startIndex+10;
      this.loadIncidents();
    }

  }

  viewIncident(row: any) {
    console.log(row)
    localStorage.setItem(INCIDENT_ID_KEY, row.Number)
    this.routes.navigateByUrl(ROUTES.VIEWSTEPS)
  }

  public loadIncidents() : void 
  {   
   let newdata:any;
    this.apiservice.getIncidentsList(this.startIndex,this.endIndex).subscribe({
      next : (response: any) => {
                        console.log(response);                       
                        newdata=response.map((data : any) =>{
                          return {
                            'Number' :data.incidentId,
                            'Active' : data.active,
                            'State' : data.state,
                            'Priority' : data.priority,
                            'Assigned To' :  data.assignedTo,
                            'Opened Date' : data.openedDate
                          }});   
                          this.incidentDetails=this.incidentDetails.concat(newdata)                      
                          this.dataSource = new MatTableDataSource(this.incidentDetails)
                          this.dataSource.sort=this.matsort
                          this.dataSource.paginator= this.paginator
                          console.log(this.incidentDetails);
                          },
      error: (err: any) => console.log(err)});
    }

   
  // goToIncident() {
  //   this.routes.navigateByUrl(ROUTES.VIEWSTEPS)
  // }
}
