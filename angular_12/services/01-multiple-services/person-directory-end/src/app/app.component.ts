import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Services<h1>
    <h3>App component</h3>
    <app-person-edit></app-person-edit>

    <button (click)="childVisible = !childVisible">Toggle</button>
    <app-child *ngIf="childVisible"></app-child>
  `,
})
export class AppComponent {
  title = 'person-directory';
  childVisible = true;
}
