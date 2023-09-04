import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup | any;

  constructor(private routes: Router, private fb: FormBuilder) {} 
  
    
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

    const obj = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    console.log(obj)
    this.routes.navigateByUrl(ROUTES.INCIDENT)
  }
}
