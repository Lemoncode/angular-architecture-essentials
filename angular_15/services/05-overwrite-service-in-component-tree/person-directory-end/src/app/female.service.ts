import { Injectable } from '@angular/core';
import { PeopleService } from './people.service';

@Injectable()
export class FemaleService extends PeopleService {
  override getPerson(): { name: string; age: number; } {
    const person = super.getPerson();
    person.name = 'lau';
    (person as { name: string; age: number; gender: string; }).gender = 'F';
    return person;
  }
}
