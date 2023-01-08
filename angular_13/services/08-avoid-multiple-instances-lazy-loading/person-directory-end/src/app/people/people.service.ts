import { Injectable } from '@angular/core';

@Injectable()
export class PeopleService {
  people = [
    { name: 'jai' },
    { name: 'lau' },
  ];

  getPeople() {
    return this.people;
  }

  addPerson(name: any) {
    this.people.push({name});
  }
}
