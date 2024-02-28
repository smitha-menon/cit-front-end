import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { INCIDENT_ID_KEY } from 'src/app/core/constants/local-storage-keys';
import { NotifierService } from 'src/app/core/utils/notifier';
import { ApiservicesService } from 'src/app/services/apiservices.service';


@Component({
  selector: 'app-rca-details',
  templateUrl: './rca-details.component.html',
  styleUrls: ['./rca-details.component.scss']
})
export class RCADetailsComponent implements OnInit {
  incId: any;
  details: any;

  constructor(private fb: FormBuilder,
    private rend:Renderer2,
    private apiservice:ApiservicesService,
    private route: ActivatedRoute,
    private notifier: NotifierService) {

      this.route.queryParams.subscribe((params) => {

        if (params['Id']!==undefined)
        {
          console.log('Id',params['Id']);
          this.incId=params['Id'];
          this.loadRCADetails();
        }
       
  });
    }

    ngOnInit() {
      this.loadRCATypeList();
      this.rcaGroup = this.fb.group({
        remediation: ['',[Validators.required]],
        notes:['']
      });
   }

  
  public rcaGroup: FormGroup | any;
  rcaList: any;
  selectedType:any =undefined;
  defaultSelection:string ="--Select--";
  fileName:string []=[];
  fileList:any []=[];
  rcaData:any = new FormData();
  message:string="No File Selected"
  elementIndex:any=[];

  
  get f() {
    return this.rcaGroup.controls;
  }

  isTextareaEmpty(): boolean {    
    return !this.rcaGroup.value.remediation || this.rcaGroup.value.remediation.trim() === '' ||
     this.selectedType === undefined;
  }

  public addRCA()
  {
    if(this.incId==undefined)
    {
    this.rcaData.append('incidentId', localStorage.getItem(INCIDENT_ID_KEY));
    }
    else{
    this.rcaData.append('incidentId', this.incId);    
    }
    this.rcaData.append('remediation', this.rcaGroup.value.remediation);
    this.rcaData.append('additionalNotes',this.rcaGroup.value.notes);
    this.rcaData.append('rcaTypeId',this.selectedType);

    console.log("before", this.fileList);
    this.elementIndex.forEach((item:any)=>{
      this.fileList.splice(Number(item)-1, 1);
    });
    console.log("after", this.fileList);
    this.fileList.forEach((element:any) =>{      
      
    this.rcaData.append('attachments', element);

    });
    

    this.apiservice.addRCA(this.rcaData).subscribe({
      next:(response:any)=>{
        console.log(response);
        this.notifier.success("success","RCA attached !!");
      },
      error: (err: any) => {
        console.log(err);
        if(err.status==200)
        {
          this.notifier.success("success","RCA attached !!");
        }
        else{
        this.notifier.error("failure","RCA could not be attached");
        }
      }
    });
    
  }


  public onFileSelected(event:any){

    console.log("files",event.target.value);
    this.message="Selected Documents";
    
    let filen = event.target.files[0].name;
    let filet = filen.split('.').pop();//event.target.files[0].type;
    //this.fileName.push(filen);    
    this.fileshow(filen);
    this.fileList.push(event.target.files[0]);
    
  }

  public loadRCATypeList(){

    this.apiservice.getRCATypeList().subscribe({
      next:(data:any)=>{
        this.rcaList= data;
      },
      error: (err: any) => {
        console.log(err)}
    });
  }

  public loadRCADetails(){

    this.apiservice.getRCAData(this.incId).subscribe({
      next:(data:any)=>{
        this.details= data;
        this.rcaGroup = this.fb.group({
          remediation: [data.remediation],
          notes:[data.additionalNotes]
        });
        this.fileList= data.attachments;
        this.selectedType=data.rcaTypeId;
        var i=0;
        for(i=0; i< this.fileList.length;i++)
        {
          this.fileshow(this.fileList[i].fileName);//"File-"+ new Date().toLocaleDateString()+"-"+i);

        }
      },
      error: (err: any) => {
        console.log(err)
        this.notifier.error("failure",err.error);
      }
    });
  }

  //  fileshow(fname:any,ftype:any){
  //   const fwrap = document.getElementById("filewrapper");
  //   let ind =this.fileList.length;
  //   ind+=1
  //   const showfileboxelem=this.rend.createElement("div");
  //   showfileboxelem.classList.add("showfilebox");
  //   this.rend.setAttribute(showfileboxelem,'id',ind.toString());
  //   const leftElem =this.rend.createElement("div");
  //   leftElem.classList.add("left");
  //   const filetypElem = this.rend.createElement("span");
  //   filetypElem.classList.add("filetype");
  //   filetypElem.innerHTML=ftype;
  //   leftElem.append(filetypElem);
  //   const filetitlELem = this.rend.createElement("h3");
  //   filetitlELem.innerHTML=fname;
  //   leftElem.append(filetitlELem);
  //   showfileboxelem.append(leftElem);
  //   const rightElem = this.rend.createElement("div");
  //   rightElem.classList.add("right");
  //   showfileboxelem.append(rightElem);
  //   const crossElem = this.rend.createElement("span");
  //   crossElem.innerHTML="&#215";
  //   rightElem.append(crossElem);
  //   fwrap?.append(showfileboxelem);
    
  //   crossElem.addEventListener("click",()=>{
  //     this.elementIndex.push(showfileboxelem.getAttribute('id'));      
  //     fwrap?.removeChild(showfileboxelem);     
      
  //   })

  // }

  fileshow(fname:any){
    const fwrap = document.getElementById("filewrapper");
    const showwrap = document.getElementById("test1");
    let ind =this.fileList.length;
    ind+=1    
    const leftElem =this.rend.createElement("div");    
    const filetypElem = this.rend.createElement("span");
    filetypElem.classList.add("filetype");
    filetypElem.innerHTML=fname ;
    leftElem.append(filetypElem);
    this.rend.setAttribute(leftElem,'id',ind.toString());   
    const crossElem = this.rend.createElement("span");
    crossElem.innerHTML="&#215";
    this.rend.setAttribute(crossElem,'style','cursor: pointer;color:#fff;font-size:22px');  
    leftElem.append(crossElem);
    showwrap?.append(leftElem);    
    
    crossElem.addEventListener("click",()=>{
     this.elementIndex.push(leftElem.getAttribute('id'));      
     showwrap?.removeChild(leftElem);     
      
    })

  }

}
