# Step by Step

> Use node -v 18

## Create `page-not-found.component.ts`

```bash
npx ng g c page-not-found --skip-tests --inline-template --inline-style --flat
```

## Create `welcome.component.ts`

```bash
npx ng g c welcome --skip-tests --inline-template --inline-style --flat
```

## Create `pets.service`

```bash
npx ng g s pets --skip-tests
```

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  pets = [{ name: 'Frank' }, { name: 'Maui' }, { name: 'Laika' }];

  fetchPets() {
    return this.pets;
  }
}

```

## Create `pets.component.ts`

```bash
npx ng g c pets --skip-tests --inline-template --inline-style --flat
```

```ts
import { Component, OnInit } from '@angular/core';
import { PetsService } from './pets.service';

@Component({
  selector: 'app-pets',
  template: `
    <p *ngFor="let pet of pets">
      {{ pet.name }}
    </p>
  `,
  styles: [],
})
export class PetsComponent implements OnInit {
  pets: any[] = [];

  constructor(private petsService: PetsService) {}

  ngOnInit(): void {
    this.pets = this.petsService.fetchPets();
  }
}

```

## Update `app.module.ts`

```diff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
+import { RouterModule } from '@angular/router';
```

```ts
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    PetsComponent
  ],
  imports: [
    BrowserModule,
    /*diff*/
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'pets', component: PetsComponent },
      { path: '**', component: PageNotFoundComponent },
    ])
    /*diff*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


- `redirectTo: 'welcome'`: It forces the browser to redirect immediately to the /welcome URL.

- `pathMatch: 'full'`: This is critical for empty paths. It tells Angular to only trigger this redirect if the entire remaining URL is empty. Without `pathMatch: 'full'`, the empty string would match every single route (since every route starts with an empty string), creating an infinite loop.

- `path: '**'`: Matches everything. If a user types a broken URL (like `mysite.com/does-not-exist`), it won't match `'welcome'`, it won't match `'',` and it won't match `'pets'`. It will finally fall through to this wildcard and display the `PageNotFoundComponent`.

> NOTE: Because Angular matches routes from top to bottom, **the wildcard route must always be the very last item in the array**. If you put it first, every single page request would hit the wildcard and show a 404 page.

## Update `app.component.ts`

```bash
rm src/app/app.component.css
rm src/app/app.component.html
rm src/app/app.component.spec.ts
```

```ts
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
      display: flex;
      justify-content: space-between;
    }
    .menu li {
      list-style-typ: none;
    }
  `]
})
export class AppComponent {
  title = 'pets';
}

```

```bash
npm start
```

```bash
cp -r playground/  routing/00-activiting-route-with-code/pets-start
```