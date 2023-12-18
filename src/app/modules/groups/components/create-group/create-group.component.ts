import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as Aos from 'aos';
import { NotifierService } from 'src/app/core/utils/notifier';
import { ApiservicesService } from 'src/app/services/apiservices.service';



@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  isPageOne: boolean = true;
  // addFeatures: boolean = false;
  groupList: Array<any> = [];
  addGroupForm: FormGroup | any;
  roleList: any = [];
  constructor(private apiservice: ApiservicesService, private fb: FormBuilder, private notifier: NotifierService) { }


  ngOnInit(): void {
    Aos.init({
      once: true,
      // anchorPlacement: 'example-anchor',
      offset: 0
    });
    // this.loadGroup();
    this.addGroupForm = this.fb.group({
      groupname: [''],
      isactive: ['true']
    })

    this.loadRole()
  }

  loadRole() {
    this.apiservice.getActiveRole().subscribe({
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
    feature.addfeature = true
  }

  // loadGroup() {
  //   this.apiservice.getAssignedGrpList().subscribe({
  //     next: (res: any) => {
  //       // console.log(res)
  //       this.groupList = res.map((data: any) => {
  //         return {
  //           groupname: data.groupName,
  //           groupid: data.groupId,
  //           isactive: data.isActive,
  //           action:null
  //         }
  //       })
  //       console.log(this.groupList)
  //       this.dataSource = new MatTableDataSource(this.groupList)
  //     },
  //     error: (err: any) => {
  //       console.log(err)
  //     }
  //   })
  // }

  // addGroup() {
  //   const data = {
  //     "groupName": this.addGroupForm.value.groupname,
  //     "isActive": true
  //   }
  //   console.log(data)
  //   this.apiservice.addGroup(data).subscribe({
  //     next: (res: any) => {
  //       console.log(res)

  //     },
  //     error: (err: any) => {
  //       console.log(err)
  //       if (err.status === 200)
  //       {
  //         this.notifier.success(
  //           'Group created successfully',
  //           'success'
  //         )
  //         this.addGroupForm.reset();
  //         this.loadGroup();


  //       }

  //     }
  //   })
  // }

  // deleteGroup(data:any)
  // {
  //   console.log(data);
  //   this.apiservice.deleteGroup(data.groupid).subscribe({
  //     next:(response:any)=>{

  //       this.notifier.success(
  //       'Group deleted successfully',
  //       'success'
  //     );      
  //     this.loadGroup(); 
  //     },
  //     error:(err:any)=>{
  //       if (err.status === 410)
  //       {
  //         this.notifier.success(
  //           'success',
  //           'Group deleted successfully'            
  //         )         
  //         this.loadGroup();  
  //       }
  //       else
  //       {
  //         this.notifier.error(
  //           'Failed',
  //           'Group deletion unsuccessfull'

  //         )
  //       }
  //     }
  //   });

  // }

  togglePage() {
    // Toggle the value of isPageOne
    this.isPageOne = !this.isPageOne;
  }

}
