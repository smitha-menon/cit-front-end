import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INCIDENT_ID_KEY } from 'src/app/core/constants/local-storage-keys';
import { NotifierService } from 'src/app/core/utils/notifier';
import { ApiservicesService } from 'src/app/services/apiservices.service';


@Component({
  selector: 'app-rca-details',
  templateUrl: './rca-details.component.html',
  styleUrls: ['./rca-details.component.scss']
})
export class RCADetailsComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private rend:Renderer2,
    private apiservice:ApiservicesService,
    private notifier: NotifierService) {}

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
    console.log("T",this.selectedType);
    return !this.rcaGroup.value.remediation || this.rcaGroup.value.remediation.trim() === '' ||
     this.selectedType === undefined;
  }

  public addRCA()
  {
    this.rcaData.append('incidentId', localStorage.getItem(INCIDENT_ID_KEY));
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
    this.fileshow(filen,filet);
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

   fileshow(fname:any,ftype:any){
    const fwrap = document.getElementById("filewrapper");
    let ind =this.fileList.length;
    ind+=1
    const showfileboxelem=this.rend.createElement("div");
    showfileboxelem.classList.add("showfilebox");
    this.rend.setAttribute(showfileboxelem,'id',ind.toString());
    const leftElem =this.rend.createElement("div");
    leftElem.classList.add("left");
    const filetypElem = this.rend.createElement("span");
    filetypElem.classList.add("filetype");
    filetypElem.innerHTML=ftype;
    leftElem.append(filetypElem);
    const filetitlELem = this.rend.createElement("h3");
    filetitlELem.innerHTML=fname;
    leftElem.append(filetitlELem);
    showfileboxelem.append(leftElem);
    const rightElem = this.rend.createElement("div");
    rightElem.classList.add("right");
    showfileboxelem.append(rightElem);
    const crossElem = this.rend.createElement("span");
    crossElem.innerHTML="&#215";
    rightElem.append(crossElem);
    fwrap?.append(showfileboxelem);
    
    crossElem.addEventListener("click",()=>{
      this.elementIndex.push(showfileboxelem.getAttribute('id'));      
      fwrap?.removeChild(showfileboxelem);     
      
    })

  }

}
