import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ApiservicesService } from 'src/app/services/apiservices.service';
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
  displayedColumns = ['Number', 'Priority', 'State','Active','Opened Date']
  public reportfilters : FormGroup | any;
  stateList:any;
  assignGrpList:any;
  priorityList:any;
  defaultSelection:string ='--Select--';
  selectedState: string | any;
  selectedPriority: string | any;
  selectedGroup: string | any;

  constructor( private fb: FormBuilder,private apiservice: ApiservicesService){}
  
  reportList: Array<any> = [];
  dataSource: MatTableDataSource<Execution> = new MatTableDataSource<Execution>(this.reportList);
  ngOnInit(): void {

    this.reportList = [{
      number: '1234',
      priority: 'priority-3',
      state: 'resolved',
      active: 'null',
      openeddate: '12-03-2023'
     },
     {
      number: '1234',
      priority: 'priority-3',
      state: 'resolved',
      active: 'null',
      openeddate: '12-03-2023'
     }]
   this.dataSource = new MatTableDataSource(this.reportList)
   this.loadGroups();
   this.loadPriorityList();
   this.loadStates();

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
   /**Default name for excel file when download**/
   fileName = 'ExcelSheet.xlsx';

  exportexcel() {
    /**passing table id**/
   // let data = document.getElementById('table-data');
  //  debugger
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.dataSource );

  //   /**Generate workbook and add the worksheet**/
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   /*save to file*/
  //   XLSX.writeFile(wb, this.fileName);
   // Create a workbook and add a worksheet
   const data = [
    //this.displayCols,
    this.reportList
    // Add your data here
  ];
  console.table(data);
   const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet( data);

   // Create a workbook with a single sheet
   const wb: XLSX.WorkBook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
   // Save the workbook as an Excel file
   XLSX.writeFile(wb, 'exported-data.xlsx');
  }

}
