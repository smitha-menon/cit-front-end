export interface loginResponse{
    token:string,
    assignedGroupId:string,
    assignedToId:string,
    deniedAccessMethodNames:string [],
    allowedAccessMethodNames:string[],
    roleName:string,
    loginUser:string
}