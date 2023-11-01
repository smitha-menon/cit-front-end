import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiservicesService } from 'src/app/services/apiservices.service';

export interface Execution {
  groupname: string;
  groupid: string;
  // role: string;
  isactive: string;
}


@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  displayedColumns = ['Group Name', 'Group Id', 'Is Active']
  groupList: Array<any> = [];
  constructor(private apiservice: ApiservicesService) { }
  dataSource: MatTableDataSource<Execution> = new MatTableDataSource<Execution>(this.groupList);

  ngOnInit(): void {

    this.loadGroup();
  }

  loadGroup() {
    this.apiservice.getAssignedGrpList().subscribe({
      next: (res: any) => {
        // console.log(res)
        this.groupList = res.map((data: any) => {
          return {
            groupname: data.groupName,
            groupid: data.groupId,
            isactive: data.isActive
          }
        })
        console.log(this.groupList)
        this.dataSource = new MatTableDataSource(this.groupList)
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

}
