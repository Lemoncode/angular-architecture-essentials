import { Injectable } from '@angular/core';

@Injectable()
export class PeopleService {
  people = [
    { name: 'A' },
    { name: 'B' },
  ];

  getPeople() {
    return this.people;
  }
}
