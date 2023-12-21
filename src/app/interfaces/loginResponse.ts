export interface loginResponse{
    token:string,    
    assignedToId:string,   
    loginUser:string
    groupRoles: groupRole [],
    groups:string [],
    roles:Role[],    
    currentGroupData:CurrentGroupRole
}

export interface groupRole{
    assignedGroupId:string,
    roleId:string,
    customizedPrivileges:string
}

export interface Role{

    roleId:string,
    roleCode:string,
    roleName:string,
    isActive:boolean,
    deniedAccessMethodNames:string [],
    allowedAccessMethodNames:string[],

}
export interface CurrentGroupRole{
    assignedGroupId:string,
    roleCode:string,
    deniedAccessMethodNames:string [],
    customizedPrivileges:any

}