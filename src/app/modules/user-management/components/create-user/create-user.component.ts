import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/constant';
import { NotifierService } from 'src/app/core/utils/notifier';
import { groupRoles } from 'src/app/interfaces/user';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { PermissionsService } from 'src/app/services/permissions.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public createUser: FormGroup | any;
  selectedRole: string | any;
  assignGrpList: any = [];
  tableData: any = [];
  selectedGroup: string | any;
  defaultSelection: string = "--Select--";
  roleList: any = [];
  userPermissions: string[]=[];
  selectedItems:string[]=[];
  logedUser:string | any;
  



  constructor(private fb: FormBuilder, 
    private apiservice: ApiservicesService, 
    private notifier: NotifierService,
    private routes: Router, private permissionsService: PermissionsService) { 

      this.permissionsService.loginreponse$.subscribe((data) => {
        this.logedUser = data.loginUser;
      });
    }

  ngOnInit(): void {
    this.loadRole();
    this.loadGroups();
   
    // console.log(this.permissonRes.getLoginResponse())
    this.createUser = this.fb.group({
      username: [''],
      company: ['G10X'],
      passwordtxt: [''],
      phone:[''],
      email:[''],
      createdby: [''],
      createdon: [(new Date()).toLocaleDateString("en-GB") + ' ' + (new Date()).toLocaleTimeString('en-IT', { hour12: false })],

    })
  }

  loadRole() {
    this.apiservice.getActiveRole().subscribe({
      next: (res: any) => {
        console.log(res)
        this.roleList = res
      },
      error: (err: any) => console.log(err)
    })
  }
  loadGroups() {
    this.apiservice.getAssignedGrpList().subscribe({
      next: (data: any) => {
        console.log(data)
        this.assignGrpList = data
        // this.assignGrpList = this.assignGrpList.split(',')  
      },
      error: (err: any) => {
        console.log(err)

      }
    });
  }

  eventCheck(data:any){

   if(data.target.checked && this.selectedRole!= "undefined")
   {this.userPermissions=[];
     this.roleList.find((x:any)=>{       
      if(x.roleName=== this.selectedRole)
      {
        this.userPermissions=x.deniedAccessMethodNames;        
      }
    });   

   }
  }
  onSelectionChange(event:any){
    this.selectedItems = event.source.selectedOptions.selected.map((option:any) => option.value);
    console.log('Selected Items:', this.selectedItems);
  }


deleteItem(data:any){
  
  this.tableData = this.tableData.splice((item:any) => item.column2 == data);
}

  addUser() {
    let roles:groupRoles[]=[];

  this.tableData.forEach((element:any) => {
  
  roles.push({assignedGroupId:element.column2,
            customizedPrivileges:element.column3,
            roleId:this.roleList.find((x:any)=> x.roleName==element.column1).roleId
        });
});

   
    const obj = {
      "username": this.createUser.value.username,
      "password": this.createUser.value.passwordtxt,//Array(8).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join(''),
      //"role": this.tableData.map((arr: any) => arr.column1),
      "emailAddress": this.createUser.value.email,
      "phoneNumber":this.createUser.value.phone,
      "company": this.createUser.value.company,
      "createdBy":  this.logedUser,
      "updatedBy": "",
      "createdOn": this.createUser.value.createdon,
      "updatedOn": "",
      //"assignedGroup": this.tableData.map((arr: any) => arr.column2),
      "isActive": true,
      //"customizedPrivileges":this.tableData.map((arr: any) => arr.column3),
      "groupRoles":roles
    }
    console.log(obj)
    this.apiservice.addUser(obj).subscribe({
      next :(response:any)=>{
        console.log(response)
        // this.receivedData = ''
        this.notifier.success(
          'User Created successfully',
          'success'
        )
         this.createUser.reset()
          this.routes.navigateByUrl(ROUTES.USERS)
      },
      error: (err: any) => {
        console.log(err)
        if (err.status === 201)
        {
          this.notifier.success(
            'User created successfully',
            'success'
          )

        }

      }


    })
  }

  addGroupRo() {
 
    const groupValue = this.selectedGroup;
    const roleValue = this.selectedRole

    this.tableData.push({
      column1: roleValue,
      column2: groupValue,
      column3:this.selectedItems
    });
   
    console.log(this.tableData)
  }

}
