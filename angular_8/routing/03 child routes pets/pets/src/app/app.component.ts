import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
      <li (click)="logoOut()">
        Logout
      </li>
    </ul>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .menu {
      display: flex;
      justify-content: space-between;
    }
    .menu li {
      list-style-type: none;
    }
  `]
})
export class AppComponent {
  constructor(private router: Router) {}

  logoOut() {
    // this.router.navigate(['/welcome']); // Standard
    // this.router.navigate('/welcome'); // Short-cut deprecated
    this.router.navigateByUrl('/welcome'); // Complete url path
  }
}
