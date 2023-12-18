import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import * as fileSaver from 'file-saver';
import { reportFilters } from 'src/app/interfaces/incidents';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';

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
  startDate:any;
  endDate:any;

  constructor( private fb: FormBuilder,private apiservice: ApiservicesService){}
  
  reportList: Array<any> = [];
  dataSource: MatTableDataSource<Execution> = new MatTableDataSource<Execution>(this.reportList);
  ngOnInit(): void {
   this.dataSource = new MatTableDataSource(this.reportList)
   this.loadGroups();
   this.loadPriorityList();
   this.loadStates();
   this.loadUsers();
 
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

    this.startDate=isNaN(this.startDate)?new Date( Date.now()).toLocaleDateString("en-GB"):this.startDate.toLocaleDateString("en-GB");    
    this.endDate =isNaN(this.endDate)?new Date( Date.now()).toLocaleDateString("en-GB"):this.endDate.toLocaleDateString("en-GB"); 
    
    this.selectedGroup=(this.selectedGroup=="undefined")?undefined:this.selectedGroup;
    this.selectedUser=(this.selectedUser=="undefined")?undefined:this.selectedUser;
    this.selectedPriority=(this.selectedPriority=="undefined")?undefined:this.selectedPriority;
    this.selectedState=(this.selectedState=="undefined")?undefined:this.selectedState;
  
    
    this.rpt ={
      assignedGroupId: this.selectedGroup,
      assignedId: this.selectedUser,
      state: this.selectedState,
      priority: this.selectedPriority,
      fromDate: this.startDate+" 00:00:00",
      toDate:  this.endDate+" 00:00:00"
      
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
         
          item.Priority = this.priorityList.find((x:any)=>( x.priorityId === item.Priority))?.priorityValue;
          item.State =  this.stateList.find((x:any)=>( x.statusId === item.State))?.statusValue;
          item.AssignedTo =  this.assignUsrList.find((x:any)=>(x.userId == item.AssignedTo))?.username;
           
       });
        this.dataSource = new MatTableDataSource(this.reportList)
      },
      error:(err)=>{console.log(err)}

    });

    
  }
   /**Default name for excel file when download**/
   fileName = 'IncidentReport.xlsx';
 


  exportexcel(){
  const ws = XLSX.utils.json_to_sheet(this.reportList);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 let buf = XLSX.write(wb,{bookType:"xlsx",type:"buffer"})
 XLSX.write(wb,{bookType:"xlsx",type:"binary"});
 XLSX.writeFile(wb,this.fileName);
}


  exportPDF() {
 
   const data =     this.reportList;

  
  console.table(data);
  //const htmlContent ='<h1>Hello, PDF!</h1><p>This is a sample PDF content.</p>';// this.generateHtmlFromData();

  let flattenedData: any[] = data.flat(); // Use flat() to flatten the array
  let jsonStrings: string[] = flattenedData.map(obj => JSON.stringify(obj));

  // Create a Blob from the JSON strings
  let blob: Blob = new Blob(jsonStrings, { type: 'application/pdf; charset=utf-8' });
  //const blob = new Blob(data, { type: 'application/pdf; charset=utf-8'});
  const url = window.URL.createObjectURL(blob);
  //console.log(htmlContent);
  // Save the Blob as a PDF
  fileSaver.saveAs(blob, 'summaryReport.pdf');
  }

  private generateHtmlFromData(): string {
    // Create an HTML table from the array data
    const tableRows = this.reportList.map(item => `<tr><td>${item.Number}</td><td>${item.Description}</td></tr>`).join('');

    
    const htmlContent = `<table><thead><tr><th>Name</th><th>Value</th></tr></thead><tbody>${tableRows}</tbody></table>`;
    return htmlContent;
  }

  toggle(event:any) {
    this.toggled = !this.toggled  
  }
}
