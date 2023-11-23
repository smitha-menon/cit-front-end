import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface Execution {
  number: string;
  priority: string;
  state: string;
  active:string;
  openeddate:string
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit {
  displayedColumns = ['Number', 'Priority', 'State','Active','Opened Date']
  
  groupList: Array<any> = [];
  dataSource: MatTableDataSource<Execution> = new MatTableDataSource<Execution>(this.groupList);
  ngOnInit(): void {

    this.groupList = [{
      number: '1234',
      priority: 'priority-3',
      state: 'resolved',
      active: 'null',
      openeddate: '12-03-2023'
     }]
   this.dataSource = new MatTableDataSource(this.groupList)
  }

}
