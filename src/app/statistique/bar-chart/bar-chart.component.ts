import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styles: [
  ]
})
export class BarChartComponent  {
  constructor(private service : DataService){}
  ChartOptions: ChartOptions = {
    responsive: true,
  };
  ChartLabels: Label[] = this.service.Label;
  ChartType: ChartType = 'bar';
  ChartLegend = true;
  ChartPlugins = [];

  ChartData: ChartDataSets[] = this.service.data;


}
