export const ROUTES = {
    LOGIN: '/login',
    INCIDENT: '/incidents',
    VIEWSTEPS: '/incidents/view-steps',
    RESOLUTION : '/incidents/resolutions',
    CREATEINCIDENT: '/create-incident'
}

 export const statuses={ closedState:'closed'}

 export const FEATURES={

    modifyTags:'modifyTags',
    updateIncident:'updateIncident',
    addIncident:'addIncident',
    addResolution:'addResolution',
    addSuggestedSteps:'addSuggestedSteps'
 }

 export const userRoles={ SRE:'Service_Reliability_Engineer',
                         GA:'Group_Administrator',
                         SA:'Super_Administrator',
                         BU:'Business_User'}