import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/constant';
import { NotifierService } from 'src/app/core/utils/notifier';
import { ApiservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-create-group-page',
  templateUrl: './create-group-page.component.html',
  styleUrls: ['./create-group-page.component.scss']
})
export class CreateGroupPageComponent implements OnInit {
  addGroupForm: FormGroup | any;
  applicationList: Array<any> =[];
  usrList:any=[];
  defaultSelection:string='--Select--';
  selectedUser:string| any;
  constructor(private apiservice: ApiservicesService, private fb: FormBuilder, private notifier: NotifierService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
    this.addGroupForm = this.fb.group({
      groupname: [''],
      isactive: ['true'],
      application: ['']
    })
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
  addGroup() {
    const data = {
      "groupName": this.addGroupForm.value.groupname,
      "isActive": true,
      "groupAdminId": this.selectedUser,
      "applications": this.addGroupForm.value.application
    }
    console.log(data)
    this.apiservice.addGroup(data).subscribe({
      next: (res: any) => {
        console.log(res)

      },
      error: (err: any) => {
        console.log(err)
        if (err.status === 200) {
          this.notifier.success(
            'Group created successfully',
            'success'
          )
          this.addGroupForm.reset();
            this.router.navigateByUrl(ROUTES.GROUP)

        }

      }
    })
  }
}
