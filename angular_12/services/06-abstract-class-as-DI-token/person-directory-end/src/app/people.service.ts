import { Injectable } from '@angular/core';

export abstract class PeopleService {
  abstract getPeople(): any[];
}

@Injectable()
export class AwesomePeopleService implements PeopleService {
  people = [
    { name: 'A' },
    { name: 'B' },
  ];

  getPeople() {
    return this.people;
  }
}
