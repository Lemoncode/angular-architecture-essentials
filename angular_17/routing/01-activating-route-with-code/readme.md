# Activating a route with code

In this demos we're going to activate a route with code. We will start from `pets-start` project. The final result must match with `pets-end project`.

The current naviagtion has been defined on `root` module.

```ts
// app.module.ts
imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome',  pathMatch: 'full' }, // 1
      { path: 'pets', component: PetsComponent },
      { path: '**', component: PageNotFoundComponent } // 2
    ])
  ],
```

1. If the `exact` url from host fragment matches it will redirect to `welcome`. Visit the following [link](https://stackoverflow.com/questions/42992212/in-angular-what-is-pathmatch-full-and-what-effect-does-it-have) for a further explanation.
2. If there's not match, will fall into `**`

## To navigate from code we have to relie on a service provided by RouterModule

- Have a look into the routing config to inspect routes
- Inject the service in **app.component**
- Just specify the route, that we want to follow.
- We can feed this method with parameters

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
+     <li (click)="logOut()">
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

+ logOut() {
+   this.router.navigate(['/welcome']);
+ }
}

```

- We can use this method in different flavours

```typescript
logOut() {
  this.router.navigate(['/welcome']); // Standard
  this.router.navigate('/welcome'); // Short-cut deprecated
  this.router.navigateByUrl('/welcome'); // Complete url path
}
```

- Bear on mind that the last one will work over absolute routes, not over relative ones.
