import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <ul class="menu">
    <li>
        <a [routerLink]="['/welcome']">Home</a>
    </li>
    <li>
        <a [routerLink]="['/pets']">Pets</a>
    </li>
    <li>
      Logout
    </li>
  </ul>
  <router-outlet></router-outlet>
  `,
  styles: [`
    .menu {
      display:flex;
      justify-content: space-between;
    }
    .menu li {
      list-style-type: none;
    }
  `]
})
export class AppComponent {
  title = 'pets';
}
