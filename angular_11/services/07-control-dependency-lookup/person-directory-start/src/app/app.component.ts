import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h2>Logger Service</h2>
    <app-person></app-person>
  `
})
export class AppComponent {
  title = 'person-directory';
}
