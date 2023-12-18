
import { AfterViewInit, Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ROUTES, userRoles } from 'src/app/core/constants/constant';
import { INCIDENT_ID_KEY } from 'src/app/core/constants/local-storage-keys';
import { Incidents } from 'src/app/interfaces/incidents';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepicker } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { PermissionsService } from 'src/app/services/permissions.service';

@Injectable()

export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {

    if (value) {

      const date = value.split(this.DELIMITER);

      return {

        day: parseInt(date[0], 10),

        month: parseInt(date[1], 10),

        year: parseInt(date[2], 10),

      };

    }

    return null;

  }

  format(date: NgbDateStruct | null): string {

    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';

  }

}

@Component({
  selector: 'app-incident-details-page',
  templateUrl: './incident-details-page.component.html',
  styleUrls: ['./incident-details-page.component.scss']
})

export class IncidentDetailsPageComponent implements OnInit {
  @ViewChild(MatSort) matsort = new MatSort()
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  currentPage: number = 0;
  totalPages: number = 0;
  startIndex: number = 1;
  endIndex: number = 16;
  showloader: boolean = true;
  displayCols = ['Number', 'Active', 'State', 'Priority', 'Opened Date', 'Assigned To'];
  itemsPerPage = [5, 10, 15];
  incidentDetails: any = [];
  filteredIncidents: any = [];
  dataSource = new MatTableDataSource(this.incidentDetails);
  selectedDate: NgbDateStruct | any;
  searchText: any;
  filterInput: any;
  pipe = new DatePipe('en-US');
  userPermissions: string[] = [];
  groupid: any;
  userid: any;

  incidentDetailForm: boolean = false;
  priorityList: any = [];
  stateList: any = [];

  assignUsrList: any;
  // priorityList:any;
  // stateList:any;


  constructor(private routes: Router, private permissionsService: PermissionsService,
    private fb: FormBuilder, private apiservice: ApiservicesService) { }

  ngOnInit(): void {
    this.loadPriorityList();
    this.loadStates();

    this.permissionsService.loginreponse$.subscribe((data) => {
      console.log("datauser" + JSON.stringify(data));
      this.userid = (data.roles[0].roleCode == userRoles.BU || data.roles[0].roleCode == userRoles.SA) ? null : data.assignedToId;
      this.groupid = (data.roles[0].roleCode == userRoles.BU || data.roles[0].roleCode == userRoles.SA) ? data.groupRoles[0].assignedGroupId : null;
      this.userPermissions = data.roles[0].deniedAccessMethodNames;
    });
    console.log("permissiona" + this.userPermissions);
    this.loadIncidents();
    console.log("from init" + this.incidentDetails);

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
  


  editForm(index: any) {
    console.log(this.incidentDetails[index])
    this.incidentDetailForm = true;

  }
  editCancelButton() {
    this.incidentDetailForm = false;
  }

  searchPageFilter(input: any) {
    this.dataSource.filter = input.target.value;
    console.log(input.value)
  }
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    console.log("pageindex" + event.pageIndex);
    console.log("pagesize" + event.pageSize);
    console.log(event.length);

    this.totalPages = Math.ceil(event.length / event.pageSize);
    console.log("totalpages" + this.totalPages);
    if (this.currentPage + 1 == this.totalPages) {
      this.startIndex = event.length;
      this.endIndex = this.startIndex + this.itemsPerPage[2] + 1;
      this.loadIncidents();
    }

  }

  onInputChange() {
    console.log("start" + this.searchText)
    console.log("after" + this.searchText.day);

    if (this.searchText.day != undefined) {
      let inputDate = new Date(this.searchText.year, this.searchText.month - 1, this.searchText.day);
      this.filterInput = this.pipe.transform(inputDate, 'dd/MM/yyyy')

      console.log("date2" + this.searchText)
    }
    else {
      this.filterInput = this.searchText
      console.log("search" + this.searchText)
    }
    this.incidentDetails = [];
    this.filteredIncidents = [];
    this.startIndex = 0;
    this.endIndex = this.itemsPerPage[2] + 1;
    this.loadIncidents()

  }

  viewIncident(row: any) {
    console.log(row)
    localStorage.setItem(INCIDENT_ID_KEY, row.Number)
    this.routes.navigateByUrl(ROUTES.VIEWSTEPS)
  }


  public loadIncidents(): void {
    let newdata: any;
    this.showloader = true;
    console.log("length" + this.filterInput?.length);

    this.apiservice.getIncidentsList(this.startIndex, this.endIndex, this.filterInput, this.userid, this.groupid).subscribe({
      next: (response: any) => {
        console.log(response);
        newdata = response?.map((data: any) => {

         // data=this.updateData(data);
          return {
            'Number': data.incidentId,
            'Active': this.checkActive(data.active),
            'State': this.stateList.find((x:any)=>( x.statusId === data.state))?.statusValue,
            'Priority': this.priorityList.find((x:any)=>( x.priorityId === data.priority))?.priorityValue,
            'Assigned To':this.assignUsrList.find((x:any)=>(x.userId == data.assignedTo))?.username,
            'Opened Date': data.openedDate
          }
        });
        this.showloader = false;
        if (this.filterInput?.length > 0) {

          this.filteredIncidents = this.filteredIncidents.concat(newdata)
          //this.updateData(this.filteredIncidents);
          this.dataSource = new MatTableDataSource(this.filteredIncidents)
          this.incidentDetails = [];
          this.updateIncidents(this.filteredIncidents);
        }
        else {
          this.filteredIncidents = [];
          this.incidentDetails = this.incidentDetails.concat(newdata);
          //this.updateData(this.incidentDetails);
          this.dataSource = new MatTableDataSource(this.incidentDetails)
          this.updateIncidents(this.incidentDetails);
        }
        this.dataSource.sort = this.matsort
        this.dataSource.paginator = this.paginator
        console.log("inside load" + this.incidentDetails);

      },
      error: (err: any) => {
        this.showloader = false;
        console.log(err);
      }
    });
  }

  checkActive(data: any) {
    if (data == 'null') {
      return '-'
    } else {
      return data
    }
  }

  // loadPriorityList() {

  //   this.apiservice.getPriorityList().subscribe({
  //     next: (data: any) => {
  //       console.log(data)
  //       this.priorityList = data
  //     },
  //     error: (err: any) => {
  //       console.log(err)

  //     }
  //   });
  // }

  // loadStates() {
  //   this.apiservice.getStatusList().subscribe({
  //     next: (data: any) => {
  //       console.log(data)
  //       this.stateList = data
  //     },
  //     error: (err: any) => {
  //       console.log(err)

  //     }
  //   });
  // }

  updateIncidents(data: any) {
  
    data.forEach((item: { Priority: any; State: any; }) => {
      const foundPriority = this.priorityList.find((x: any) => x.priorityId === item.Priority);
  
      if (foundPriority) {
        item.Priority = foundPriority.priorityValue;
      }
  
      const foundState = this.stateList.find((x: any) => x.statusId === item.State);
  
      if (foundState) {
        item.State = foundState.statusValue;
      }
    });
  }

  // goToIncident() {
  //   this.routes.navigateByUrl(ROUTES.VIEWSTEPS)
  // }
}
