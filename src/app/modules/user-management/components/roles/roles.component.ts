import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'src/app/core/utils/notifier';
import { ApiservicesService } from 'src/app/services/apiservices.service';

export interface Execution {
  rolename: string;
  roleid: string;
  rolecode: string;
  isactive: string;
}

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  displayedColumns = ['Role Id', 'Role Code','Role Name',  'Is Active','Edit','Delete']
  public createRole: FormGroup | any;
  roleList: Array<any> = [];
  dataSource: MatTableDataSource<Execution> = new MatTableDataSource<Execution>(this.roleList);
  hideEdit!:boolean;
  hideAdd!:boolean;
  editRoleId:any;
  constructor(private apiService: ApiservicesService, private fb: FormBuilder,private notifier: NotifierService) { }

  ngOnInit(): void {

    this.hideEdit=true;
    this.hideAdd=false;
    this.loadRole();
    this.createRole = this.fb.group({
      rolename: [''],
      rolecode: [''],
      isactive: ['True'],
      denied: [''],
      allowed: [''],

    })


  }
  addRole() {
    const obj = {
      roleName: this.createRole.value.rolename,
      roleCode: this.createRole.value.rolecode,
      isActive: true,
      deniedAccessMethodNames: [],
      allowedAccessMethodNames: []
    }
    console.log(obj)
    this.apiService.addRole(obj).subscribe({
      next:(res: any) => {
        console.log(res)
      },
      error: (err: any) => {
        console.log(err)
        if (err.status === 201)
        {
          this.notifier.success(
            'success',
            'Role created successfully'
            
          )
          this.createRole.reset();
          this.loadRole();
         
          
        }
    
      }
    })
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
            deniedfeatures:data.deniedAccessMethodNames
          }
        })
        console.log(this.roleList)
        this.dataSource = new MatTableDataSource(this.roleList)
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
  modifyRole(data:any){
    console.log(data);
    this.hideEdit=false;
    this.hideAdd=true;
    this.editRoleId= data.roleid;
    this.createRole= this.fb.group({
      rolename:[data.rolename],
      rolecode: [data.rolecode],
      isactive: [data.isactive],
      denied:[data.deniedfeatures]
    });

    
  }

  EditRole(){
    const obj = {
      roleId:this.editRoleId,
      roleName: this.createRole.value.rolename,
      roleCode: this.createRole.value.rolecode,
      isActive: true,
      deniedAccessMethodNames: this.createRole.value.denied.slice(","),
      allowedAccessMethodNames: []
    }
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
  this.hideEdit=true;
  this.hideAdd=false;
  this.createRole.reset();
  this.loadRole();
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
