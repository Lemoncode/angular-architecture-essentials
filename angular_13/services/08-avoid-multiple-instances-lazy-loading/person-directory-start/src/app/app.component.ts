import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Person directory</h1>
    <nav>
      <a [routerLink]="['']">Home</a>
      <a [routerLink]="['employees']">Employees</a>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
