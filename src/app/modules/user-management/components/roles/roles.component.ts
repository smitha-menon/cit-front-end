import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  displayedColumns = ['Role Name', 'Role Id', 'Role Code', 'Is Active']
  public createRole: FormGroup | any;
  roleList: Array<any> = [];
  dataSource: MatTableDataSource<Execution> = new MatTableDataSource<Execution>(this.roleList);
  constructor(private apiService: ApiservicesService, private fb: FormBuilder,private notifier: NotifierService) { }

  ngOnInit(): void {

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
            'User created successfully',
            'success'
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
            isactive: data.isActive
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
}
