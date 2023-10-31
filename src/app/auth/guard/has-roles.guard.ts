import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NotifierService } from 'src/app/core/utils/notifier';
import { PermissionsService } from 'src/app/services/permissions.service';

@Injectable({
  providedIn: 'root'
})
export class HasRolesGuard implements CanActivate {

  userRole!:string

  constructor(private permissionService:PermissionsService,private notifier: NotifierService){

    this.permissionService.loginreponse$.subscribe((data)=>{
      this.userRole= data.roleCode
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!route.data['role'].includes(this.userRole))
    {
      this.notifier.error("Warning","Not Authorized to use!!")    
    }
      return route.data['role'].includes(this.userRole);
    
  }
  
}
