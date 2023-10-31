import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError, BehaviorSubject } from 'rxjs';
import { Incidents, drillIncidents } from '../interfaces/incidents';
import { environment } from 'src/environment/environment';
import { user } from '../interfaces/user';
import { recommendations } from '../interfaces/knownErrors';
import { USER_TOKEN } from '../core/constants/local-storage-keys';

@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {

  newtag: any;
  // token = localStorage.getItem(USER_TOKEN)
  private apiUrl = environment.baseUrl;
  // Setting request headers to JSON
  headers = new HttpHeaders()
    // .set('Content-Type', 'application/json')
    // .set('Access-Control-Allow-Origin','*')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem(USER_TOKEN)}`,);

  httpOptions = {
    headers: this.headers
  };
  constructor(private http: HttpClient) { }

  public getUsersListToAssign(): Observable<any> {
    const Url = `${this.apiUrl}/auth/getActiveUsers`;
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.get<any>(Url, options);
  }

  public getPriorityList(): Observable<any> {
    const Url = `${this.apiUrl}/getPriorityList`;
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.get<any>(Url, options);
  }

  public getStatusList(): Observable<any> {
    const Url = `${this.apiUrl}/getIncidentStatusList`;
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.get<any>(Url, options);
  }

  public getAssignedGrpList(): Observable<any> {
    const Url = `${this.apiUrl}/getActiveAssignedGroups`;
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.get<any>(Url, options);
  }

  public getIncidentsList(start: number, end: number, search: any, assignedId:any, groupId:any): Observable<Incidents[]> {
    let incidentUrl = `${this.apiUrl}/getIncidentsByUser?beginIndex=` + `${start}&endIndex=` + `${end}`;
    if (search != undefined) {
      incidentUrl = incidentUrl + '&filter=' + `${search}`;
    }
    if(assignedId !=undefined)
    {
      incidentUrl = incidentUrl + '&assignedId=' + `${assignedId}`;
    }
    if(groupId != undefined)
    {
      incidentUrl = incidentUrl + '&groupId=' + `${groupId}`;
    }

    // const incidentUrl = `${this.apiUrl}/getIncidents`;
    const token =  localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    
    return this.http.get<Incidents[]>(incidentUrl, options);
  }

  public getIncident(incidentId: any): Observable<drillIncidents> {
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.put<drillIncidents>(environment.baseUrl + '/getIncident' + '/' + incidentId, '', options)
  }

  public authenticateUser(loginuser: user): Observable<any> {
    const loginUrl = `${this.apiUrl}/auth/login`;
    // return this.http.post<any>(loginUrl,loginuser);
    return this.http.post<any>(loginUrl, loginuser)
      .pipe(
        tap(data => {
          // debug error here\        
          console.log(data);
        }),
        catchError(this.handleError)
      );

  }

  public getKnownErrorById(errorId: any): Observable<recommendations> {
    const url = `${this.apiUrl}/getKnownError/` + `${errorId}`;
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.get<recommendations>(url, options);
  }

  public submitKedbResolution(incid: any, errorid: any): Observable<any> {
    const url = this.apiUrl + '/addSuggestedSteps/' + incid + '/' + errorid;
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.put<any>(url, null, options)
      .pipe(
        tap(data => {
          console.log(data);
        }),
        catchError(this.handleError)
      );
  }


  public modifyTags(taglist: any, incid: any): Observable<any> {
    const url = this.apiUrl + '/modifyTags/' + incid;
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    // debugger
    return this.http.put<any>(url, taglist, options)
      .pipe(
        tap(data => {
          console.log(data);
        }),
        catchError(this.handleError)
      );
  }

  public UpdateIncident(incid: any, stateParam: string, userParam: string, groupParam: string, commentParam: string): Observable<any> {
    const url = this.apiUrl + '/updateIncident/' + incid;
    // debugger
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.put<any>(url,
      {
        "state": Number(stateParam),
        "assignedTo": Number(userParam),
        "assignedGroup": Number(groupParam), "comments": commentParam
      }, options)
      .pipe(
        tap(data => {
          console.log(data);
        }),
        catchError(this.handleError)
      );
  }

  public getResolutions(matchtags: any): Observable<any> {
    const url = `${this.apiUrl}/getResolutions`;
    // debugger
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    this.newtag = matchtags.split(',');
    return this.http.put<any>(url, this.newtag, options)
      .pipe(
        tap(data => {
          console.log(data);
        }),
        catchError(this.handleError)
      );
  }

  public addResolutions(resol: any, incidentId: any): Observable<any> {
    // debugger
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.post<any>(this.apiUrl + '/addResolution/' + incidentId, resol, options)
      .pipe(
        tap(data => {
          console.log(data);
        }),
        catchError(this.handleError)
      );
  }
  
  public addIncident(data: any): Observable<any> {
    // debugger
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.post<any>(this.apiUrl + '/addIncident',  data, options)
      .pipe(
        tap(data => {
          console.log(data);
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    return throwError(() => error);
  }
}

