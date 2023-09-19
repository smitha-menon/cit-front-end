import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { INCIDENT_ID_KEY, TAGS } from 'src/app/core/constants/local-storage-keys';
import { NotifierService } from 'src/app/core/utils/notifier';
import { ApiservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-resolutions',
  templateUrl: './resolutions.component.html',
  styleUrls: ['./resolutions.component.scss']
})
export class ResolutionsComponent {
  receivedData: any;
  public viewResolutionForm: FormGroup | any;
  viewPopup: boolean = false;
  
  constructor(private route: ActivatedRoute, private apiservice:ApiservicesService, private notifier: NotifierService, private fb: FormBuilder) {}
  incid:any;
  taglist:string | any;
  resolutiondata: string[] | any;



  ngOnInit() {
    this.taglist=localStorage.getItem(TAGS);    
    this.incid=localStorage.getItem(INCIDENT_ID_KEY);   
    this.loadResolutions();

    this.viewResolutionForm = this.fb.group(({
      createdon: ['', [Validators.required]],
      updatedon: ['', [Validators.required]],
      createdby: ['', [Validators.required]],
      incidentid: [''],
      errorkeyword: [''],
      errorid: ['']
    }))
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
  console.log(this.resolutiondata, index)
  this.viewResolutionForm = this.fb.group(({
    createdon: [data.createdon, [Validators.required]],
    // scriptlocation: [res.scriptLocation, [Validators.required]],
    // scriptfilename: [res.scriptFileName, [Validators.required]],
    // executioncmd: [res.executionCommand],
    // testplanid: [res.testPlanId],
    // status: [res.testPlanStatus]
  }))
}
  cancelPopUp() {
    this.viewPopup = false;
  }
}
