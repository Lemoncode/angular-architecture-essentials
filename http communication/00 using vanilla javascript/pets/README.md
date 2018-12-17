# Pets

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## In this demo we're going to build a service that will work with Promises, and then use it on a clssical (then/catch) way and with new ES7 fetaures (async/await).

* To deal with server we will use a local proxy.
* The technology for server will be express running over node.

* Create a model for pets, for simpolicity will be the same structure as repository server entity model.

```typescript pet.model.ts
export interface Pet {
  id: number;
  name: string;
  spicy: string;
}

```

* Lets create a service that relies on promises, this is whenever gets a result it will return a promise.

```typescript pets.service.ts
import { Injectable } from '@angular/core';
import { Pet } from './pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private baseUrl = '/api/v1/pets';

  fetchPets(): Promise<Pet> {
    return fetch(this.baseUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        // Check type of response, it will be rejected any way.
      });
  }
}

```

* Now our `app.component.ts` looks this way

```typescript app.component.ts
import { Component } from '@angular/core';
import { PetsService } from './pets.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="fetchPets()">Fetch Pets</button>

    <hr>

    <ul>
      <li *ngFor="let pet of pets">{{pet.name}}</li>
    </ul>
  `
})
export class AppComponent {
  pets;

  constructor(private petsService: PetsService) {}

  fetchPets() {
    this.petsService.fetchPets()
      .then((result) => {
        this.pets = result;
      });
  }
}

```

* Lets start the app an try it.
* This is nice but can we use `async/await`?

```diff app.component.ts
import { Component } from '@angular/core';
import { PetsService } from './pets.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="fetchPets()">Fetch Pets</button>

    <hr>

    <ul>
      <li *ngFor="let pet of pets">{{pet.name}}</li>
    </ul>
  `
})
export class AppComponent {
  pets;

  constructor(private petsService: PetsService) {}

- fetchPets() {
-   this.petsService.fetchPets()
-     .then((result) => {
-       this.pets = result;
-     });
- }

+ async fetchPets() {
+   this.pets = await this.petsService.fetchPets();
+ }
}

```
