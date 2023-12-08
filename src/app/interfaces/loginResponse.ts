export interface loginResponse{
    token:string,
    // assignedGroupId:string,
    assignedToId:string,
    // deniedAccessMethodNames:string [],
    // allowedAccessMethodNames:string[],
    // roleCode:string,
    loginUser:string
    groupRoles: groupRole [],
    roles:Role[]
}

export interface groupRole{
    assignedGroupId:string,
    roleId:string
}

export interface Role{

    roleId:string,
    roleCode:string,
    roleName:string,
    isActive:boolean,
    deniedAccessMethodNames:string [],
    allowedAccessMethodNames:string[],

}