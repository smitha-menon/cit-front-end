import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-view-detailed-steps',
  templateUrl: './view-detailed-steps.component.html',
  styleUrls: ['./view-detailed-steps.component.scss']
})
export class ViewDetailedStepsComponent implements OnInit{


  public incidentForm: FormGroup | any;
  formattedString: any = [];
  constructor(private routes: Router, private fb: FormBuilder,private apiservice: ApiservicesService) {}
  
  stepArray: any[] = [
   
  ];

  arr: any;

  ngOnInit(): void {
    this.stepArray = [];
  // this.stepArray = this.incidentDetails.map((res: any) => {
  //   console.log(res.suggestedSteps)
  //   return res.suggestedSteps

   
  // })

  this.incidentForm = this.fb.group(({
    incidentId: new FormControl({value:'', disabled: true}),
    time: new FormControl({value:'', disabled: true}),
    assignedto: new FormControl({value:'', disabled: true}),
    description: new FormControl({value:'', disabled: true}),
    sla: new FormControl({value:'', disabled: true}),
    slalapse:new FormControl({value:'', disabled: true}),
    state: new FormControl({value:'', disabled: true}),
    priority: new FormControl({value:'', disabled: true}),
    active: new FormControl({value:'', disabled: true}),
    tags: new FormControl({value:'', disabled: false})
  }))


  this.apiservice.getIncidents().subscribe((res: any) => {
    // console.log(res)
    this.populateFormData(res[0]);
  })
  // this.incidentForm = this.fb.group(({
  //   incidentId: new FormControl({value:'', disabled: true}),
  //   time: new FormControl({value:'', disabled: true}),
  //   assignedto: new FormControl({value:'', disabled: true}),
  //   description: new FormControl({value:'', disabled: true}),
    
  // }))
  console.log(this.stepArray)
  }

  populateFormData(data: any) {
    console.log(data)
   
    for(let i=0;i< data.tags.length; i++) {
      
      this.formattedString =data.tags[i].replace('{', '').replace('}', '')
      console.log(this.formattedString)
    }
    this.incidentForm.patchValue({
      incidentId: data.incidentId,
      time: data.openedDate,
      assignedto: data.openedBy,
      description: data.description,
      sla: data.sla,
      slalapse: data.slalapse,
      state: data.state,
      priority: data.priority,
      active: data.active,
      tags: '#'+ this.formattedString,
    })
  
  }
}
