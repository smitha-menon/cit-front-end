import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/core/utils/notifier';
import { ApiservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.scss']
})
export class AddIncidentComponent implements OnInit{
  assignUsrList:any =[];
  assignGrpList: any =[];
  stateList:any =[];
  selectedState: string | any;
  selectedUser: string | any;
  selectedGroup: string | any;
  defaultSelection: string ="--Select--";
  constructor(private routes: Router, private fb: FormBuilder, private apiservice: ApiservicesService,private notifier: NotifierService) { }
  
  ngOnInit(): void {
    this.loadGroups();
    this.loadStates();
    this.loadUsers();
  }

  loadStates(){
    this.apiservice.getStatusList().subscribe({
      next :(data:any)=>{
        console.log(data)
        this.stateList = data 
      
        //this.stateList =  this.stateList.split(',')       
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
       // this.assignGrpList = this.assignGrpList.split(',')  
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
        //this.assignUsrList =  this.assignUsrList.split(',')  
      },
      error: (err: any) => {
        console.log(err)        
      }
    });
  }
}
