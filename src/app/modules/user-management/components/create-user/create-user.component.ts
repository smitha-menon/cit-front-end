import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/constant';
import { NotifierService } from 'src/app/core/utils/notifier';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { PermissionsService } from 'src/app/services/permissions.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public createUser: FormGroup | any;
  selectedState: string | any;
  assignGrpList: any =[];
  selectedGroup: string | any;
  defaultSelection: string = "--Select--";
  priorityList: any = [];
  constructor(private fb: FormBuilder, private apiservice: ApiservicesService,private notifier: NotifierService, private routes: Router, private permissonRes: PermissionsService) { }

  ngOnInit(): void {
    this.loadRole();
    this.loadGroups();
// console.log(this.permissonRes.getLoginResponse())
    this.createUser = this.fb.group({
      username: [''],
      company: ['G10X'],
      applicationname: ['CIT 3.0'],
      createdby: [''],
      createdon: [(new Date()).toLocaleDateString("en-GB") + ' ' + (new Date()).toLocaleTimeString('en-IT', { hour12: false })],

    })
  }

  loadRole() {
    this.apiservice.getActiveRole().subscribe({
      next: (res: any) => {
        // console.log(res)
        this.priorityList = res
      },
      error: (err: any) => console.log(err)
    })
  }
  loadGroups(){
    this.apiservice.getAssignedGrpList().subscribe({
      next :(data:any)=>{
        console.log(data)
        this.assignGrpList = data 
       // this.assignGrpList = this.assignGrpList.split(',')  
      },
      error: (err: any) => {
        console.log(err)
        
      }
    });
  }

  addUser() {
    const obj = {
      "username": this.createUser.value.username,
      "password": Array(8).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join(''),
      "role": this.selectedState,
      "applicationName": this.createUser.value.applicationname,
      "company": this.createUser.value.company,
      "createdBy": "superadmin",
      "updatedBy": "superadmin",
      "createdOn": this.createUser.value.createdon,
      "updatedOn": this.createUser.value.createdon,
      "assignedGroup": this.selectedGroup,
      "isActive": true
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


}
