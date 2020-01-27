import { Injectable } from '@angular/core';

@Injectable()
export class PersonService {
  name = 'Jai';

  getPerson() {
    return {
      name: this.name,
      age: 38,
    }
  }

  setPersonName(value) {
    this.name = value;
  }
}
