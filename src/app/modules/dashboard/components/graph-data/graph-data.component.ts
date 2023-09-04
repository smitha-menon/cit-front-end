import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';

@Component({
  selector: 'app-graph-data',
  templateUrl: './graph-data.component.html',
  styleUrls: ['./graph-data.component.scss']
})



export class GraphDataComponent implements OnInit{
  ngOnInit(): void {
   
  }

  public doughnutChartLabels1: Label[] = ['Reused', 'modifed', 'new'];
  public doughnutChartData1: MultiDataSet = [[50, 20, 30]];
  public doughnutChartType1: ChartType = 'doughnut';
  public doughnutChartOptions1: Chart.ChartOptions = {
    tooltips: {
      enabled: true
    }
  };
  public doughnutChartColors: Color[] = [{
    backgroundColor: ['#1A73E8', '#02C8F0', '#806DF0']
  }];
  // public chartDataset = [
  //   {
  //     data: [10.8, 9.2],
  //   }] ;

  public doughnutChartLabels: Label[] = ['PHP', '.Net', 'Java'];
   
  public doughnutChartData: MultiDataSet = [
    [250, 150, 100],
    [160, 150, 130],
    [250, 130, 70],
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

}
