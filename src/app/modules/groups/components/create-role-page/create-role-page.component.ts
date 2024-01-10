import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/constant';
import { NotifierService } from 'src/app/core/utils/notifier';
import { ApiservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-create-role-page',
  templateUrl: './create-role-page.component.html',
  styleUrls: ['./create-role-page.component.scss']
})
export class CreateRolePageComponent implements OnInit {
  public createRole: FormGroup | any;
  privilageList: any = [];
  constructor(private apiService: ApiservicesService, private fb: FormBuilder, private notifier: NotifierService, private router: Router) { }

  ngOnInit(): void {

    this.createRole = this.fb.group({
      rolename: [''],
      rolecode: [''],
      featuredenied: [''],
      isactive: ['True'],
    })
    
    this.apiService.getPrivileges().subscribe({
      next:(res: any) => {
        console.log(res)
        this.privilageList = res.map((data: any) => {
          return {
            name: data.userPrivilegeName,
            id: data.userPrivilegeId
          }
        })
        
      }
    })
  }

  addRole() {
    const obj = {
      roleName: this.createRole.value.rolename,
      roleCode: this.createRole.value.rolecode,
      isActive: true,
      deniedAccessMethodNames: this.createRole.value.featuredenied,
      allowedAccessMethodNames: []
    }
    console.log(obj)
    this.apiService.addRole(obj).subscribe({
      next: (res: any) => {
        console.log(res)
      },
      error: (err: any) => {
        console.log(err)
        if (err.status === 201) {
          this.notifier.success(
            'success',
            'Role created successfully'

          )
          this.createRole.reset();
          this.router.navigateByUrl(ROUTES.GROUP)
        }

      }
    })
  }

}
