export interface loginResponse{
    token:string,
    assignedGroupId:string,
    assignedToId:string,
    deniedAccessMethodNames:string [],
    allowedAccessMethodNames:string[],
    roleCode:string,
    loginUser:string
}