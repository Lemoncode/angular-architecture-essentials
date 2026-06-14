import { Injectable } from '@angular/core';

@Injectable()
export class PersonService {
  name = 'Jai';

  getPerson() {
    return {
      name: this.name,
      age: 39,
    };
  }

  setPersonName(value: string) {
    this.name = value;
  }
}
