import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/constant';
import { ApiservicesService } from 'src/app/services/apiservices.service';

export interface Execution {
  name: string;
  email: string;
  role: string;
  state: string;
}


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  displayedColumns = ['Name', 'Email', 'Role', 'State'];
  userList: any = [];
  dataSource: MatTableDataSource<Execution> = new MatTableDataSource<Execution>(this.userList);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiservice: ApiservicesService,) { }
  ngOnInit(): void {
    this.loadUsers();


  }

  getInitials(name: any): string {
    const initials = name
      .split(' ')
      .map((word: any[]) => word[0])
      .join('');
    return initials.toUpperCase();
  }

  loadUsers() {
    this.apiservice.getActiveUsers().subscribe({
      next: (data: any) => {
        console.log(data)
        this.userList = data.map((res: any) => {
          return {
            'name': res.username,
            'role': res.role,
            'state': this.checkState(res)
          }

        })
        console.log(this.userList)
        this.dataSource = new MatTableDataSource(this.userList)
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
  addUserPopUp() {
    this.router.navigateByUrl(ROUTES.ADDUSER)
  }
  goToRoles() {
    this.router.navigateByUrl(ROUTES.ROLES)
  }

  checkState(state: any) {
    if (state.isActive === true) {
      return 'active'
    } else {
      return 'inactive'
    }
  }
}
