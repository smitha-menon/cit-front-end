export interface Incidents {
    incidentId:string;
    active:string;
    state:string;
    priority:string;
    openedDate:string;
    assignednTo:string;
}

export interface drillIncidents {
    incidentId:string;
    active:string;
    state:string;
    priority:string;
    openedDate:string;
    assignedTo:string;
    dueDate: string;
    openedBy: string;
    resolvedDate: string;
    sla: string;
    slaLapse: string
    assignedgroup: string;
    comment:string;
}

export interface reportFilters{
    assignedId: string,
  assignedGroupId: string,
  state: string,
  priority: string,
  fromDate: string,
  toDate: string
//   page: number,
//   size: number
}
export interface dashboardFilters{
    startDate: string,
    endDate: string
}