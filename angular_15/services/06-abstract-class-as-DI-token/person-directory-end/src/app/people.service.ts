import { Injectable } from '@angular/core';

// export interface PeopleService {
//   getPeople(): any;
// }
export abstract class PeopleService {
  abstract getPeople(): any;
}

@Injectable()
export class AwesomePeopleService extends PeopleService {
  people = [
    { name: 'A' },
    { name: 'B' },
  ];

  getPeople() {
    return this.people;
  }
}
