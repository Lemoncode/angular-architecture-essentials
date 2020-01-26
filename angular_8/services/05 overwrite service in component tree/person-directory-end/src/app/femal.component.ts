import { Component, OnInit } from '@angular/core';
import { PeopleService } from './people.service';
import { FemalService } from './femal.service';

@Component({
  selector: 'app-femal',
  template: `
    <h3>
      femal
    </h3>
    <pre>{{ person | json }}</pre>

    <app-person></app-person>
  `,
  styles: [],
  providers: [
    { provide: PeopleService, useClass: FemalService }
  ]
})
export class FemalComponent implements OnInit {
  person;

  constructor(private people: PeopleService) { }

  ngOnInit() {
    this.person = this.people.getPerson();
  }

}
