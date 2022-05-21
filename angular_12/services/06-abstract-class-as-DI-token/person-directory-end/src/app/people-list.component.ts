import { Component, OnInit } from '@angular/core';
import { PeopleService } from './people.service';

@Component({
  selector: 'app-people-list',
  template: `
    <h3>People</h3>
    <ul>
      <li *ngFor="let person of people">
        {{ person.name }}
      </li>
    </ul>
  `,
  styles: [
  ]
})
export class PeopleListComponent implements OnInit {
  people: any;

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.people = this.peopleService.getPeople();
  }

}
