import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import * as fileSaver from 'file-saver';
import { reportFilters } from 'src/app/interfaces/incidents';

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
  displayedColumns = ['Number', 'Priority', 'State','Description','Assigned To','Opened Date','Opened By']
  public reportfilters : FormGroup | any;
   rpt!:reportFilters;
  stateList:any;
  assignGrpList:any;
  priorityList:any;
  defaultSelection:string ='--Select--';
  selectedState: string | any;
  selectedPriority: string | any;
  selectedGroup: string | any;
  selectedUser: string | any;
  toggled: boolean = true;
  statusClass = 'non-active';
  assignUsrList: any;

  constructor( private fb: FormBuilder,private apiservice: ApiservicesService){}
  
  reportList: Array<any> = [];
  dataSource: MatTableDataSource<Execution> = new MatTableDataSource<Execution>(this.reportList);
  ngOnInit(): void {

    // this.reportList = [{
    //   number: '1234',
    //   priority: 'priority-3',
    //   state: 'resolved',
    //   active: 'null',
    //   openeddate: '12-03-2023'
    //  },
    //  {
    //   number: '1234',
    //   priority: 'priority-3',
    //   state: 'resolved',
    //   active: 'null',
    //   openeddate: '12-03-2023'
    //  }]
   this.dataSource = new MatTableDataSource(this.reportList)
   this.loadGroups();
   this.loadPriorityList();
   this.loadStates();
   this.loadUsers();
   

  //  this.reportfilters = this.fb.group(({
  //   state: new FormControl({value:, disabled: true}),
  //   priority: new FormControl({value: , disabled: true}),   
  //   assignedgroup: new FormControl({value: , disabled: true}),
  //   duedate: new FormControl({value: , disabled: true}),
  //   openeddate:  new FormControl({value: , disabled: true}),
    
  // }))
   }

  loadStates(){
    this.apiservice.getStatusList().subscribe({
      next :(data:any)=>{
        console.log(data)
        this.stateList = data           
      },
      error: (err: any) => {
        console.log(err)
        
      }
    });
  }

  loadGroups(){
    this.apiservice.getAssignedGrpList().subscribe({
      next :(data:any)=>{
        console.log(data)
        this.assignGrpList = data         
      },
      error: (err: any) => {
        console.log(err)
        
      }
    });
  }
  loadUsers(){
    this.apiservice.getUsersListToAssign().subscribe({
      next :(data:any)=>{
        console.log(data)
        this.assignUsrList =data         
      },
      error: (err: any) => {
        console.log(err)        
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
        
      }
    });
  }



  viewreport(){

    this.selectedGroup=(this.selectedGroup=="undefined")?undefined:this.selectedGroup;
    this.selectedUser=(this.selectedUser=="undefined")?undefined:this.selectedUser;
    this.selectedPriority=(this.selectedPriority=="undefined")?undefined:this.selectedPriority;
    this.selectedState=(this.selectedState=="undefined")?undefined:this.selectedState;
  
    
    this.rpt ={
      assignedGroupId: this.selectedGroup,
      assignedId: this.selectedUser,
      state: this.selectedState,
      priority: this.selectedPriority,
      fromDate: "01/02/2023 00:00:00",
      toDate: "01/12/2023 00:00:00"
      
    };
    
    this.apiservice.getReport( this.rpt).subscribe({
      next:(response)=>{
        this.reportList =response;
        this.reportList = response?.map((data: any) => {
          return {
            'Number': data.incidentId,
            'Description': data.description,
            'State': data.state,
            'Priority': data.priority,
            'AssignedTo': data.assignedTo,
            'OpenedDate': data.openedDate,
            'OpenedBy':data.openedBy
          }
        });
        this.reportList.forEach(item =>{
          //priority
          this.priorityList.find(function (x:any) {            
                                                      if( x.priorityId === item.Priority)
                                                       {            
                                                          item.Priority = x.priorityValue;             
                                                       }
                                                 });
          this.stateList.find(function(x:any){            
                                                    if( x.statusId === item.State)
                                                       {            
                                                          item.State = x.statusValue;             
                                                       }

                                            });
          this.assignUsrList.find(function(x:any){
            
            // item.AssignedTo= ( x.userId === item.AssignedTo)?"":x.username;
                                                      //  {      console.log("assignto"+x.username);      
                                                      //     item.AssignedTo = x.username;             
                                                      //  }

                                                  });
           
        });
        this.dataSource = new MatTableDataSource(this.reportList)
      },
      error:(err)=>{console.log(err)}

    });

    
  }
   /**Default name for excel file when download**/
   fileName = 'ExcelSheet.xlsx';

  exportexcel() {
 
   const data = [

    this.reportList

  ];
  console.table(data);
  let flattenedData: any[] = data.flat(); // Use flat() to flatten the array
  let jsonStrings: string[] = flattenedData.map(obj => JSON.stringify(obj));

  // Create a Blob from the JSON strings
  let blob: Blob = new Blob(jsonStrings, { type: 'application/pdf; charset=utf-8' });
  
  // Save the Blob as a PDF
  fileSaver.saveAs(blob, 'summaryReport.pdf');
  }

  toggle(event:any) {
    this.toggled = !this.toggled  
  }
}
