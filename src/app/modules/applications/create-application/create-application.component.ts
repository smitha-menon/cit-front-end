import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  constructor(private apiservice: ApiservicesService, private fb: FormBuilder, private notifier: NotifierService, private router: Router) { }

  ngOnInit(): void {
    this.addApplnForm = this.fb.group({
      applnname: [''],
      isactive: ['true']
    })
  }
  addGroup() {
    const data = {
      "applicationName": this.addApplnForm.value.applnname,
      "isActive": true
    }
    console.log(data)
    this.apiservice.addGroup(data).subscribe({
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
}
