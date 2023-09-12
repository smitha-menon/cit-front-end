import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/constant';
import { INCIDENT_ID_KEY, TAGS } from 'src/app/core/constants/local-storage-keys';
import { NotifierService } from 'src/app/core/utils/notifier';
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
  
  constructor(private routes: Router, private fb: FormBuilder, private apiservice: ApiservicesService,private notifier: NotifierService) { }

  stepArray: any[] = [];
  tagsarr: any;
  
  ngOnInit(): void {
    this.stepArray = [];    

    this.apiservice.getIncident(localStorage.getItem(INCIDENT_ID_KEY)).subscribe({
      next: (res: any) => {
        console.log(res)
        this.incidentDetails.push(res)
       
        console.log(this.incidentDetails)
        this.tagsarr = this.incidentDetails[0].tags;
        localStorage.setItem(TAGS,this.tagsarr.join(','));

        this.tagList = this.incidentDetails[0].tags.map((res: any) => {
                 
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

    this.tagsarr.push(obj.tagName);
    console.log(obj)
    localStorage.setItem(TAGS,this.tagsarr.join(','));

    this.apiservice.modifyTags(this.tagsarr,localStorage.getItem(INCIDENT_ID_KEY)).subscribe({
      next :(data:any)=>{
        console.log(data)
        this.tagList.push(obj)
        this.tagName = '';  
        this.notifier.success(
          'Success!',
          'Tag Generated Successfully'
        )
      },
      error: (err: any) => {console.log(err)
        if (err.status == 200) {
          this.tagList.push(obj)
          this.tagName = '';  
          this.notifier.success(
            'Success!',
            'Tag Generated Successfully'
          )
        } else {
          this.notifier.error(
            'Failed!',
            'Tag Generated Failed'
          )
        }
      }
    });
  }

  goToReso() {
          
    this.routes.navigateByUrl(ROUTES.RESOLUTION);    
    
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
