import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/constant';
import { INCIDENT_ID_KEY } from 'src/app/core/constants/local-storage-keys';
import { drillIncidents } from 'src/app/interfaces/incidents';
import { ApiservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-view-detailed-steps',
  templateUrl: './view-detailed-steps.component.html',
  styleUrls: ['./view-detailed-steps.component.scss']
})
export class ViewDetailedStepsComponent implements OnInit {


  public incidentForm: FormGroup | any;
  formattedString: any = [];
  incidentDetails: any = [];
  tagList: any = [];
  tagName: string = '';
  tagClose: boolean = false;
  tagIndexDelete: any;
  constructor(private routes: Router, private fb: FormBuilder, private apiservice: ApiservicesService) { }

  stepArray: any[] = [];
  arr: any;

  ngOnInit(): void {
    this.stepArray = [];



    this.apiservice.getIncident(localStorage.getItem(INCIDENT_ID_KEY)).subscribe({
      next: (res: any) => {
        console.log(res)
        this.incidentDetails.push(res)
        // this.incidentDetails.incidentId = res.incidentId
        // this.incidentDetails = res.map((data: any) => {
        //   return {

        //     number: data.incidentId,
        //     active: data.active,
        //     state: data.state,
        //     priority: data.priority,
        //     assignedTo: data.assignedTo,
        //     openedDate: data.openedDate,
        //     assignedgroup: data.assignedGroup,
        //     due: data.dueDate,
        //     openedBy: data.openedBy,
        //     resolvedDate: data.resolvedDate,
        //     sla: data.sla,
        //     slaLpase: data.slalapse
        //   }
        console.log(this.incidentDetails)
        this.tagList = this.incidentDetails[0].tags.map((res: any) => {
          console.log(res.tags)
          return {
            tagName: res
          }

        })
        console.log(this.tagList)
      }
    })

  }
  // searchPageFilter(event: any) {
  //   console.log(event?.target.value)
  //   this.tagName = event?.target.value
  // }
  addTag() {
    var obj =
      { tagName: '#' + this.tagName }

    this.tagList.push(obj)
    this.tagName = '';
    console.log(obj)
  }

  goToReso() {
    this.routes.navigateByUrl(ROUTES.RESOLUTION)
  }
  tagClosepop(index: number) {
    this.tagIndexDelete = index;
    this.tagClose = true;
  }

  deleteTag() {
    this.tagList.splice(this.tagIndexDelete, 1)
    this.tagClose = false;
  }
  cancel() {
    this.tagClose = false;
  }
  refresh() {
    window.location.reload()
  }
}
