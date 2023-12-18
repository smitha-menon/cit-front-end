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
  groupList: Array<any> = [];
  addGroupForm: FormGroup | any;
  constructor(private apiservice: ApiservicesService, private fb: FormBuilder, private notifier: NotifierService) { }

  ngOnInit(): void {
    Aos.init({
      once: true,
      // anchorPlacement: 'example-anchor',
      offset: 0
    });
    this.loadGroup();


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
          }
        })
        console.log(this.groupList)
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

}
