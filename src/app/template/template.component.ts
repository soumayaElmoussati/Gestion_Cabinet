import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [
  ]
})
export class TemplateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
rdv()
{
  this.router.navigate(['/rdv']);
}
}
