import { Component, OnInit } from '@angular/core';
import { PersonService } from './person.service';

@Component({
  selector: 'app-child',
  template: `
    <h4>
      child component
    </h4>
    <pre>{{ personService.getPerson() | json }}</pre>
  `,
  styles: [
  ]
})
export class ChildComponent implements OnInit {

  constructor(public personService: PersonService) { }

  ngOnInit(): void {
  }

}
