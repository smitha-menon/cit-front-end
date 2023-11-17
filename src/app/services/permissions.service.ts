import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { loginResponse } from '../interfaces/loginResponse';
import { LOGINUSER_DATA } from '../core/constants/local-storage-keys';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private loginresponse !:loginResponse
  //private permissionsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  //private userTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private loginSubject: BehaviorSubject<loginResponse> = new BehaviorSubject<loginResponse>(this.loginresponse);
  //permissions$: Observable<string[]> = this.permissionsSubject.asObservable();
  //userToken$:Observable<string> = this.userTokenSubject.asObservable();
  loginreponse$:Observable<loginResponse> = this.loginSubject.asObservable();

  constructor() { 
    const storedUser = localStorage.getItem(LOGINUSER_DATA);
    if (storedUser) {
      this.loginSubject.next(JSON.parse(storedUser));
    }
  }
  

  setLoginResponse(response: loginResponse): void {
    this.loginSubject.next(response);
    localStorage.setItem(LOGINUSER_DATA, JSON.stringify(response));   
  }

  getLoginResponse(): loginResponse {
    return this.loginSubject.value;
  } 

  
}
