import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incidents } from '../interfaces/incidents';
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {

  private apiUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  public getIncidents() : Observable<Incidents[]>
  {
    const incidentUrl = `${this.apiUrl}/getIncidents`;
    return this.http.get<Incidents[]>(incidentUrl);
  }
}
