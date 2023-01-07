import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Services<h1>
    <h3>App component</h3>
    <app-person-edit></app-person-edit>

    <app-child></app-child>
  `,
})
export class AppComponent {
  title = 'person-directory';
}
