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

## We have refactored our pets service to use Observables.

* In our `app.component` we can choose an item from pets list.
* We have created an entry that is unknown by our backend, it only exists in the client.
* We want to deal with the error, right in the `app.component`
* For that purpose we're going to use `HttpErrorResponse`
* The nice thing of this type, it's that comes with all the related information about http error.  

```diff app.common.ts
import { Component } from '@angular/core';
import { PetsService } from './pets.service';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="fetchPets()">Fetch Pets</button>

    <hr>

    <ul>
      <li
      (click)="fetchPet(pet.id)"
      *ngFor="let pet of pets">{{pet.name}}
      </li>
    </ul>

    <hr>

    <span>{{selectedPet?.name}}</span>
+   <p *ngIf="message">
+     {{message}}
+   </p>
  `
})
export class AppComponent {
  pets;
  selectedPet;
+ message;

  constructor(private petsService: PetsService) {}

  fetchPets() {
    this.petsService.fetchPets()
      .subscribe((result) => {
        this.pets = result;
        this.pets.push({
          id: Date.now(),
          name: 'Unknown',
          spicy: 'Unknown'
        });
      });
  }

  fetchPet(id: string) {
    this.petsService.fetchPetById(id)
      .subscribe(
        (result) => this.selectedPet = result,
+        (err: HttpErrorResponse) => {
+          if (err instanceof Error) {
+            this.message = `An error occured ${err.error.message}`;
+          } else {
+            this.message = `Backend returned error code ${err.status}`;
+          }
+        }
+      );
  }
}

```
