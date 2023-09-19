import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../../constants/constant';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  goToIncident() {
    this.router.navigateByUrl(ROUTES.INCIDENT)
  }

  logOut() {
   this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
  toggleSideBar() {
    console.log('work')
  }
}
