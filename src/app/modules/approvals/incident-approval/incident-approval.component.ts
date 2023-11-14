import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'src/app/core/utils/notifier';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { PermissionsService } from 'src/app/services/permissions.service';

@Component({
  selector: 'app-incident-approval',
  templateUrl: './incident-approval.component.html',
  styleUrls: ['./incident-approval.component.scss']
})
export class IncidentApprovalComponent implements OnInit{
  displayedColumns = ['IncidentId', 'Active', 'Priority', 'State','OpenedBy','OpenedDate','ApprovalStatus','Action'];
  incidentList: any = [];
  dataSource: any ;   
  groupid:any;

  constructor( private permissionsService:PermissionsService,
               private apiservice:ApiservicesService,
               private notifier: NotifierService ) {}

ngOnInit(): void {

this.permissionsService.loginreponse$.subscribe((data)=>{

this.groupid=data.assignedGroupId;

});
      
this.groupid=1;
this.loadIncidents();
  }
public approve(element:any):void{
  console.log("approve:"+JSON.stringify(element));
   this.apiservice.approveIncident(element.IncidentId).subscribe({
    next :(data:any)=>{
      console.log(data)      
      this.notifier.success(
        'Success!',
        "Incident Approved")
    },
    error: (err: any) => {
      console.log(err)
      if (err.status == 200) {
        
        this.notifier.success(
          'Success!',
          "Incident Approved"
        )
      } else {
        this.notifier.error(
          'Failed!',
          "Approval Failed"
        )
      }
      
    }
  });
  this.loadIncidents();
}
  public loadIncidents() : void 
  {   
   
  
    this.apiservice.getIncidentApprovals(this.groupid).subscribe({
      next : (response: any) => {
        console.log(response);                       
        this.incidentList=response?.map((data : any) =>{
                          return {
                            'IncidentId' :data.incidentId,
                            'Active' : data.active,
                            'State' : data.state,
                            'Priority' : data.priority,
                            'OpenedBy' :  data.openedBy,
                            'OpenedDate' : data.openedDate,
                            'ApprovalStatus': data.approvalStatus                            
                          }});   
                          this.dataSource = new MatTableDataSource(this.incidentList)

      },
      error: (err: any) =>{ 
               console.log(err);
      }
    });
  }

}
