
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/constant';
import { ApiservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-incident-details-page',
  templateUrl: './incident-details-page.component.html',
  styleUrls: ['./incident-details-page.component.scss']
})

export class IncidentDetailsPageComponent implements OnInit {
  displayedColumns = ['incidentId', 'active', 'state','priority','openedDate','assignedTo'];

  incidentDetails: any = [];
  dataSource = new MatTableDataSource(this.incidentDetails);

  
// public incidentForm: FormGroup | any;
incidentDetailForm: boolean = false;

constructor(private routes: Router, private fb: FormBuilder, private apiservice:ApiservicesService ) {}
  

  ngOnInit(): void {
    /* this.incidentDetails = [{
      "number": 'INCI12',
      "active": 'false',
      "incidentDescription": "401 Authorization Error",

      "suggestedSteps": [

          "{ Open the API gateway console, please click here to open.}",

          "{ Choose the name of the API.}",

          "{In the navigation pane, choose the authorizers under the API.}",

          "{Review the list of authorizer's present. If not available, please add the remarks and close the ticket.}"

      ],

      "state": "closed",
      priority: "moderate",
      openeddate: '08-08-2023',
      short: "pdp not working properly",
      assignedto: 'alvin'

    },{
      "number": 'INCI12',
      assignedto: 'rakesh',
      "active": 'true',
      "incidentDescription": "500 internal server error",
      openeddate: '08-08-2023',
      priority: "moderate",
      "state": "opened",

      "suggestedSteps": [

          "{Reload the page.}",

          "{ Clear you browser cache and cookies.}",

          "{Please click here see the error logs in the server.}",

          "{Validate the input request is properly formatted as per the api documentation, please click here for api documentation.}"

      ],

      "remarks": "",
      status: "open",
      short: "pdp not working properly"
    },
    {
      "number": 'INCI12',
      assignedto: 'rakesh',
      "active": 'true',
      "incidentDescription": "500 internal server error",
      openeddate: '08-08-2023',
      priority: "moderate",
      "state": "opened",

      "suggestedSteps": [

          "{Reload the page.}",

          "{ Clear you browser cache and cookies.}",

          "{Please click here see the error logs in the server.}",

          "{Validate the input request is properly formatted as per the api documentation, please click here for api documentation.}"

      ],

      "remarks": "",
      status: "open",
      short: "pdp not working properly"
    }] */
    
    this.loadIncidents();
    console.log(this.incidentDetails);
   
    
    //this.loadResult();
    
  }
  editForm(index: any) {
    console.log(this.incidentDetails[index])
    this.incidentDetailForm = true;

    // this.incidentForm = this.fb.group(({
    //   incidentId:  this.incidentDetails[index].incidentId,
    //   description: this.incidentDetails[index].short,
    //   time: this.incidentDetails[index].time,
    //   assignedto: this.incidentDetails[index].assignedto
    // }))
  }
  /* loadResult() {
    this.incidentDetails = [{
      "incidentId": 'INCI12',

      "incidentDescription": "401 Authorization Error",

      "suggestedSteps": [

          "{ Open the API gateway console, please click here to open.}",

          "{ Choose the name of the API.}",

          "{In the navigation pane, choose the authorizers under the API.}",

          "{Review the list of authorizer's present. If not available, please add the remarks and close the ticket.}"

      ],

      "remarks": "",
      status: "open",
      time: '08-08-2023',
      short: "pdp not working properly",
      assignedto: 'alvin'

    },{
      "incidentId": 'INCI12',

      "incidentDescription": "500 internal server error",
      time: '08-08-2023',

      "suggestedSteps": [

          "{Reload the page.}",

          "{ Clear you browser cache and cookies.}",

          "{Please click here see the error logs in the server.}",

          "{Validate the input request is properly formatted as per the api documentation, please click here for api documentation.}"

      ],

      "remarks": "",
      status: "open",
      short: "pdp not working properly"
    }]
  } */

  editCancelButton() {
    this.incidentDetailForm = false;
  }

  searchPageFilter(input: any) {
    console.log(input.value)
  }

  viewIncident(row: any) {
    console.log(row)
    this.routes.navigateByUrl(ROUTES.VIEWSTEPS)
  }

  public loadIncidents() : void 
  {   
    
    this.apiservice.getIncidents().subscribe({
      next : (response: any) => {
                        console.log(response);
                        this.incidentDetails=response.map((data : any) =>{
                          return {
                            incidentId : data.incidentId,
                            active : data.active,
                            state : data.state,
                            priority : data.priority,
                            assignedTo :  data.openedBy,
                            openedDate : data.openedDate

                                  }
                                });      
                              this.dataSource = new MatTableDataSource(this.incidentDetails)
                          },
      error: (err: any) => console.log(err)});
    }

   
  // goToIncident() {
  //   this.routes.navigateByUrl(ROUTES.VIEWSTEPS)
  // }
}
