import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-view-detailed-steps',
  templateUrl: './view-detailed-steps.component.html',
  styleUrls: ['./view-detailed-steps.component.scss']
})
export class ViewDetailedStepsComponent implements OnInit {


  public incidentForm: FormGroup | any;
  formattedString: any = [];
  incidentDetails: any;
  constructor(private routes: Router, private fb: FormBuilder, private apiservice: ApiservicesService) { }

  stepArray: any[] = [];

  arr: any;

  ngOnInit(): void {
    this.stepArray = [];



    this.apiservice.getIncidentsList().subscribe((res: any) => {
      console.log(res)
      this.incidentDetails = res.map((data: any) => {
        return {

          number: data.incidentId,
          active: data.active,
          state: data.state,
          priority: data.priority,
          assignedTo: data.assignedTo,
          openedDate: data.openedDate,
          assignedgroup: data.assignedGroup,
          due: data.dueDate,
          openedBy: data.openedBy,
          resolvedDate: data.resolvedDate,
          sla: data.sla,
          slaLpase: data.slalapse
        }
      })
      console.log(this.incidentDetails)
    })




  }

  // populateFormData(data: any) {
  //  console.log(data)

  // }
}
