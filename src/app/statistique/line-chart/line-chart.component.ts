import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions ,ChartType} from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DataService } from '../../service/data.service';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styles: [
  ]
})
export class LineChartComponent  {
  constructor(private service : DataService){}
  ChartData: ChartDataSets[] =  this.service.data;

  ChartLabels: Label[] = this.service.Label;

  ChartOptions = {
    responsive: true,
  };

  ChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  ChartLegend = true;
  ChartPlugins = [];
  ChartType: ChartType = 'line';
 
}
