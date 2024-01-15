import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/constant';
import { NotifierService } from 'src/app/core/utils/notifier';
import { groupRoles } from 'src/app/interfaces/user';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { PermissionsService } from 'src/app/services/permissions.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public createUser: FormGroup | any;
  selectedRole: string | any;
  assignGrpList: any = [];
  tableData: any = [];
  selectedGroup: string | any;
  defaultSelection: string = "--Select--";
  roleList: any = [];
  userPermissions: string[] = [];
  selectedItems: string[] = [];
  logedUser: string | any;
  selectionEvent: boolean = false;
  customizedRole: boolean = false;
  isChecked:boolean=false;
  isEditMode:boolean =false;
  privilegeList:any=[];

  pageTitle:string ="Add User";
  editUser:any;
  fileName:any ="../../../assets/images/noprofile.png";

  constructor(private fb: FormBuilder,
    private apiservice: ApiservicesService,
    private notifier: NotifierService,
    private routes: Router, private router: ActivatedRoute,private permissionsService: PermissionsService) {

    this.permissionsService.loginreponse$.subscribe((data) => {
      this.logedUser = data.loginUser;
    });

    this.router.queryParams.subscribe((params) => {

          if (params['editUser']!==undefined)
          {
            this.pageTitle="Edit User";
            this.editUser=params['editUser'];
            this.isEditMode=true;
            
          }
          else{
            this.isEditMode=false;
          }
    });
  
  }

  get f() {
    return this.createUser.controls;
  }

  ngOnInit(): void {
    this.loadRole();
    this.loadGroups();
    this.loadPrivileges();

    this.createUser = this.fb.group({
      username: [''],
      company: ['G10X'],
      passwordtxt: [''],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      createdby: [this.logedUser],
      createdon: [(new Date()).toLocaleDateString("en-GB") + ' ' + (new Date()).toLocaleTimeString('en-IT', { hour12: false })],

    })
    this.loadUserById();
  }
  

  onFileSelected(event:any){
    if(event.target.files.length >  0)
    {
      const file= event.target.files[0];
      console.log(file);
      console.log(file.type);
      if(file.type === "image/png" || file.type === "image/jpeg" )
      {
        var reader = new FileReader();
       reader.readAsDataURL(event.target.files[0]);
       reader.onload=(data:any)=>{console.log(data.target.result);
        this.fileName= data.target.result};
        if(this.isEditMode)
        {
        const formData = new FormData();
        formData.append('file', file);
        this.apiservice.uploadPhoto(formData,this.editUser).subscribe({
          next: (response: any) => {
            console.log(response)
           
            this.notifier.success(
              'Photo updated',
              'success'
            )
           
          },
          error: (err: any) => {
            console.log(err)
            
              this.notifier.error(
                'Failed',
                'Photo is not uploaded'
              )
          }
    
        });
      }
        
      }
      else{
       
        this.notifier.error("Error","wrong file type,choose png/jpeg file");
        this.fileName="../../../assets/images/noprofile.png";
        
      }
      
    }

  }


  deleteUsrPhoto()
  {
    this.apiservice.deletePhoto(this.editUser).subscribe({
      next: (response: any) => {
        console.log(response)
       
        this.notifier.success(
          'Photo deleted',
          'success'
        )
        this.fileName="../../../assets/images/noprofile.png";
      },
      error: (err: any) => {
        console.log(err)
        
          this.notifier.error(
            'Failed',
            'Photo is not deleted'
          )
      }

    });

  }
  
  schedule() {
   this.customizedRole = true;
  }
  loadRole() {
    this.apiservice.getActiveRole().subscribe({
      next: (res: any) => {
        console.log(res)
        this.roleList = res
      },
      error: (err: any) => console.log(err)
    })
  }
  loadGroups() {
    this.apiservice.getAssignedGrpList().subscribe({
      next: (data: any) => {
        console.log(data)
        this.assignGrpList = data
        // this.assignGrpList = this.assignGrpList.split(',')  
      },
      error: (err: any) => {
        console.log(err)

      }
    });
  }

  loadPrivileges(){
    this.apiservice.getPrivileges().subscribe({
      next:(res: any) => {
        console.log(res)
        this.privilegeList = res.map((data: any) => {
          return {
            name: data.userPrivilegeName,
            id: data.userPrivilegeId
          }
        })
        
      }
    })
  }

  eventCheck(data: any) {
    this.selectionEvent = true;
    if (data.target.checked && this.selectedRole != "undefined") {
      this.userPermissions = [];
      this.roleList.find((x: any) => {
        if (x.roleName === this.selectedRole) {          
          this.userPermissions = x.deniedAccessMethodNames;          
        }
      });

    }
    if(!data.target.checked)
    {
      this.userPermissions = [];
      this.selectionEvent = false;
    }

  }
  onSelectionChange(event: any) {
    this.selectedItems = event.source.selectedOptions.selected.map((option: any) => option.value);
    console.log('Selected Items:', this.selectedItems);
  }


  deleteItem(data: any) {

    let somedata = [];
    somedata = this.tableData.filter((item: any) => item.column4 !== data);

    this.tableData = somedata;
    let count = 1
    this.tableData.forEach((item: any) => {
      item.column4 = count;
      count += 1;
    });
  }

  addUser() {
    let roles: groupRoles[] = [];

   

  this.tableData.forEach((element:any) => {
  
    roles.push({assignedGroupId:this.assignGrpList.find((x:any)=> x.groupName==element.column2).groupId,
            customizedPrivileges:element.column5,
            roleId:this.roleList.find((x:any)=> x.roleName==element.column1).roleId
        });
    });

    const obj = {
      "username": this.createUser.value.username,
      "password": this.createUser.value.passwordtxt,      
      "emailAddress": this.createUser.value.email,
      "phoneNumber": this.createUser.value.phone,
      "company": this.createUser.value.company,
      "createdBy": this.createUser.value.createdby,
      "updatedBy": "",
      "createdOn": this.createUser.value.createdon,
      "updatedOn": "",     
      "isActive": true,     
      "groupRoles": roles
    }
    console.log(obj);
    console.log(this.editUser);

    (this.editUser!=undefined)? this.updateUsr(obj):this.saveUsr(obj);
    
   
  }


  saveUsr(obj:any)
  {
    this.apiservice.addUser(obj).subscribe({
      next: (response: any) => {
        console.log(response)
       
        this.notifier.success(
          'User Created successfully',
          'success'
        )
        this.createUser.reset()
        this.routes.navigateByUrl(ROUTES.USERS)
      },
      error: (err: any) => {
        console.log(err)
        if (err.status === 201) {
          this.notifier.success(
            'User created successfully',
            'success'
          )

        }

      }


    })

  }

  updateUsr(obj:any)
  {
    
    obj.updatedBy= this.logedUser;
    obj.updatedOn= (new Date()).toLocaleDateString("en-GB") + ' ' + (new Date()).toLocaleTimeString('en-IT', { hour12: false });
    this.apiservice.modifyUser(obj,this.editUser).subscribe({
      next: (response: any) => {
        console.log(response)
       
        this.notifier.success(
          'User Updated successfully',
          'success'
        )
        this.createUser.reset()
        this.routes.navigateByUrl(ROUTES.USERS)
      },
      error: (err: any) => {
        console.log(err)
        if (err.status === 200) {
          this.notifier.success(
            'User Updated successfully',
            'success'
          )

        }

      }


    })

  }

  getPrivilegenames(data:string[]):any{
    let selectedItemsName:string []= [];
    data.forEach(item =>{
      selectedItemsName.push(this.privilegeList.find((x:any)=>(x.id==item)).name);
    })
    console.log("adta");
    return selectedItemsName;
  }

  addGroupRo() {

    const groupValue = this.selectedGroup;
    const roleValue = this.selectedRole

    // let selectedItemsName= this.selectedItems
    // selectedItemsName.forEach(item =>{
    //   console.log("item",item);
    //   item=this.privilegeList.find((x:any)=> x.id==item).name;
    //   console.log("item1",item);
    // })
    var sno = this.tableData.length + 1;
    let selectedItemsName= this.getPrivilegenames (this.selectedItems);
    console.log("names",selectedItemsName);
    this.tableData.push({
      column4: sno,
      column1: roleValue,
      column2: groupValue,
      column3: selectedItemsName,
      column5: this.selectedItems
    });
    this.isChecked=false;    

    //console.log(this.tableData)
  }

  loadUserById(){

    this.apiservice.getUserById(this.editUser).subscribe({

      next:(respons:any)=>{
        console.log(respons);
        this.createUser.value.username=respons.username

        this.createUser = this.fb.group({
          username: [respons.username],
          company: [respons.company],
          passwordtxt: [respons.passwordtxt],
          phone: [respons.phoneNumber],
          email: [respons.emailAddress],
          createdby: [respons.createdBy],
          createdon: [respons.createdOn],
    
        }) 
        
        if(respons.image !=null)
        {

        this.fileName= `data:image/jpeg;base64,`+`${respons.image}`; 
        var reader = new FileReader();       
       reader.onload= this.fileName;
        }

        var sno = 1;
          console.log(respons);
          console.log(this.roleList);
        respons.groupRoles.forEach((element:any) =>{

            this.tableData.push({
              column4: sno,
              column1: this.roleList.find((x:any)=> x.roleId==element.roleId).roleName,
              column2: this.assignGrpList.find((x:any)=> x.groupId==element.assignedGroupId).groupName,
              column3: this.getPrivilegenames(element.customizedPrivileges),
              column5: element.customizedPrivileges
        
            });
            sno+=1
      });
      },
      error:(err:any)=>{

        console.log(err)
      }
    })
  }

}
