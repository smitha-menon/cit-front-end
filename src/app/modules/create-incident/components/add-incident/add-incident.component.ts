import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/constant';
import { NotifierService } from 'src/app/core/utils/notifier';
import { ApiservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.scss']
})
export class AddIncidentComponent implements OnInit{
  assignUsrList:any =[];
  assignGrpList: any =[];
  priorityList: any = [];
  stateList:any =[];
  applnList:any =[];
  filteredapplnList:any =[];
  selectedState: string | any;
  selectedUser: string | any;
  selectedPriority:string | any;
  selectedGroup: string | any;
  selectedAppln:string | any;
  defaultSelection: string ="--Select--";
  public addIncident: FormGroup | any;

  constructor(private routes: Router, private fb: FormBuilder, private apiservice: ApiservicesService,private notifier: NotifierService) { }
  
  ngOnInit(): void {
    this.loadGroups();
    this.loadStates();
    this.loadUsers();
    this.loadPriority();
    this.loadApplicationList();
    
    this.addIncident = this.fb.group(({
      // state: [''],
      // priority: [''],
      // assignedto: [''],
      description: [''],
      duedate: [''],
      openeddate: [(new Date()).toLocaleDateString("en-GB")+' '+(new Date()).toLocaleTimeString('en-IT', { hour12: false })],
      openedby:  [''],
      resolveddate: [''],
      sla:  [''],
      slalapse: [''],
      
    }))
  }
  loadPriority() {
    this.apiservice.getPriorityList().subscribe({
      next :(data:any)=>{
        console.log(data)
        this.priorityList = data           
      },
      error: (err: any) => {
        console.log(err)
        
      }
    });
  }
  loadStates(){
    this.apiservice.getStatusList().subscribe({
      next :(data:any)=>{
        console.log(data)
        this.stateList = data      
         
      },
      error: (err: any) => {
        console.log(err)
        
      }
    });
  }
  loadGroups(){
    this.apiservice.getAssignedGrpList().subscribe({
      next :(data:any)=>{
        console.log(data)
        this.assignGrpList = data 
      },
      error: (err: any) => {
        console.log(err)
        
      }
    });
  }
  loadUsers(){
    this.apiservice.getUsersListToAssign().subscribe({
      next :(data:any)=>{
        console.log(data)
        this.assignUsrList =data 
      },
      error: (err: any) => {
        console.log(err)        
      }
    });
  }

  loadApplicationList() {
    this.apiservice.getApplications().subscribe({
      next: (data: any) => {
        console.log(data)
        this.applnList =data  
      },
      error: (err: any) => {
        console.log(err)        
      }
    })
  }
  groupchange()
  {
    
    this.apiservice.getGroupDetails(this.selectedGroup).subscribe({
      next: (data: any) => {
        
         this.filteredapplnList =this.applnList.filter((item:any) => {
          
          if(data?.applications?.includes(item.applicationId))
            {              
              return {
                "applicationId":item.applicationId,
                "applicationName":item.applicationName
              }
            }
            else{
              return null;
            }
        })
        
      },
      error: (err: any) => {
        console.log(err)        
      }
    });
    
  }

  addinci() {
    const obj = {
      "state": this.selectedState,
      "priority": this.selectedPriority,
      "assignedTo": this.selectedUser,
      "assignedGroup": this.selectedGroup,
      "resolvedDate": this.addIncident.value.resolveddate,
      "sla": this.addIncident.value.sla,
      "slalapse": this.addIncident.value.slalapse,
      "dueDate": this.addIncident.value.duedate,
      "openedBy":this.addIncident.value.openedby,
      "openedDate": this.addIncident.value.openeddate,
      "description": this.addIncident.value.description,
      "active": "null",
      "tags": [],
      "suggestedSteps": [],
      "generatedByUser": "true",
      "comments": "NA",
      "applicationId": this.selectedAppln,
      "approvalStatus": "PENDING",
    }
    console.log(obj)
    this.apiservice.addIncident(obj).subscribe({
      next :(response:any)=>{
        console.log(response)
        // this.receivedData = ''
        this.notifier.success(
          'Incident Added successfully',
          'success'
        )
      },
      error: (err: any) => {
        console.log(err)
        if (err.status === 201)
        {
          this.notifier.success(
            'Incident Added successfully',
            'success'
          )
          this.addIncident.reset()
          this.routes.navigateByUrl(ROUTES.INCIDENT)
        }
    
      }
    });
  }
}
