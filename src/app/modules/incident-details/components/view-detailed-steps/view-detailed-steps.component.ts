import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FEATURES, ROUTES, statuses } from 'src/app/core/constants/constant';
import { INCIDENT_ID_KEY, TAGS } from 'src/app/core/constants/local-storage-keys';
import { NotifierService } from 'src/app/core/utils/notifier';
import { drillIncidents } from 'src/app/interfaces/incidents';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { PermissionsService } from 'src/app/services/permissions.service';

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
  stateList:any =[];
  assignGrpList: any =[];
  public editTestplanForm: FormGroup | any;
  assignUsrList:any =[];
  selectedState: string | any;
  selectedUser: string | any;
  selectedGroup: string | any;
  defaultSelection: string ="--Select--";
  isUpdateVisible:boolean =true;
  isAddTagVisible:boolean =true;
  comments:string | any;
  constructor(private routes: Router, 
              private fb: FormBuilder,
               private apiservice: ApiservicesService,
               private permissionsService: PermissionsService,
               private notifier: NotifierService) { }

  stepArray: any[] = [];
  tagsarr: any;
  userPermissions: string[] = [];
  
  ngOnInit(): void {
    this.stepArray = [];    
    this.loadGroups();
    this.loadStates();
    this.loadUsers();
    
    this.permissionsService.loginreponse$.subscribe((data) => {
      this.userPermissions = data.deniedAccessMethodNames;
    });
   
    this.apiservice.getIncident(localStorage.getItem(INCIDENT_ID_KEY)).subscribe({
      next: (res: any) => {
        console.log(res)
        this.incidentDetails.push(res)
        this.editTestplanForm = this.fb.group(({
          state: new FormControl({value: res.state, disabled: true}),
          priority: new FormControl({value: res.priority, disabled: true}),
          assignedto: new FormControl({value: res.assignedTo, disabled: true}),
          assignedgroup: new FormControl({value: res.assignedGroup, disabled: true}),
          duedate: new FormControl({value: res.dueDate, disabled: true}),
          openeddate:  new FormControl({value: res.openedDate, disabled: true}),
          openedby:  new FormControl({value: res.openedBy, disabled: true}),
          resolveddate: new FormControl({value: res.resolvedDate, disabled: true}),
          sla:  new FormControl({value: res.sla, disabled: true}),
          slalapse: new FormControl({value: res.slalapse, disabled: true})
        }))
       
        console.log(this.incidentDetails)
        this.tagsarr = this.incidentDetails[0].tags;
        this.selectedState =  this.incidentDetails[0].state
        this.selectedGroup = this.incidentDetails[0].assignedGroup
        console.log("group:"+this.selectedGroup);
        this.selectedUser = this.incidentDetails[0].assignedTo
        localStorage.setItem(TAGS,this.tagsarr.join(','));
        this.comments=this.incidentDetails[0].comments;
       
        this.isUpdateVisible=(this.selectedState == statuses.closedState || 
                              this.userPermissions.includes(FEATURES.updateIncident))?false:true; 
        this.isAddTagVisible =this.userPermissions.includes(FEATURES.modifyTags)? false:true;
      

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


saveTags(successMsg:string, failMsg:string){

  this.apiservice.modifyTags(this.tagsarr,localStorage.getItem(INCIDENT_ID_KEY)).subscribe({
    next :(data:any)=>{
      console.log(data)      
      this.notifier.success(
        'Success!',
        successMsg
      )
    },
    error: (err: any) => {console.log(err)
      if (err.status == 200) {
        
        this.notifier.success(
          'Success!',
          successMsg
        )
      } else {
        this.notifier.error(
          'Failed!',
          failMsg
        )
      }
    }
  });
}

  addTag() {
    var obj =
      { tagName: '#' + this.tagName }

    this.tagsarr.push(obj.tagName);
    console.log(obj)
    localStorage.setItem(TAGS,this.tagsarr.join(','));
    this.saveTags( 'Tag Generated Successfully','Tag Generation Failed');  
    this.tagList.push(obj)
    this.tagName = '';    
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
    this.tagsarr.splice(this.tagIndexDelete, 1)
    this.tagClose = false;
    localStorage.setItem(TAGS,this.tagsarr.join(','));
    this.saveTags( 'Tag deletion Successfull','Tag deletion Failed');     
  }
  cancel() {
    this.tagClose = false;
  }
  refresh() {
    window.location.reload()
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

  updateIncident(){
    this.apiservice.UpdateIncident(localStorage.getItem(INCIDENT_ID_KEY),this.selectedState,this.selectedUser,this.selectedGroup,this.comments)
                    .subscribe({
                      next:(data:any)=>{ 
                      this.notifier.success(
                        'Success!',
                        'Incident updated Successfully'
                      )},
                      error:(err:any)=>{
                        console.log(err)
			                if(err.status==302)
                        {                       
                        
                        this.notifier.success(
                          'Success!',
                          'Incident updated Successfully'
                        )
                        }
                        else{
                          this.notifier.error(
                            'Failed',
                            'Incident updation unsuccessfull')
                        }
                      }
                    });
    
  }


}


