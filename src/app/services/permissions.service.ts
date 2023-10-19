import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { loginResponse } from '../interfaces/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor() { }
  private loginresponse !:loginResponse
  //private permissionsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  //private userTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private loginSubject: BehaviorSubject<loginResponse> = new BehaviorSubject<loginResponse>(this.loginresponse);
  //permissions$: Observable<string[]> = this.permissionsSubject.asObservable();
  //userToken$:Observable<string> = this.userTokenSubject.asObservable();
  loginreponse$:Observable<loginResponse> = this.loginSubject.asObservable();

  setLoginResponse(response: loginResponse): void {
    this.loginSubject.next(response);
   // this.setPermissions(this.loginSubject.value.deniedAccessMethodNames);
  }

  getLoginResponse(): loginResponse {
    return this.loginSubject.value;
  } 

  
}
