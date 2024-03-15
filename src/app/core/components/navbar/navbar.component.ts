import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES, userRoles } from '../../constants/constant';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionsService } from 'src/app/services/permissions.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  tab: any
  loginUser!: string;
  rolesU= userRoles;
  logedUserRole!:string;
  constructor(private router: Router, private _authService: AuthService,  private permissionService: PermissionsService) {
    this.tab = this.router.url.replace('/', '');
    console.log(this.tab)
  }

  ngOnInit(): void {
    this.permissionService.loginreponse$.subscribe((data) => {
      this.loginUser = data.loginUser;
      this.logedUserRole=data.currentGroupData?.roleCode??data.roles[0].roleCode;      
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
  approvals() {
    this.router.navigateByUrl(ROUTES.APPROVALS)
  }
  applications(){
    this.router.navigateByUrl(ROUTES.APPLICATION)
  }
  dashboard(data:any) {
    //this.router.navigateByUrl(ROUTES.DASHBOARD)
    this.router.navigate([ROUTES.DASHBOARD],{queryParams:{option:data}});
  }
  dropDown() {
    const app = document.getElementById("mobile-menu-items1");

    app?.classList.toggle("view-mobile-menu1");
  }
  dropDowns() {
    const app = document.getElementById("mobile-menu-item");

    app?.classList.toggle("view-mobile-menu");
  }

  reports() {
    this.router.navigateByUrl(ROUTES.REPORT)
  }

  isUserInRole(requiredRoles: string[]): boolean {
   
    return requiredRoles.includes(this.logedUserRole);
  }




  // backButton() {
  //   const app = document.getElementById("sidenavbar");

  //     app?.classList.toggle("navback");
  // }
}
