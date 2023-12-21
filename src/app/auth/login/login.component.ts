import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/constant';
import { USER_NAME } from 'src/app/core/constants/local-storage-keys';
import { NotifierService } from 'src/app/core/utils/notifier';
import { user } from 'src/app/interfaces/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup | any;
  public loginuser: user | any;
  loginstatus:any ;
  constructor(private routes: Router, private fb: FormBuilder, private authservice :AuthService, private notifierService:NotifierService) {
    authservice.logout();
  } 
  
    
  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
  this.loginForm = this.fb.group(({
    email: ['', Validators.required],
    password: ['', Validators.required]
  }))
  localStorage.removeItem(USER_NAME);    
  localStorage.clear();    
  }


 login() {

    if (this.loginForm.invalid) {
      return;
  }
  
this.loginuser={
   username:this.loginForm.value.email,
   password: this.loginForm.value.password
  }
   
  
 this.authservice.loginCheck1(this.loginuser).subscribe({
  next : (result: any) => {
    console.log('success'+ result)
    if(result)
    {
    //this.loginstatus = true;
    this.routes.navigateByUrl(ROUTES.INCIDENT)
   // this.notifierService.success("Login Success","User Logged in Successfully");
    }
    else{
      //this.loginstatus = false;
      this.routes.navigateByUrl(ROUTES.LOGIN)
    this.notifierService.error("Login Failed","Please try again with valid credentials")
    }
  },
  error: (err: any) => {
    console.log('errorlogin'+err.status)   
   
      //this.loginstatus = false;
      this.routes.navigateByUrl(ROUTES.LOGIN)
    this.notifierService.error("Login Failed","Please try again with valid credentials")
      }
});
   console.log('logstat:'+this.loginstatus)
  // 
     
   

    
    
  }
}
