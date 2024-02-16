import { Injectable } from '@angular/core';

@Injectable()
export class PersonService {
  name = 'Jai';

  getPerson() {
    return {
      name: this.name,
      age: 42,
    };
  }

  setPersonName(value: string) {
    this.name = value; 
  }
}
