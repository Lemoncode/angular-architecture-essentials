import { Injectable } from "@angular/core";

@Injectable()
export class PeorsonService {
  name = 'Jai';
  getPerson() {
    return {
      name: this.name,
      age: 38,
    };
  }

  setPersonName(value) {
    this.name = value;
  }
}
