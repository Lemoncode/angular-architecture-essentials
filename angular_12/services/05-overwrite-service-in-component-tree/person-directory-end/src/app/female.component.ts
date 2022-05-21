import { Component, OnInit } from '@angular/core';
import { FemaleService } from './female.service';
import { PeopleService } from './people.service';

@Component({
  selector: 'app-female',
  template: `
  <h3>
    female
  </h3>
  <pre>{{ person | json }}</pre>

  <app-person></app-person>
  `,
  styles: [],
  providers: [
    { provide: PeopleService, useClass: FemaleService }
  ]
})
export class FemaleComponent implements OnInit {
  person: any;

  constructor(private people: PeopleService) { }

  ngOnInit(): void {
    this.person = this.people.getPerson();
  }

}
