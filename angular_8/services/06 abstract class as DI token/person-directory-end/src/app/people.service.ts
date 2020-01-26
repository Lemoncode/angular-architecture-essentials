import { Injectable } from '@angular/core';

export abstract class PeopleService {
  abstract getPeople();
}

@Injectable()
export class AwesomePeopleService extends PeopleService {
  people = [
    { name: 'A', },
    { name: 'B', },
  ];

  getPeople() {
    return this.people;
  }
}
