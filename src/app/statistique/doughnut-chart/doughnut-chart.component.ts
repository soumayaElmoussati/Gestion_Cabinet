import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styles: [
  ]
})
export class DoughnutChartComponent {
  dChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  dChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  dChartType: ChartType = 'doughnut';

}
