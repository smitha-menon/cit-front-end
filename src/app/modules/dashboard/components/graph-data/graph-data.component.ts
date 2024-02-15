import { Component, OnInit ,ViewChild, inject} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ChartType , Chart, ChartConfiguration} from 'chart.js';
import { MultiDataSet, Label, Color, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
import { ROUTES } from 'src/app/core/constants/constant';
import { dashboardFilters } from 'src/app/interfaces/incidents';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { PermissionsService } from 'src/app/services/permissions.service';

@Component({
  selector: 'app-graph-data',
  templateUrl: './graph-data.component.html',
  styleUrls: ['./graph-data.component.scss']
})



export class GraphDataComponent implements OnInit{


  private apiservices= inject(ApiservicesService);
  private permissionsService = inject(PermissionsService);
  selectedGroup:any | any;
  dashBoardData:any | any;
  startDate:any | any;
  endDate:any  | any;
  filters!:dashboardFilters;
  
  canvas1: any;
  canvas2:any;
  canvas3:any;
  //canvas4:any;
  ctx1:any;
  ctx2:any;
  ctx3:any
  bargraphData!: any;
  verticalBargraphData: any = [50, 20, 30];
  optionSelected: any;
  public doughnutChartLabels1: Label[] = ['Reused', 'modifed', 'new'];
  public doughnutChartData1: MultiDataSet = [[50, 20, 30]];
  public doughnutChartType1: ChartType = 'doughnut';
  public doughnutChartOptions1: Chart.ChartOptions = {
    tooltips: {
      enabled: true
    }
  };
  public pieChartOptions: Chart.ChartOptions = {
    legend: {
      display:true,     
      
      position : 'right',
      onClick: this.newLegendClickHandler
    },
    legendCallback: (chart:any) => {
      const text = [];
      text.push('<ul class="custom-legend">');
      const data = chart.data;
      if (data.labels.length) {
        for (let i = 0; i < data.labels.length; i++) {
          text.push('<li class="legend-item">');
          text.push('<span style="background-color:' + data.datasets[0].backgroundColor[i] + '"></span>');
          text.push('<span>' + data.labels[i] + ': ' + data.datasets[0].data[i] + '</span>');
          text.push('</li>');
        }
      }
      text.push('</ul>');
      return text.join('');
    }
  };

  public newLegendClickHandler (e:any, legendItem:any):void{

    
    var index = legendItem.index;
        console.log('legend',legendItem);
        let url=ROUTES.PIELIST;
      //  var data:any =  localStorage.getItem("tabledata");
      //  data=JSON.parse(data??"");
      //  console.log('datalegend',data);
      //  console.log("index",index);
       switch (index){
       case 0:     
        url=url+"?index=0"
        break;
        case 1:
          url=url+"?index=1"
        break;
        case 2:
          url=url+"?index=2"
        break;
        case 3:
          url=url+"?index=3"
        break;
        

      }
        //localStorage.setItem("tabledata",data?.todayIncidentsList);
       
          window.location.href =url;//ROUTES.PIELIST;
        
  }
  

  public verticalBargraphLabel: Label[]=['january','february','march','april'];
  trendData: any;
 
  
  /**
   *
   */
  constructor(private route: ActivatedRoute) {
    this.permissionsService.loginreponse$.subscribe((data) => {
      this.selectedGroup = data.currentGroupData.assignedGroupId;
    });
    this.route.queryParams.subscribe((params) => {

      if (params['option']!==undefined)
      {
        console.log('option',params['option']);
        this.optionSelected=params['option'];
        if( this.optionSelected==5)
        {
          
          this.loadDataOption5();
        }
       
        if( this.optionSelected==3)
        {
          this.loadDataOption3();        
        
        }      
         if( this.optionSelected==2)
        { 
            this.loadOption2();
        } 
        if(this.optionSelected==4)
        {
          this.loadDataOption4();
        } 
        if( this.optionSelected==1)
        {
            this.loadData();
        }

      }
     
});
  }
  ngOnInit(): void {

    this.permissionsService.loginreponse$.subscribe((data) => {
      this.selectedGroup = data.currentGroupData.assignedGroupId;
    });
   
    console.log("inside init for option", this.optionSelected);
  }
  ngAfterViewInit(): void {
    // this.canvas1= this.mychart.nativeElement
    // this.ctx1=this.canvas1.getContext('2d');
    // this.canvas2= this.mychart1.nativeElement
    // this.ctx2=this.canvas2.getContext('2d');
    console.log("ctx1",this.ctx1);
    if(this.optionSelected==5)
    {
      const legendContainer = document.getElementById('legendContainer');
      const piec = document.getElementById('mypie') as HTMLCanvasElement;

      var piChart = new Chart(piec, {
        type: this.doughnutChartType,        
        options: this.pieChartOptions,
      });
    

       if (legendContainer) {
      legendContainer.innerHTML = piChart.generateLegend().toString();
    }
          this.loadDataOption5();
    }
       
    if( this.optionSelected==3)
    {
      this.loadDataOption3();        
    
    }
  

    
  } 
  
  
  public doughnutChartColors: Color[] = [{
    backgroundColor:['#fd5e0f','#cb2b27','#9d446e','#FF5E5A']//['#8F4700','#C46100',  '#EC7A08',      '#EF9234']//,'#FD5E0F'] //['#1A73E8', '#02C8F0', '#806DF0']
  }];
  // public chartDataset = [
  //   {
  //     data: [10.8, 9.2],
  //   }] ;

  public doughnutChartLabels: Label[] = ['Today', 'Tomorrow','<2 days','<5 days'];
   
  public doughnutChartData: MultiDataSet = [
    [250,160,200,150]

  ];
   
  public doughnutChartType: ChartType = 'pie';


    // chart plugin to add center text
    public doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [{
      afterDraw(chart: any) {
        const ctx = chart.ctx;
  
        // get the sum of graph data set
        var dataset = chart.tooltip._data.datasets[0].data        
        var total: string = dataset.reduce((acc: any, cur: any) => acc + cur, 0).toString();
       
        var txt2 = (total);
  
        if (Number(total) > 0) {
          var txt1 = 'Incidents';
        }
        else {
          var txt1 = 'No Records';
        }
  
  
        //Get options from the center object in options
        const sidePadding = 60;
        const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
  
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
  
        //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
  
        const stringWidth = ctx.measureText(txt1).width;
        const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
  
        // Find out how much the font can grow in width.
        const widthRatio = elementWidth / stringWidth;
        const newFontSize = Math.floor(30 * widthRatio);
        const elementHeight = (chart.innerRadius * 2);
  
        // Pick a new font size so it will not be larger than the height of label.
        const fontSizeToUse = 50;
        ctx.font = fontSizeToUse + 'montserrat';
        ctx.fillStyle = '#344054';
        ctx.weight = 'bold';
  
        // Draw text in center
        ctx.fillText(txt2, centerX, centerY - 10);
  
        var fontSizeToUse1 = 50;
        ctx.font = fontSizeToUse1 + 'montserrat';
        ctx.fillText(txt1, centerX, centerY + 10);
      }
    }];

    renderStackedBarChart() {
      // Get the canvas element
      const ctx = document.getElementById('myChart3') as HTMLCanvasElement;
      let itemlabels = this.trendData?.map((item:any) => item.monthName);
      let breachedCount = this.trendData?.map((item:any) => item.slaBreachedIncidentsCount);
      let closedCount = this.trendData?.map((item:any) => item.closedIncidentsCount);
      let openCount = this.trendData?.map((item:any) => item.openIncidentsCount);    

    
      const data = {
        labels: itemlabels,//['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'Breached',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: breachedCount,//[10, 20, 30, 40, 50],
           // stack: 'Stack 1'
           fill: false
          },
          {
            label: 'Open',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: openCount,//[5, 15, 25, 35, 45],
            //stack: 'Stack 1'
            fill: false
          },
          {
            label: 'Closed',
            backgroundColor: 'rgba(255, 255, 0, 0.5)',
            borderColor: 'rgba(255, 255, 0, 1)',
            borderWidth: 1,
            data: closedCount,//[15, 25, 35, 45, 55],
            //stack: 'Stack 2'
            fill: false
          },
        ]
      };
  
      // Chart options
      const options =  {
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
    };
  
      // Create the stacked bar chart
      const stackedBarChart = new Chart(ctx, {
        type: 'line',
        data: data
        //options: options,
      });
    
  
  }

    // loadBarChart()
    // {
    //   //const cconfig:ChartConfiguration= {"indexAxis": 'y' }
    //   new Chart("myChart3", {
    //     type: 'line',
    //     data: {
    //       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //       datasets: [{
    //         label: '# of Votes',
    //         data: [12, 19, 3, 5, 2, 3],
    //         borderWidth: 1
    //       }]
    //     },
       
    //     // options: {
    //     //   scales: {
    //     //     // y: {
    //     //     //   beginAtZero: true
    //     //     // }
    //     //   }
    //     // }
    //   });
    // }

    loadOption2(){
      this.setFilter();
      this.apiservices.getIncidentByUserData(this.selectedGroup,this.filters).subscribe({
        next:(response:any)=>{
          console.log("dashboard",response);
          this.verticalBargraphData=response?.map((data:any) => data.incidentsCount); 
          this.verticalBargraphLabel =response?.map((data:any) => data.username); 
          console.log("this.verticalBargraphLabel",this.verticalBargraphLabel);
          this.loadchartOption2();
        },
        error:(err:any)=>{console.log(err)}
      });   

    }

    loadchartOption2(){
      this.ctx1 = document.getElementById('mychart') as HTMLCanvasElement;
      console.log("verticalBargraphLabel",this.verticalBargraphLabel);
      new Chart(this.ctx1,{
        type: 'bar',
        data:{
          labels: this.verticalBargraphLabel,//['january','february','march','april'],
          datasets: [
            {
              label: 'Incidents by Team',
              data: this.verticalBargraphData, //[0,20,40,50],
              fill: false,
              borderColor: '#FF5E5A',//'#007ee7',
              backgroundColor:"#FF5E5A",// "rgb(115,185,243 / 65%)",
              borderWidth: 1,
              
            },
          ]
        }
        
      });

    }

    loadDataOption5(){
      this.apiservices.getIncidentBySlaBreach(this.selectedGroup).subscribe({
        next:(response:any)=>{
          console.log("slabraech",response);  
          //this.doughnutChartData=Object.values(response);
          //console.log("slabraech1", this.doughnutChartData);
          localStorage.setItem("tabledata",JSON.stringify(response));
          let twodaysCount = response?.lessThanTwoDaysIncidentsCount; 
          let tomorrowCount = response?.tomorrowIncidentsCount; 
          let fivedaysCount = response?.lessThanFiveDaysIncidentsCount;      
          let todayCount =response?.todayIncidentsCount; 
          this.doughnutChartData=[todayCount,tomorrowCount,twodaysCount,fivedaysCount];//Object.values(response);//[[250,160,200,150]]//;
          //this.permissionsService.setTableData(response.todayIncidentsList);
          console.log("slabraech2", this.doughnutChartData);         
          
        },
        error:(err:any)=>{console.log(err)}
      });
    }

    loadDataOption4(){
      this.setFilter();
      this.apiservices.getIncidentByTrend(this.selectedGroup,this.filters).subscribe({
        next:(response:any)=>{
          console.log("trendData",response);
          this.trendData=response;
          this.renderStackedBarChart();
        },
        error:(err:any)=>{console.log(err)}
      });
    }
    setFilter()
    {
      this.startDate=isNaN(this.startDate)?new Date( Date.now()).toLocaleDateString("en-GB"):this.startDate.toLocaleDateString("en-GB");    
      this.endDate =isNaN(this.endDate)?new Date( Date.now()).toLocaleDateString("en-GB"):this.endDate.toLocaleDateString("en-GB"); 

      this.filters={

        startDate:this.startDate +" 00:00:00",
        endDate:this.endDate +" 00:00:00"
      }
    }
    loadDataOption3(){

      this.setFilter();
     

      this.apiservices.getIncidentByPriority(this.selectedGroup,this.filters).subscribe({
        next:(response:any)=>{
          console.log("dashboard",response);
          this.dashBoardData=response;
          this.loadchartOption3();
        },
        error:(err:any)=>{console.log(err)}
      });
    }

  loadchartOption3(){

      const labels=this.dashBoardData?.map((data:any) => data.applicationName);
      let itemlabels = this.dashBoardData?.map((item:any) => item.priorityCountList.map((x:any) => x.priorityName));
     
      let bgColor= ['#727272',
        '#f1595f',
        '#79c36a',
        '#599ad3',
        '#f9a65a'];
        
      
      let configData: any=[];
      let itemcount:any =[];
      console.log("itemlabels",itemlabels);
      var index=0;

       itemlabels[0]?.forEach((element:any) => {    
       
        itemcount=[];        
        const v= this.dashBoardData.forEach((y:any) => {
          itemcount.push(y.data.find((x:any) => (x.priority===element))?.count)
        });
        
        console.log("find",itemcount);
            configData.push({
                    label: element,
                    data: itemcount,
                    backgroundColor: bgColor[index],//["rgb(115,185,243 / 65%)","#47a0e8"],
                    borderColor:"#007ee7",
                    fill: true,});

              index=index+1;
        
        });
        // configData=[{
        //     label: 'Priority1',
        //     data: [0,20,40,50],
        //     backgroundColor:"rgb(115,185,243 / 65%)",
        //     borderColor:"#007ee7",
        //     fill: true,},
        //     {
        //     label: 'Priority2',
        //     data: [0,20,40,60,80],
        //     backgroundColor:"#47a0e8",
        //     borderColor:"#007ee7",
        //     fill: true,
  
        //   }];
     console.log("configData",configData);
      this.ctx2=document.getElementById('mychart1') as HTMLCanvasElement;
    new Chart(this.ctx2,{
      type: 'horizontalBar',
     data:{
      datasets:configData,
        
        labels:labels//['Application1','Application2','Application3','Application4']
      }
    });
    }

    loadData()
    {
      this.setFilter();      
      this.apiservices.getIncidentByApplnData(this.selectedGroup,this.filters).subscribe({
        next:(response:any)=>{
          console.log("dashboard",response);
          this.bargraphData=response;
          this.doughnutChartLabels1=response?.map((data:any) => data.applicationName); 
          this.doughnutChartData1=response?.map((data:any) => data.incidentsCount); 
          // console.log("dashboard1",this.doughnutChartLabels1);
          // console.log("dashboard2",this.doughnutChartData1);
        },
        error:(err:any)=>{console.log(err)}
      });
     
    }

    startDateChanged(event: any) {
      console.log('Start Date Changed:', event.value);
      this.startDate=event.value;
      // Run your function for start date change
      // Example: this.someFunction(event.value);
    }
  
    endDateChanged(event: any) {
      console.log('End Date Changed:', event.value);
      this.endDate=event.value;
      // Run your function for end date change
      // Example: this.someFunction(event.value);
    }
    

    
}
