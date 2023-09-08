import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incidents, drillIncidents } from '../interfaces/incidents';
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {

  private apiUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  public getIncidentsList() : Observable<Incidents[]>
  {
    const incidentUrl = `${this.apiUrl}/getIncidents`;
    return this.http.get<Incidents[]>(incidentUrl);
  }

  public getIncident(incidentId: any) : Observable<drillIncidents>{
    return this.http.put<drillIncidents>(environment.baseUrl+'/getIncident'+ '/'+ incidentId, '')
  }
} 
