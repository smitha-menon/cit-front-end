export interface user{
    username:string,
    password:string
}

export interface createUser{
    username :  string ,
   password :  string ,
   company :  string ,
   createdBy :  string ,
   updatedBy :  string ,
   createdOn :  string ,
   updatedOn :  string ,
   isActive : boolean,
   emailAddress :  string ,
   phoneNumber :  string ,
   roles:groupRoles[]
}

export interface groupRoles{
     assignedGroupId :  string ,
       roleId :  string ,
       customizedPrivileges :string []
}