import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as Aos from 'aos';
import { NotifierService } from 'src/app/core/utils/notifier';
import { ApiservicesService } from 'src/app/services/apiservices.service';


@Component({
  selector: 'app-role-page',
  templateUrl: './role-page.component.html',
  styleUrls: ['./role-page.component.scss']
})
export class RolePageComponent implements OnInit{
  // isPageOne: boolean = true;
  // addFeatures: boolean = false;
  public createRole: FormGroup | any;
  groupList: Array<any> = [];
  roleList: any = [];
  editRoleId: any;
  constructor(private apiService: ApiservicesService, private fb: FormBuilder, private notifier: NotifierService) { }
  
  ngOnInit(): void {
    Aos.init({
      once: true,
      // anchorPlacement: 'example-anchor',
      offset: 0
    });
    // this.loadGroup();
    this.createRole = this.fb.group({
      rolename: [''],
      rolecode: [''],
      isactive: ['True'],
    })
    this.loadRole()
  }
 


  loadRole() {
    this.apiService.getActiveRole().subscribe({
      next: (res: any) => {
        // console.log(res)
        this.roleList = res.map((data: any) => {
          return {
            rolename: data.roleName,
            roleid: data.roleId,
            rolecode: data.roleCode,
            isactive: data.isActive,
            deniedfeatures: data.deniedAccessMethodNames,
            addfeature: false,
          }
        })
        console.log(this.roleList)
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  editAccordian(feature: any, index: any) {
    console.log(feature)
    feature.addfeature = true
    this.editRoleId= feature.roleid;
    this.createRole= this.fb.group({
      rolename:[feature.rolename],
      rolecode: [feature.rolecode],
    });
  }
  cancelChanges(feature: any) {
    feature.addfeature = false
  }
  saveChanges() {
    const obj = {
      roleId:this.editRoleId,
      roleName: this.createRole.value.rolename,
      roleCode: this.createRole.value.rolecode,
      isActive: true,
      // deniedAccessMethodNames: this.createRole.value.denied.slice(","),
      allowedAccessMethodNames: []
    }
    console.log(obj)
    console.log("editdata"+ JSON.stringify(obj));
    this.apiService.modifyRole(obj).subscribe({
      next:(response:any) =>{ 
        console.log(response);
        this.notifier.success(
          'success',
          'Role updated successfully'            
        )  ;
        this.loadRole();  
      },
      error:(err:any)=>{
        console.log(err)
        if (err.status === 200)
        {
          this.notifier.success(
            'success',
            'Role updated successfully'            
          )  ;
          this.loadRole();  
        }
        else{
          this.notifier.error(
            'Failed',
            'Role updation unsuccessfull'            
          ) 
        }
      }
    });
  }
  deleteRole(data:any){
    console.log(data);
    this.apiService.deleteRole(data.roleid).subscribe({
      next:(response:any) =>{ 
        console.log(response);
        this.notifier.success(
          'success',
          'Role deleted successfully'            
        )  ;
        this.loadRole();  
      },
      error:(err:any)=>{
        console.log(err)
        if (err.status === 410)
        {
          this.notifier.success(
            'success',
            'Role deleted successfully'            
          )  ;
          this.loadRole();  
        }
        else{
          this.notifier.error(
            'Failed',
            'Role deletion usuccessfull'            
          ) 
        }
      }
    });
    
  }
}
