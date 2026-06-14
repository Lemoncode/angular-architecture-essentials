import { Injectable } from '@angular/core';
import { PersonService as PeopleService } from './person.service';

@Injectable()
export class FemaleService extends PeopleService {
  override getPerson(): { name: string; age: number } {
    const person = super.getPerson();
    person.name = 'lau';
    (person as any).gender = 'F';
    return person;
  }
}
