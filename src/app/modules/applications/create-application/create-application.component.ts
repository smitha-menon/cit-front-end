import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/constant';
import { NotifierService } from 'src/app/core/utils/notifier';
import { ApiservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss']
})
export class CreateApplicationComponent implements OnInit {
  addApplnForm: FormGroup | any;
  dataSource:any;
  displayedColumns=['Application Id', 'Application Name', 'Delete'];

  constructor(private apiService: ApiservicesService, private fb: FormBuilder, private notifier: NotifierService, private router: Router) { }

  ngOnInit(): void {
    this.addApplnForm = this.fb.group({
      applnname: [''],
      isactive: ['true']
    })

    this.loadApplicationList();
  }
  addAppln() {
    const data = {
      "applicationName": this.addApplnForm.value.applnname
      // "isActive": true
    }
    console.log(data)
    this.apiService.addApplication(data).subscribe({
      next: (res: any) => {
        console.log(res)

      },
      error: (err: any) => {
        console.log(err)
        if (err.status === 200) {
          this.notifier.success(
            'Application created successfully',
            'success'
          )
          this.addApplnForm.reset();
            this.router.navigateByUrl(ROUTES.APPLICATION)
        }

      }
    })
  }

  loadApplicationList(){

    this.apiService.getApplications().subscribe({
      next:(response:any)=>{
        this.dataSource= new MatTableDataSource(response);
      },
      error: (err: any) => {
        console.log(err)}
    });
  }

  
  deleteAppln(data: any) {
    console.log(data);
    this.apiService.deleteAppln(data.applicationId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.notifier.success(
          'success',
          'Application deleted successfully'
        );
        this.loadApplicationList();
      },
      error: (err: any) => {
        console.log(err)
        if (err.status === 200) {
          this.notifier.success(
            'success',
            'Application deleted successfully'
          );
          this.loadApplicationList();
        }
        else {
          this.notifier.error(
            'Failed',
            'Application deletion usuccessfull'
          )
        }
      }
    });

  }

}
