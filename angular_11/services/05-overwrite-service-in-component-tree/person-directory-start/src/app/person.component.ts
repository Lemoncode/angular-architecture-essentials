import { Component, OnInit } from '@angular/core';
import { PeopleService } from './people.service';

@Component({
  selector: 'app-person',
  template: `
    <pre>
      {{ person | json }}
    </pre>
  `,
  styles: [
  ]
})
export class PersonComponent implements OnInit {
  person;

  constructor(private people: PeopleService) { }

  ngOnInit(): void {
    this.person = this.people.getPerson();
  }

}
