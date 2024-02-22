import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FEATURES, ROUTES } from 'src/app/core/constants/constant';
import { INCIDENT_ID_KEY } from 'src/app/core/constants/local-storage-keys';
import { NotifierService } from 'src/app/core/utils/notifier';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { PermissionsService } from 'src/app/services/permissions.service';

@Component({
  selector: 'app-view-resolutions',
  templateUrl: './view-resolutions.component.html',
  styleUrls: ['./view-resolutions.component.scss']
})
export class ViewResolutionsComponent implements OnInit {

  viewPopup:boolean=false;
  viewDetails:any;
  dataByErrorId: any;
  errId: any;
  incid: any;
  isUseVisible:boolean =true;
  userPermissions: any;
  
  /**
   *
   */
  constructor(private route: ActivatedRoute,
    private apiservice:ApiservicesService, 
    private notifier: NotifierService,
    private permissionsService: PermissionsService,
    private router:Router,
    private fb: FormBuilder) {
    
      this.route.queryParams.subscribe((params) => {

        if (params['Id']!==undefined)
        {
          console.log('Id',params['Id']);
          this.errId=params['Id'];
          
        }
       
  });
    
  }

  ngOnInit(): void {
    this.loadData();
    this.incid=localStorage.getItem(INCIDENT_ID_KEY);  
    this.permissionsService.loginreponse$.subscribe((data) => {
      this.userPermissions =(data.currentGroupData.customizedPrivileges==undefined)? data.currentGroupData.deniedAccessMethodNames:
                                                                                    data.currentGroupData.customizedPrivileges ;
    });
    
    this.isUseVisible = this.userPermissions.includes(FEATURES.addSuggestedSteps)? false:true;
  }

viewData(data: any , index: number) {
 
  this.router.navigateByUrl(ROUTES.RCADETAILS+"?Id="+data);
 
}

loadData()
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
