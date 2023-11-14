import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/constant';
//import * as AOS from 'aos';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit{

  constructor(private router: Router) {}
  ngOnInit(): void {
    // AOS.init({
    //   once: true,
    //   // anchorPlacement: 'bottom',
    //   // offset: 0
    // });

  }

  login() {
    this.router.navigateByUrl(ROUTES.LOGIN)
  }
}
