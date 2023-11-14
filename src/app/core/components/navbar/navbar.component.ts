import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../../constants/constant';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionsService } from 'src/app/services/permissions.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  tab: any
  loginUser!:string;
  constructor(private router: Router, private _authService :AuthService,private route: Router,private permissionService :PermissionsService) {
    this.tab = this.route.url.replace('/','');
    console.log(this.tab)
   }

  ngOnInit(): void {
    this.permissionService.loginreponse$.subscribe((data)=>{
      this.loginUser= data.loginUser
    });
  }

  goToIncident() {
    this.router.navigateByUrl(ROUTES.INCIDENT)
  }

  logOut() {
    this._authService.logout();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
  toggleSideBar() {
    console.log('work')
  }
  
  addIncident() {
    console.log(this.tab)
    this.router.navigateByUrl(ROUTES.CREATEINCIDENT)
  }
  users() {
    this.router.navigateByUrl(ROUTES.USERS)
  }
  groups() {
    this.router.navigateByUrl(ROUTES.GROUP)
  }
  dropDown() {
    const app = document.getElementById("mobile-menu-items");

    app?.classList.toggle("view-mobile-menu");
  }

  // backButton() {
  //   const app = document.getElementById("sidenavbar");

  //     app?.classList.toggle("navback");
  // }
}
