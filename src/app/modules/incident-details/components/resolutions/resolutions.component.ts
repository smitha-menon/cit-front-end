import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FEATURES } from 'src/app/core/constants/constant';
import { INCIDENT_ID_KEY, TAGS } from 'src/app/core/constants/local-storage-keys';
import { NotifierService } from 'src/app/core/utils/notifier';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { PermissionsService } from 'src/app/services/permissions.service';

@Component({
  selector: 'app-resolutions',
  templateUrl: './resolutions.component.html',
  styleUrls: ['./resolutions.component.scss']
})
export class ResolutionsComponent {
  receivedData: any;

  viewPopup: boolean = false;
  createPopup: boolean = false;
  viewDetails: any = [];
  isAddvisible:boolean= true;
  isUseVisible:boolean =true;
  userPermissions: any;
  
  constructor(private route: ActivatedRoute,
             private apiservice:ApiservicesService, 
             private notifier: NotifierService,
             private permissionsService: PermissionsService,
             private fb: FormBuilder) {}
  incid:any;
  taglist:string | any;
  resolutiondata: string[] | any;
  errId:any;
  dataByErrorId:any;


  ngOnInit() {
    this.taglist=localStorage.getItem(TAGS);    
    this.incid=localStorage.getItem(INCIDENT_ID_KEY);   
    this.loadResolutions();
    this.permissionsService.loginreponse$.subscribe((data) => {
      this.userPermissions = data.deniedAccessMethodNames;
    });
    this.isAddvisible=this.userPermissions.includes(FEATURES.addResolution)? false:true;
    this.isUseVisible = this.userPermissions.includes(FEATURES.addSuggestedSteps)? false:true;
   
  }
  public loadResolutions() : void 
  {  
     //this.apiservice.getKnownErrors().subscribe({
    this.apiservice.getResolutions(this.taglist).subscribe({
      next : (response: any) => {
        console.log(response);
        this.resolutiondata = response;
        console.log(this.resolutiondata)
      },
      error: (err: any) => console.log(err)
    });
  }


public addResolutions():void{

  console.log(this.receivedData);
  
  this.apiservice.addResolutions(this.receivedData.split('.'),this.incid).subscribe({
    next :(response:any)=>{
      console.log(response)
      this.receivedData = ''
      this.notifier.success(
        'Resolution saved',
        'success'
      )
    },
    error: (err: any) => {
      console.log(err)
      if (err.status === 201)
      {
        this.receivedData = ''
        this.loadResolutions();
        this.createPopup = false;
        this.notifier.success(
          'Resolution saved',
          'success'
        )
      }
  
    }
  });
}

viewData(data: any , index: number) {
  this.viewPopup = true;
  console.log(data, index)
  this.viewDetails.push(data)
  this.errId = data.errorId
 
}
  cancelPopUp() {
    this.viewPopup = false;
    this.createPopup = false;
    this.viewDetails = [];
  }
  createReso() {
    this.createPopup = true;
  }
  
  loadPopupData()
  {
    this.apiservice.getKnownErrorById(this.errId).subscribe({
      next :(response:any)=>{
        console.log(response)
       this.dataByErrorId = response;
        
      },
      error: (err: any) => {
        console.log(err)
        if (err.status === 201)
        {        
          this.dataByErrorId = err;
         
        }
    
      }
    });

  }

  UseResolution()
  {
    this.apiservice.submitKedbResolution(this.incid,this.errId).subscribe({
      next :(response:any)=>{
        console.log(response)
       
        this.notifier.success(
          'Resolution Used',
          'success'
        )
      },
      error: (err: any) => {
        console.log(err)
        if (err.status === 200)
        {        
          
          this.notifier.success(
            'Resolution Used',
            'success'
          )
        }
        else{

          this.notifier.error(
            'Failed',
            'Resolution not saved for the incident')
        }
    
      }
    });
  }
}