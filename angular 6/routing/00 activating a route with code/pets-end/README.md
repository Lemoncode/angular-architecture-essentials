## To navigate from code we have to relie on a service provided by RouterModule

* Have a look into the routing config to inspect routes
* Inject the service in __app.component__
* Just specify the route, that we want to follow.
* We can feed this method with parameters

```diff app.component.ts
import { Component } from '@angular/core';
+import { Router } from '@angular/router';

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
+     <li (click)="logoOut()">
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
+ constructor(private router: Router) {}

+ logoOut() {
+   this.router.navigate(['/welcome']);
+ }
}

```

*  We can use these method in different flavors

```typescript
logoOut() {
  this.router.navigate(['/welcome']); // Standard
  this.router.navigate('/welcome'); // Short-cut deprecated
  this.router.navigateByUrl('/welcome'); // Complete url path
}
```
* Bear on mind that the last one will work over absolute routes, not over relative ones. 
