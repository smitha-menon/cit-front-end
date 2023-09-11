import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/constant';
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
  constructor(private routes: Router, private fb: FormBuilder, private apiservice :ApiservicesService) {} 
  
    
  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
  this.loginForm = this.fb.group(({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required]
  }))
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
      this.routes.navigateByUrl(ROUTES.INCIDENT)
    },
    error: (err: any) => {
      console.log(err)
      this.routes.navigateByUrl(ROUTES.LOGIN)
    }
  });

    
    
  }
}
