import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PermissionsService } from 'src/app/services/permissions.service';

@Component({
  selector: 'app-pie-incident-list',
  templateUrl: './pie-incident-list.component.html',
  styleUrls: ['./pie-incident-list.component.scss']
})
export class PieIncidentListComponent implements OnInit {

  //private permissionsService = inject(PermissionsService);
  constructor(private permissionsService: PermissionsService,private route:ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {

      if (params['index']!==undefined)
      {
        console.log('index',params['index']);
        this.setdatasource(params['index']);
      }
    });
   }
  dataSource:any;
  itemsPerPage = [5, 10, 15];
  displayCols = ['Number', 'SLA', 'SLA Lapse', 'Priority','Application', 'Opened Date', 'Assigned To'];

  onPageChange(event: any) {
  }
  ngOnInit(): void {

    // const tabledata= localStorage.getItem("tabledata")??"";
    // console.log(JSON.parse(tabledata));

    var data:any =  localStorage.getItem("tabledata");
       data=JSON.parse(data??"");
       console.log('datalegend',data);
     var  newdata = data.todayIncidentsList?.map((data: any) => {
        return {
          'Number': data.incidentId,
          'SLA': data.sla,
          'SLA Lapse':data.slalapse,
          'Priority': data.priority,//this.priorityList.find((x:any)=>( x.priorityId === data.priority))?.priorityValue??data.priority,
          'Assigned To':data.assignedTo,//this.assignUsrList.find((x:any)=>(x.userId == data.assignedTo))?.username??data.assignedTo,
          'Opened Date': data.openedDate,
          'Application':data.applicationId//this.applnList.find((x:any)=>(x.applicationId == data.applicationId))?.applicationName??data.applicationId
        }
      });
      this.dataSource= new MatTableDataSource(newdata);
  }

setdatasource(number:any){

   var data:any =  localStorage.getItem("tabledata");
  data=JSON.parse(data??"");
  console.log('datalegend',data);
  let listData=[];
  switch (number){
    case 0:
      listData=data.todayIncidentsList;
      break;
    case 1:
      listData= data.tomorrowIncidentsList;
      break;
    case 2:
      listData= data.lessThanTwoDaysIncidentsList;
      break;
    case 3:
      listData= data.lessThanFiveDaysIncidentsList;
      break;

  }

  var  newdata = listData?.map((data: any) => {
    return {
      'Number': data.incidentId,
      'SLA': data.sla,
      'SLA Lapse':data.slalapse,
      'Priority': data.priority,//this.priorityList.find((x:any)=>( x.priorityId === data.priority))?.priorityValue??data.priority,
      'Assigned To':data.assignedTo,//this.assignUsrList.find((x:any)=>(x.userId == data.assignedTo))?.username??data.assignedTo,
      'Opened Date': data.openedDate,
      'Application':data.applicationId//this.applnList.find((x:any)=>(x.applicationId == data.applicationId))?.applicationName??data.applicationId
    }
  });
  this.dataSource= new MatTableDataSource(newdata);

}

}
