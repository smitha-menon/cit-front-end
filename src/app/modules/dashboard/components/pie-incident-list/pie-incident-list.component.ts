import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { PermissionsService } from 'src/app/services/permissions.service';

@Component({
  selector: 'app-pie-incident-list',
  templateUrl: './pie-incident-list.component.html',
  styleUrls: ['./pie-incident-list.component.scss']
})
export class PieIncidentListComponent implements OnInit {
  assignUsrList: any;
  priorityList: any;

  //private permissionsService = inject(PermissionsService);
  constructor(private permissionsService: PermissionsService,private route:ActivatedRoute,
    private apiservice:ApiservicesService) {
    //this.loadUsers();
    //this.loadPriorityList();
    // this.route.queryParams.subscribe((params) => {

    //   if (params['index']!==undefined)
    //   {
    //     console.log('index',params['index']);
    //     this.setdatasource(params['index']);
    //   }
    // });
    
   }
  dataSource:any;
  pageIndex:Number=0;
  itemsPerPage = [5, 10, 15];
  displayCols = ['Number', 'SLA', 'SLA Lapse', 'Priority','Application', 'Opened Date', 'Assigned To'];

  onPageChange(event: any) {
  }


  ngOnInit(): void {
   
    this.route.queryParams.subscribe((params) => {

      if (params['index']!==undefined)
      {
        console.log('index',params['index']);
        const data=this.setdatasource(params['index']);
        console.log(data);
        this.dataSource= new MatTableDataSource(data);
      }
    });

    this.loadUsers();
  this.loadPriorityList();
  console.log("priority1", this.priorityList);
  console.log("user1", this.assignUsrList);

    
  }

setdatasource(index:any):any{

   var data:any =  localStorage.getItem("tabledata");
  data=JSON.parse(data??"");
  console.log('datalegend',data);
  let listData=[];
  //listData=data.todayIncidentsList;
  switch (index){
    case '0':
      {
      listData=data.todayIncidentsList;
      console.log('datalegend1',listData);
      break;
      }
    case '1':
      {listData= data.tomorrowIncidentsList;
      break;
      }
    case '2':
      listData= data.lessThanTwoDaysIncidentsList;
      break;
    case '3':
      listData= data.lessThanFiveDaysIncidentsList;
      break;

  }
  //this.loadUsers();
  //this.loadPriorityList();
  
  // console.log("priority", this.priorityList);
  // console.log("user", this.assignUsrList);
  
  var  newdata = listData?.map((data: any) => {
    return {
      'Number': data.incidentId,
      'SLA': data.sla,
      'SLA Lapse':data.slalapse,
      'Priority': data.priority,//this.priorityList?.find((x:any)=>(x.priorityId === data.priority))?.priorityValue??data.priority,
      'Assigned To': data.assignedTo,//this.assignUsrList?.find((x:any)=>(x.userId === data.assignedTo))?.username??data.assignedTo,
      'Opened Date': data.openedDate,
      'Application':data.applicationId//this.applnList.find((x:any)=>(x.applicationId == data.applicationId))?.applicationName??data.applicationId
    }
  });
  this.dataSource= new MatTableDataSource(newdata);

  return newdata;

}

loadUsers(){
  this.apiservice.getUsersListToAssign().subscribe({
    next :(data:any)=>{
      console.log(data)
      this.assignUsrList =data   
     
  console.log("user2", this.assignUsrList);      
    },
    error: (err: any) => {
      console.log(err)        
    },
    complete: () => {
      this.dataSource.data.forEach((element:any) =>{
        element.assignedTo=this.assignUsrList?.find((x:any)=>(x.userId === element.assignedTo))?.username??element.assignedTo;
      });
      console.log("Observable1 complete",this.dataSource);
    }
  });
}

loadPriorityList(){

  this.apiservice.getPriorityList().subscribe({
    next :(data:any)=>{
      console.log(data)
      this.priorityList = data         
    },
    error: (err: any) => {
      console.log(err)
      
    },
    complete: () => {

    this.dataSource.data.forEach((element:any) =>{
      element.priority=this.priorityList?.find((x:any)=>(x.priorityId === element.priority))?.priorityValue??element.priority;
    })

      console.table("Observable2 complete",this.dataSource);
    }
  });
}


}
