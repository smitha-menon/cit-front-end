import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INCIDENT_ID_KEY, TAGS } from 'src/app/core/constants/local-storage-keys';
import { ApiservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-resolutions',
  templateUrl: './resolutions.component.html',
  styleUrls: ['./resolutions.component.scss']
})
export class ResolutionsComponent {
  receivedData: any;
  
  constructor(private route: ActivatedRoute, private apiservice:ApiservicesService) {}
  incid:any;
  taglist:string | any;
  resolutiondata: string[] | any;
  isSaved:boolean = false;


  ngOnInit() {
    this.taglist=localStorage.getItem(TAGS);    
    this.incid=localStorage.getItem(INCIDENT_ID_KEY);   
    this.isSaved= false; 
    this.loadResolutions();
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
      this.isSaved= true;


    },
    error: (err: any) => {
      console.log(err)
      this.isSaved= false;
    }
  });
}



}
