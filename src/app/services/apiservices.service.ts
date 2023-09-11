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
    .set('Accept', 'application/json');

  httpOptions = {
    headers: this.headers
  };
  constructor(private http: HttpClient) { }

 

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

  public getKnownErrors(): Observable<recommendations[]> {
    const url = `${this.apiUrl}/getKnownErrors`;
    return this.http.get<recommendations[]>(url);
  }

  public getResolutions(matchtags:any): Observable<any> {
    const url = `${this.apiUrl}/getResolutions`;
    
    this.newtag = matchtags.split(',');
    return this.http.get<any>(url,this.newtag)
    .pipe(
      tap(data => {   
        console.log("new resol")    ;
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }

  public addResolutions(resol: any, incidentId: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + '/addResolution/' + incidentId, resol, this.httpOptions)
      .pipe(
        tap(data => {          
          console.log(data);
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    return throwError(error);
  }
}

