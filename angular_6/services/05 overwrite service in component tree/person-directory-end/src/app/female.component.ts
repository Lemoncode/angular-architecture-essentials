import { Component, OnInit } from '@angular/core';
import { PeopleService } from './people.service';
import { FemaleService } from './female.service';

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
  person;

  constructor(private people: PeopleService) { }

  ngOnInit() {
    this.person = this.people.getPerson();
  }

}
