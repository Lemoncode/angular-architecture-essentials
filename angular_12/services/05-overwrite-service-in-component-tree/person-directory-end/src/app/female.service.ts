import { Injectable } from '@angular/core';
import { PeopleService } from './people.service';

@Injectable()
export class FemaleService extends PeopleService {
  getPerson() {
    const person = super.getPerson();
    person.name = 'lau';
    (person as any).gender = 'F';
    return person;
  }
}
