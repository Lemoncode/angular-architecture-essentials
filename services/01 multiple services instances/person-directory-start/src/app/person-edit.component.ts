import { Component, OnInit } from '@angular/core';
import { PeorsonService } from './person.service';

@Component({
  selector: 'app-person-edit',
  template: `
    <pre>
      {{ personService.getPerson() | json }}
    </pre>
    <br />
    <input type="text" #personName/>
    <button (click)="setPerson(personName.value)">save</button>
  `,
  styles: []
})
export class PersonEditComponent implements OnInit {

  constructor(public personService: PeorsonService) { }

  ngOnInit() {
  }

  setPerson(value: string) {
    this.personService.setPersonName(value);
  }
}
