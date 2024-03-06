import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as Aos from 'aos';
import { NotifierService } from 'src/app/core/utils/notifier';
import { ApiservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})

export class GroupPageComponent implements OnInit {
  isPageOne: boolean = true;
  // addFeatures: boolean = false;
  public createGroup: FormGroup | any;
  groupList: Array<any> = [];
  applicationList: Array<any> =[];
  usrList:any=[];
  addGroupForm: FormGroup | any;
  selectedAppln:any;
  selectedUser:string|any;
  defaultSelection:string="--Select--";
  constructor(private apiservice: ApiservicesService, private fb: FormBuilder, private notifier: NotifierService) { }

  ngOnInit(): void {
 
    this.createGroup = this.fb.group({
      groupname: [''],
      isactive:['']
    
    })
    this.loadGroup();
    this.loadUsers();
    this.apiservice.getApplications().subscribe({
      next:(res: any) => {
        console.log(res)
        this.applicationList = res.map((data: any) => {
          return {
            name: data.applicationName,
            id: data.applicationId
          }
        })
        
      }
    })
 

  }

  
  loadUsers(){
    this.apiservice.getUsersListToAssign().subscribe({
      next :(data:any)=>{
        console.log(data)
        this.usrList =data         
      },
      error: (err: any) => {
        console.log(err)        
      }
    });
  }

  loadGroup() {
    this.apiservice.getAssignedGrpList().subscribe({
      next: (res: any) => {
        console.log(res)
        this.groupList = res.map((data: any) => {
          return {
            groupname: data.groupName,
            groupid: data.groupId,
            isactive: data.isActive,
            addfeature: false,
            applications: data.applications,
            groupAdminId: data.groupAdminId
          }
        })
        console.log(this.groupList)
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  editAccordian(feature: any, index: any) {
    console.log(feature)
    feature.addfeature = true
    this.selectedUser=Number(feature.groupAdminId);
    this.selectedAppln=feature.applications;
    console.log("app",this.selectedAppln)
    // this.editRoleId= feature.roleid;
    this.createGroup= this.fb.group({
      groupname:[feature.groupname],
      isactive:[feature.isactive]
    });
  }
  cancelChanges(feature: any) {
    feature.addfeature = false
  }
  
  modifyGroup(data:any)
  {
    console.log(data);
    console.log("appln",this.selectedAppln);
    var model={
      "groupId": data.groupid,
      "groupName": this.createGroup.value.groupname,
      "isActive": this.createGroup.value.isactive,
      "applications": this.selectedAppln,
      "groupAdminId": this.selectedUser
    }
    console.log(model)
    this.apiservice.modifyGroup(model).subscribe({
      next:(response:any) =>{ 
        console.log(response);
        this.notifier.success(
          'success',
          'Group modified successfully'            
        )  ;
        this.loadGroup();  
      },
      error:(err:any)=>{
        console.log(err)
        if(err.status==200)
        {
          this.notifier.success(
            'success',
            'Group modified successfully'            
          )  ;
          this.loadGroup(); 
        }
        else{
          this.notifier.error(
            'Failure',
            'Group modification unsuccessfull'            
          )  ;
        }
      }
    });
  }

  deleteGroup(data:any){
    console.log(data);
    this.apiservice.deleteGroup(data.groupid).subscribe({
      next:(response:any) =>{ 
        console.log(response);
        this.notifier.success(
          'success',
          'Group deleted successfully'            
        )  ;
        this.loadGroup();  
      },
      error:(err:any)=>{
        console.log(err)
        if (err.status === 410)
        {
          this.notifier.success(
            'success',
            'Group deleted successfully'            
          )  ;
          this.loadGroup();  
        }
        else{
          this.notifier.error(
            'Failed',
            'Group deletion usuccessfull'            
          ) 
        }
      }
    });
    
  }

}
