export const ROUTES = {
    LOGIN: '/login',
    INCIDENT: '/incidents',
    VIEWSTEPS: '/incidents/view-steps',
    RESOLUTION : '/incidents/resolutions',
    CREATEINCIDENT: '/create-incident',
    USERS: '/users',
    ADDUSER: '/users/create-user',
    GROUP: '/rback',
    CREATEROLE: '/rback/role-page',
    CREATEGROUP: '/rback/group-page',
    APPROVALS: '/incident-approval',        
    ROLES: '/users/roles',
    REPORT: '/reports',
    DASHBOARD: '/dashboard',
    APPLICATION:'/create-application',
    PIELIST: '/dashboard/pie-incident-list'
}

 export const statuses={ closedState:'closed'}

 export const FEATURES={

    modifyTags:'modifyTags',
    updateIncident:'updateIncident',
    addIncident:'addIncident',
    addResolution:'addResolution',
    addSuggestedSteps:'addSuggestedSteps'
 }

 export const userRoles={ SRE:'SRE',
                         GA:'GA',
                         SA:'SA',
                         BU:'BU'}

export enum ApprovalStatus {
                            APPROVED='APPROVED',
                             PENDING='PENDING', 
                             REJECTED='REJECTED'
                        }