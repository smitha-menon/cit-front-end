import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { USER_NAME } from '../core/constants/local-storage-keys';
import { ROUTES } from '../core/constants/constant';
import { ApiservicesService } from '../services/apiservices.service';
import { user } from '../interfaces/user';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private routes: Router,private apiservice: ApiservicesService) { }

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
    localStorage.removeItem(USER_NAME);
    this.routes.navigateByUrl(ROUTES.LOGIN);
  }

  public loginCheck(userdata:user):any
  {
    this.apiservice.authenticateUser(userdata).subscribe({
      next : (response: any) => {
      console.log(response); 
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

          
            localStorage.setItem(USER_NAME,userdata.username);
            //this.routes.navigateByUrl(ROUTES.INCIDENT);
            return true;
         
        }),
        catchError((error: HttpErrorResponse)=> {
          if (error.status === 200) {
            localStorage.setItem(USER_NAME,userdata.username);
            return of(true);
          }
          //console.error('An error occurred:', error);
          return of(false); // Return false in case of an error
        })

      );    
    
  }
}
