import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Incidents } from '../interfaces/incidents';
import { environment } from 'src/environment/environment';
import { user } from '../interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {

  private apiUrl = environment.baseUrl;
  // Setting request headers to JSON
  headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
 
  httpOptions = {
    headers: this.headers
  };
  constructor(private http: HttpClient) { }

  public getIncidentsList() : Observable<Incidents[]>
  {
    const incidentUrl = `${this.apiUrl}/getIncidents`;
    return this.http.get<Incidents[]>(incidentUrl);
  }

  public authenticateUser(loginuser : user) : Observable<any>
  {
    const loginUrl = `${this.apiUrl}/loginUser`;
    // return this.http.post<any>(loginUrl,loginuser);
    return this.http.post<any>(loginUrl,loginuser,this.httpOptions)
    .pipe(
      tap(data => {
        // debug error here
        console.log(data);
      }),
      catchError(this.handleError)
    );

    
  }

  private handleError(error: any) {
    return throwError(error);
  }
}
