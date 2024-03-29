import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/constant';
import { ApiservicesService } from 'src/app/services/apiservices.service';

export interface Execution {
  name: string;
  email: string;
  role: string;
  state: string;
  action: string;
}


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  displayedColumns = ['Name', 'Email', 'Number', 'State', 'Action'];
  userList: any = [];
  dataSource: MatTableDataSource<Execution> = new MatTableDataSource<Execution>(this.userList);
  public editUsersDetailsForm: FormGroup | any;
  userEditPopup: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiservice: ApiservicesService,) { }
  ngOnInit(): void {
    this.loadUsers();

    this.editUsersDetailsForm = this.fb.group({
      editusername: ['', [Validators.required]],
      editemailid: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      edituserrole: ['', [Validators.required]],
    });

  }

  getInitials(name: any): string {
    const initials = name
      .split(' ')
      .map((word: any[]) => word[0])
      .join('');
    return initials.toUpperCase();
  }

  loadUsers() {
    this.apiservice.getUsersListToAssign().subscribe({
      next: (data: any) => {
        console.log(data)
        this.userList = data.map((res: any) => {
          return {
            'name': res.username,
            'role': res.role,
            'email':res.emailAddress,
            'state': this.checkState(res),
            'number': res.phoneNumber,
            'userId': res.userId
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
  userEditPop(index: any) {
    
    const queryParams1: NavigationExtras = {
      queryParams: {
        editUser: this.userList[index].userId      
      }
    };
    this.router.navigate([ROUTES.ADDUSER],queryParams1)
  }

  editCancelButton() {
    this.userEditPopup = false;
  }

  checkState(state: any) {
    if (state.isActive === true) {
      return 'active'
    } else {
      return 'inactive'
    }
  }
}
