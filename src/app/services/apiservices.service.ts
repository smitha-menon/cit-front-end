import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError, BehaviorSubject } from 'rxjs';
import { Incidents, drillIncidents } from '../interfaces/incidents';
import { environment } from 'src/environment/environment';
import { user } from '../interfaces/user';
import { recommendations } from '../interfaces/knownErrors';

@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {
  
  newtag:any;
  private apiUrl = environment.baseUrl;
  // Setting request headers to JSON
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    // .set('Access-Control-Allow-Origin','*')
    .set('Accept', 'application/json');

  httpOptions = {
    headers: this.headers
  };
  constructor(private http: HttpClient) { }

 public getUsersListToAssign():Observable<any>{
  const Url = `${this.apiUrl}/getAssignedUsers`;
  return this.http.get<any>(Url);
 }
 public getStatusList():Observable<any>{
  const Url = `${this.apiUrl}/getIncidentStatuses`;
  return this.http.get<any>(Url);
 }

 public getAssignedGrpList():Observable<any>{
  const Url = `${this.apiUrl}/getAssignedGroups`;
  return this.http.get<any>(Url);
 }

  public getIncidentsList(): Observable<Incidents[]> {
    const incidentUrl = `${this.apiUrl}/getIncidents`;
    return this.http.get<Incidents[]>(incidentUrl);
  }

  public getIncident(incidentId: any): Observable<drillIncidents> {
    return this.http.put<drillIncidents>(environment.baseUrl + '/getIncident' + '/' + incidentId, '')
  }

  public authenticateUser(loginuser: user): Observable<any> {
    const loginUrl = `${this.apiUrl}/loginUser`;
    // return this.http.post<any>(loginUrl,loginuser);
    return this.http.post<any>(loginUrl, loginuser, this.httpOptions)
      .pipe(
        tap(data => {
          // debug error here
          console.log(data);
        }),
        catchError(this.handleError)
      );

  }

  public getKnownErrorById(errorId:any): Observable<recommendations> {
    const url = `${this.apiUrl}/getKnownError/`+`${errorId}`;
    return this.http.get<recommendations>(url);
  }

  public submitKedbResolution(incid:any,errorid:any):Observable<any>
  {
    const url = this.apiUrl+'/addSuggestedSteps/'+incid+'/'+errorid;
    return this.http.put<any>(url,null,this.httpOptions)
    .pipe(
      tap(data => {          
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }

  public modifyTags(taglist:any,incid:any): Observable<any>{
    const url = this.apiUrl+'/modifyTags/'+incid;
    // debugger
    return this.http.put<any>(url,taglist,this.httpOptions)
    .pipe(
      tap(data => {          
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }

  public UpdateIncident(incid:any,stateParam:string,userParam:string,groupParam:string): Observable<any>{
    const url = this.apiUrl+'/updateIncident/'+incid;
    // debugger
    return this.http.put<any>(url, { "state":stateParam, "assignedTo": userParam, "assignedGroup":groupParam },this.httpOptions)
    .pipe(
      tap(data => {          
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }

  public getResolutions(matchtags:any): Observable<any> {
    const url = `${this.apiUrl}/getResolutions`;
    
    this.newtag = matchtags.split(',');
    return this.http.put<any>(url,this.newtag)
    .pipe(
      tap(data => {          
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }

  public addResolutions(resol: any, incidentId: any): Observable<any> {
    // debugger
    return this.http.post<any>(environment.baseUrl + '/addResolution/' + incidentId, resol, this.httpOptions)
      .pipe(
        tap(data => {          
          console.log(data);
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    return throwError(() =>error);
  }
}

