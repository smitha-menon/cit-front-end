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
}
