import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/constant';
import { USER_NAME } from 'src/app/core/constants/local-storage-keys';
import { NotifierService } from 'src/app/core/utils/notifier';
import { user } from 'src/app/interfaces/user';
import { ApiservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup | any;
  public loginuser: user | any;
  constructor(private routes: Router, private fb: FormBuilder, private apiservice :ApiservicesService, private notifierService:NotifierService) {} 
  
    
  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
  this.loginForm = this.fb.group(({
    email: ['', Validators.required],
    password: ['', Validators.required]
  }))
  sessionStorage.removeItem(USER_NAME);    
  sessionStorage.clear();    
  }


  login() {

    if (this.loginForm.invalid) {
      return;
  }
  
this.loginuser={
   username:this.loginForm.value.email,
   password: this.loginForm.value.password
  }
    
     this.apiservice.authenticateUser(this.loginuser).subscribe({
      next : (response: any) => {
      console.log(response); 
      sessionStorage.setItem(USER_NAME,this.loginuser.username);
      this.routes.navigateByUrl(ROUTES.INCIDENT)
      this.notifierService.success("Login Success","User Logged in Successfully")
    
    },
    error: (err: any) => {
      console.log(err)
      if (err.status === 200)
      {
        sessionStorage.setItem(USER_NAME,this.loginuser.username);
        this.routes.navigateByUrl(ROUTES.INCIDENT)
        this.notifierService.success("Login Success","User Logged in Successfully")
      }
      else {
        this.routes.navigateByUrl(ROUTES.LOGIN)
      this.notifierService.error("Login Failed","Please try again with valid credentials")
        
      }
    }
  });

    
    
  }
}
