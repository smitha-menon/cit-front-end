import { Component, OnInit ,ViewChild, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartType , Chart, ChartConfiguration} from 'chart.js';
import { MultiDataSet, Label, Color, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
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

  // @ViewChild('mychart') mychart:any;
  // @ViewChild('mychart1') mychart1:any;
  // @ViewChild('mychart2') mychart2:any;
 // @ViewChild('mychart3') mychart3:any;
  canvas1: any;
  canvas2:any;
  canvas3:any;
  //canvas4:any;
  ctx1:any;
  ctx2:any;
  ctx3:any
  bargraphData!: any;
  verticalBargraphData: any;
  optionSelected: any;
  public doughnutChartLabels1: Label[] = ['Reused', 'modifed', 'new'];
  public doughnutChartData1: MultiDataSet = [[50, 20, 30]];
  public doughnutChartType1: ChartType = 'doughnut';
  public doughnutChartOptions1: Chart.ChartOptions = {
    tooltips: {
      enabled: true
    }
  };
  /**
   *
   */
  constructor(private route: ActivatedRoute) {
   
    this.route.queryParams.subscribe((params) => {

      if (params['option']!==undefined)
      {
        console.log('option',params['option']);
        this.optionSelected=params['option'];
        
      }
     
});
  }
  ngOnInit(): void {

    this.permissionsService.loginreponse$.subscribe((data) => {
      this.selectedGroup = data.currentGroupData.assignedGroupId;
    });

    this.loadData();
  }
  ngAfterViewInit(): void {
    if( this.optionSelected==4)
    {
    this.renderStackedBarChart();
    }
   
    // this.canvas1= this.mychart.nativeElement
    // this.ctx1=this.canvas1.getContext('2d');
    // this.canvas2= this.mychart1.nativeElement
    // this.ctx2=this.canvas2.getContext('2d');
    console.log("ctx1",this.ctx1);
    if( this.optionSelected==3)
    {
      this.ctx2=document.getElementById('mychart1') as HTMLCanvasElement;
    new Chart(this.ctx2,{
      type: 'horizontalBar',
     data:{
        datasets:[{
          label: 'Priority1',
          data: [0,20,40,50],
          backgroundColor:"rgb(115,185,243 / 65%)",
          borderColor:"#007ee7",
          fill: true,},
          {
          label: 'Priority2',
          data: [0,20,40,60,80],
          backgroundColor:"#47a0e8",
          borderColor:"#007ee7",
          fill: true,

        }],
        labels:['Application1','Application2','Application3','Application4']
      }
    });
  }
  if( this.optionSelected==2)
  {
    this.ctx1 = document.getElementById('mychart') as HTMLCanvasElement;
    console.log("ctx1",this.ctx1);
    new Chart(this.ctx1,{
      type: 'bar',
      data:{
        labels: ['january','february','march','april'],
        datasets: [
          {
            label: 'Incidents by Team',
            data: [0,20,40,50],
            fill: false,
            borderColor: '#007ee7',
            backgroundColor: "rgb(115,185,243 / 65%)",
            borderWidth: 1,
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 15
            // pointStyle: 'rectRot',
            // pointRadius: 5,
            // pointBorderColor: 'rgb(0, 0, 0)'
          },
        ]
      }
      
    });
  }

    
  }
  
  
  // public doughnutChartLabels1: Label[] = this.bargraphData?.map((data:any) => data.applicationName); //['Reused', 'modifed', 'new'];
  // public doughnutChartData1: MultiDataSet = this.bargraphData?.map((data:any) => data.incidentsNumber); //[[50, 20, 30]];
  // public doughnutChartType1: ChartType = 'doughnut';
  // public doughnutChartOptions1: Chart.ChartOptions = {
  //   tooltips: {
  //     enabled: true
  //   }
  // };
  public doughnutChartColors: Color[] = [{
    backgroundColor: ['#1A73E8', '#02C8F0', '#806DF0']
  }];
  // public chartDataset = [
  //   {
  //     data: [10.8, 9.2],
  //   }] ;

  public doughnutChartLabels: Label[] = ['Open Incidents', 'Closed Incident'];
   
  public doughnutChartData: MultiDataSet = [
    [250, 150],
    [160, 150],
    [250, 130],
  ];
   
  public doughnutChartType: ChartType = 'doughnut';


    // chart plugin to add center text
    public doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [{
      afterDraw(chart: any) {
        const ctx = chart.ctx;
  
        // get the sum of graph data set
        var dataset = chart.tooltip._data.datasets[0].data
        var total: string = dataset.reduce((acc: any, cur: any) => acc + cur, 0).toString();
        var txt2 = ('00');
  
        if (Number(total) > 0) {
          var txt1 = 'Incidents';
        }
        else {
          var txt1 = 'Feature';
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
        const fontSizeToUse = 25;
        ctx.font = fontSizeToUse + 'px ProximaNova';
        ctx.fillStyle = '#344054';
        ctx.weight = 'bold';
  
        // Draw text in center
        ctx.fillText(txt2, centerX, centerY - 10);
  
        var fontSizeToUse1 = 13;
        ctx.font = fontSizeToUse1 + 'px ProximaNova';
        ctx.fillText(txt1, centerX, centerY + 10);
      }
    }];

    renderStackedBarChart() {
      // Get the canvas element
      const ctx = document.getElementById('myChart3') as HTMLCanvasElement;
  
      // Sample data for the chart
      const data = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'Breached',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: [10, 20, 30, 40, 50],
            stack: 'Stack 1'
          },
          {
            label: 'Open',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: [5, 15, 25, 35, 45],
            stack: 'Stack 1'
          },
          {
            label: 'Closed',
            backgroundColor: 'rgba(255, 255, 0, 0.5)',
            borderColor: 'rgba(255, 255, 0, 1)',
            borderWidth: 1,
            data: [15, 25, 35, 45, 55],
            stack: 'Stack 2'
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
        data: data,
        options: options,
      });
    
  
  }

    loadBarChart()
    {
      //const cconfig:ChartConfiguration= {"indexAxis": 'y' }
      new Chart("myChart3", {
        type: 'line',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
          }]
        },
       
        // options: {
        //   scales: {
        //     // y: {
        //     //   beginAtZero: true
        //     // }
        //   }
        // }
      });
    }

    loadData()
    {

      this.apiservices.getIncidentByPriority(this.selectedGroup).subscribe({
        next:(response:any)=>{
          console.log("dashboard",response);
          this.dashBoardData=response;
        },
        error:(err:any)=>{console.log(err)}
      });
      this.apiservices.getIncidentByApplnData(this.selectedGroup).subscribe({
        next:(response:any)=>{
          console.log("dashboard",response);
          this.bargraphData=response;
          this.doughnutChartLabels1=response?.map((data:any) => data.applicationName); 
          this.doughnutChartData1=response?.map((data:any) => data.incidentsNumber); 
          console.log("dashboard1",this.doughnutChartLabels1);
          console.log("dashboard2",this.doughnutChartData1);
        },
        error:(err:any)=>{console.log(err)}
      });
      this.apiservices.getIncidentByUserData(this.selectedGroup).subscribe({
        next:(response:any)=>{
          console.log("dashboard",response);
          this.verticalBargraphData=response;
        },
        error:(err:any)=>{console.log(err)}
      });
    }
}
