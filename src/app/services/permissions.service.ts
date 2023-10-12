import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor() { }
  private permissionsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private userTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  permissions$: Observable<string[]> = this.permissionsSubject.asObservable();
  userToken$:Observable<string> = this.userTokenSubject.asObservable();

  setPermissions(permissions: string[]): void {
    this.permissionsSubject.next(permissions);
  }

  setUserToken(token: string): void {
    this.userTokenSubject.next(token)
  }

  getPermissions(): string[] {
    return this.permissionsSubject.value;
  }

  getUserToken(): string {
    return this.userTokenSubject.value;
  }
}
