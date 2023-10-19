import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { USER_NAME, USER_TOKEN } from '../core/constants/local-storage-keys';
import { ROUTES } from '../core/constants/constant';
import { ApiservicesService } from '../services/apiservices.service';
import { user } from '../interfaces/user';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PermissionsService } from '../services/permissions.service';
import { loginResponse } from '../interfaces/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string | any;
  logresponse:loginResponse | any;
  
  constructor(private routes: Router,private apiservice: ApiservicesService,private permissionsService: PermissionsService) { }

  isLoggedIn() {
    const loggedIn = localStorage.getItem(USER_NAME);
    console.log('loggedin:'+loggedIn);
    if(loggedIn ===null)
    {
      this.routes.navigateByUrl(ROUTES.LOGIN);
    }
    
    return  (loggedIn != null);      
    
  }

  logout() {
    localStorage.clear();
    this.token = null;
    // localStorage.removeItem(USER_NAME);
    // this.routes.navigateByUrl(ROUTES.LOGIN);
  }

  public loginCheck(userdata:user):any
  {
    this.apiservice.authenticateUser(userdata).subscribe({
      next : (response: any) => {
      console.log("new:"+response.token); 
      localStorage.setItem(USER_NAME,userdata.username);
      this.routes.navigateByUrl(ROUTES.INCIDENT);
      return true;   
    },
    error: (err: any) => {
      console.log('error1'+err)
      
      if (err.status === 200)
      {
        localStorage.setItem(USER_NAME,userdata.username);
        this.routes.navigateByUrl(ROUTES.INCIDENT);
        alert("login successful")
       return true;
      }
      else {
        alert("login with valid credentials")
        this.routes.navigateByUrl(ROUTES.LOGIN)
       return false;
        
      }
    }
  });
  
  }
    loginCheck1(userdata:user): Observable<boolean>
  {
    
      return this.apiservice.authenticateUser(userdata).pipe(
        map(data =>{       
          console.log("new:"+data.token);
          
          this.logresponse={ token: data.token,  
                             assignedGroupId:data.assignedGroupId,
                             assignedToId:data.assignedToId ,
                             loginUser: userdata.username, 
                             roleName:data.roleName,
                             deniedAccessMethodNames: data.deniedAccessMethodNames};
          
          this.permissionsService.setLoginResponse(this.logresponse);
          console.log("login2"+this.logresponse);

          this.setToken(data.token);
          localStorage.setItem(USER_NAME,userdata.username); 
          //this.permissionsService.setPermissions(data.deniedAccessMethodNames);
           
           
            return true;
         
        }),
        catchError((error: HttpErrorResponse)=> {
          if (error.status === 200) {
            console.log(error.error.text)
            this.setToken(error.error.text)
            localStorage.setItem(USER_NAME,userdata.username);
            return of(true);
          }
          //console.error('An error occurred:', error);
          return of(false); // Return false in case of an error
        })

      );    
    
  }

  setToken(response: any) {
    this.token = response
    localStorage.setItem(USER_TOKEN, response);
  }

  getToken(): string | null {
    return localStorage.getItem(USER_TOKEN);
  }
}
