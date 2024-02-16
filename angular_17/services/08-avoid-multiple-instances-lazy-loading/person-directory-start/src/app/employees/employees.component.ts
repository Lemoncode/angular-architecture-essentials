import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees',
  template: `
    <h1>
      employees route
    </h1>
    <app-people-list></app-people-list>
  `,
  styles: [
  ]
})
export class EmployeesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
