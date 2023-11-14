export const ROUTES = {
    LOGIN: '/login',
    INCIDENT: '/incidents',
    VIEWSTEPS: '/incidents/view-steps',
    RESOLUTION : '/incidents/resolutions',
    CREATEINCIDENT: '/create-incident',
    USERS: '/users',
    ADDUSER: '/users/create-user',
    GROUP: '/groups',
    ROLES: 'users/roles'
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