import { Injectable } from '@angular/core';

@Injectable()
export class PeopleService {
  name = 'J' // 
  getPerson(): any {
    return {
      name: this.name,
      age: 38,
    }
  }
}
