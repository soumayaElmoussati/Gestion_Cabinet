import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
@Component({
  selector: 'app-all-chart',
  templateUrl: './all-chart.component.html',
  styles: [
  ]
})
export class AllChartComponent  {

  constructor(private router: Router){}

  barChart()
  {
    this.router.navigate(['/barChart']);
  }
  lineChart()
  {
    this.router.navigate(['/lineChart']);
  }
  pieChart()
  {
    this.router.navigate(['/pieChart']);
  }
  radarChart()
  {
    this.router.navigate(['/radarChart']);
  }
  bubbleChart()
  {
    this.router.navigate(['/bubbleChart']);
  }
  doughChart()
  {
    this.router.navigate(['/doughChart']);
  }
}
