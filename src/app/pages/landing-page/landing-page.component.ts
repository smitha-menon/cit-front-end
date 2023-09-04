import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/constant';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit{

  constructor(private router: Router) {}
  ngOnInit(): void {

  }

  login() {
    this.router.navigateByUrl(ROUTES.LOGIN)
  }
}
