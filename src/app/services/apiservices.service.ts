import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError, BehaviorSubject } from 'rxjs';
import { Incidents, dashboardFilters, drillIncidents, reportFilters } from '../interfaces/incidents';
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

  public getUserById(userId:any): Observable<any> {
    const url = `${this.apiUrl}/auth/getUserById/`+ `${userId}`;
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.get<any>(url,options)
  }

  public getActiveRole(): Observable<any> {
    const url = `${this.apiUrl}/getActiveRoles`;
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.get<any>(url, options)
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

  public addUser(data: any): Observable<any> {
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.post<any>(this.apiUrl + '/auth/addUser' ,data ,options)
  }

  public modifyUser(data: any,id:any): Observable<any> {
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.put<any>(this.apiUrl + '/auth/modifyUser/' + id,data ,options)
  }
  public addRole(data: any): Observable<any> {
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.post<any>(this.apiUrl + '/addRole' ,data ,options)
  }

  public addGroup(data: any): Observable<any> {
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.post<any>(this.apiUrl + '/addAssignedGroup', data, options)
  }

  public addApplication(data: any): Observable<any> {
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.post<any>(this.apiUrl + '/addApplication', data, options)
  }

  public approveIncident(incidentId :any, status:any): Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    header.set('Content-Type', 'application/json');
    const options = {
      headers: header,
    };
    const url = `${this.apiUrl}/statusUpdateByGroupAdmin/`+`${incidentId}/`+`${status}`;
    return this.http.put(url,null,options).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }
  public getApplications(): Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    const options = {
      headers: header,
    };
    const url = `${this.apiUrl}/getAllApplications`;
    return this.http.get(url,options).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }

  public getIncidentApprovals(groupId:any): Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    const options = {
      headers: header,
    };
    const url = `${this.apiUrl}/getIncidentsForApprovalByGroupAdmin/`+`${groupId}`;
    return this.http.get(url,options).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }

  public deleteRole(roleId:any):Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    const options = {
      headers: header,
    };
    const url = `${this.apiUrl}/deleteRole/`+`${roleId}`;
    return this.http.delete(url,options).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }

  public modifyRole(data:any): Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.put<any>(this.apiUrl + '/modifyRole/'+data.roleId ,data ,options)
  }
  public modifyGroup(data:any): Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    console.log(data);
    return this.http.put<any>(this.apiUrl + '/modifyAssignedGroup/'+data.groupId ,data ,options)
  }
  
  public deleteGroup(grpId:any):Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    const options = {
      headers: header,
    };
    const url = `${this.apiUrl}/deleteAssignedGroup/`+`${grpId}`;
    return this.http.delete(url,options).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }
  public getGroupDetails(Id:any):Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    const options = {
      headers: header,      
    };
    const url = `${this.apiUrl}/getAssignedGroupById/`+`${Id}`;
    return this.http.get(url,options).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }

  public getUsersByGroup(Id:any):Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    //header.set('Access-Control-Allow-Origin','*');
    const options = {
      headers: header,      
    };
    const url = `${this.apiUrl}/auth/getUsersByAssignedGroupId/`+`${Id}`;
    return this.http.get(url,options).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }
  public getReport(filters:reportFilters):Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    const options = {
      headers: header,      
    };
    const url = `${this.apiUrl}/getIncidentsForReportPageByFilters`;
    return this.http.post(url,filters,options).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }

  public getPrivileges():Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    const options = {
      headers: header,      
    };
    const url = `${this.apiUrl}/getAllUserPrivileges`;
    return this.http.get(url,options).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }
  public uploadPhoto(photo:any,usrId:any):Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    const options = {
      headers: header,      
    };
    const url = `${this.apiUrl}/auth/uploadProfilePicture/`+`${usrId}`;
    return this.http.post(url,photo,options).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }

  public deletePhoto(Id:any):Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    const options = {
      headers: header,
    };
    const url = `${this.apiUrl}/auth/deleteProfilePicture/`+`${Id}`;
    return this.http.delete(url,options).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }

  public deleteAppln(Id:any):Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    const options = {
      headers: header,
    };
    const url = `${this.apiUrl}/deleteApplication/`+`${Id}`;
    return this.http.delete(url,options).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }
  public getRCATypeList():Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    const options = {
      headers: header,      
    };
    const url = `${this.apiUrl}/getAllRcaTypes`;
    return this.http.get(url,options).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }

  public addRCA(data:any):Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    const options = {
      headers: header,      
    };
    const url = `${this.apiUrl}/addRcaByIncidentId`;
    return this.http.post(url,data,options).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }
  public getRCAData(id:any):Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    const options = {
      headers: header,      
    };
    const url = `${this.apiUrl}/getRcaByIncidentId/`+`${id}`;
    return this.http.get(url,options).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }


  //************Dashboard apis******************

  public getDashboardData(id:any):Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    const options = {
      headers: header,      
    };
    const url = `${this.apiUrl}/getDashBoardTabs/`+`${id}`;
    return this.http.get(url,options).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }

  public getIncidentByApplnData(id:any, filters:dashboardFilters):Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const body ={
      "startDate": "01/01/2020 00:00:00",
      "endDate": "01/01/2022 00:00:00"
    }
    const options = {
      headers: header 
      //params: inputparams      
    };
    const url = `${this.apiUrl}/getApplicationIncident/`+`${id}`;
    return this.http.post(url,filters,options).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }

  public getIncidentByUserData(id:any,filters:dashboardFilters):Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    // let inputparams = new HttpParams();
    // inputparams = inputparams.append('startDate', "01/01/2020 00:00:00");
    // inputparams = inputparams.append('endDate', "01/01/2024 00:00:00");
    const body ={
      "startDate": "01/01/2020 00:00:00",
      "endDate": "01/01/2022 00:00:00"
    }
    const options = {
      headers: header  
      //params: inputparams     
    };
    const url = `${this.apiUrl}/getUserIncidents/`+`${id}`;
    return this.http.post(url, filters,options).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }

  public getIncidentByPriority(id:any,filters:dashboardFilters):Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    const body ={
      "startDate": "01/01/2020 00:00:00",
      "endDate": "01/01/2022 00:00:00"
    }
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    const options = {
      headers: header 
      //params: inputparams       
    };
    const url = `${this.apiUrl}/getApplicationPriorityIncidents/`+`${id}`;
    return this.http.post(url,filters,options).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }

  public getIncidentByTrend(id:any,filters:dashboardFilters):Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    const body ={
      "startDate": "01/01/2020 00:00:00",
      "endDate": "01/01/2022 00:00:00"
    }
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    const options = {
      headers: header 
      //params: inputparams      
    };
    const url = `${this.apiUrl}/getMonthTrendIncidentsCount/`+`${id}`;
    return this.http.post(url,filters,options).pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }
  public getIncidentBySlaBreach(id:any):Observable<any>{
    const token = localStorage.getItem(USER_TOKEN);
    
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    const options = {
      headers: header
        
    };
    const url = `${this.apiUrl}/getSlaAboutToBreachIncidents/`+`${id}`;
    return this.http.get(url,options).pipe(
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

