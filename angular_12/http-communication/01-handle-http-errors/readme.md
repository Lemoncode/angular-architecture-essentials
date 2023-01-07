# Handling errors demo

## We have refactored our pets service to use Observables.

* Our service now looks like this:

__src/app/pets.service.ts__

```ts
import { Injectable } from '@angular/core';
import { PetModel } from './pet.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private baseUrl = '/api/v1/pets';

  constructor(private http: HttpClient) {}

  fetchPets(): Observable<PetModel[]> {
    return this.http.get<PetModel[]>(this.baseUrl);
  }

  fetchPetById(id: string): Observable<PetModel> {
    return this.http.get<PetModel>(
      `${this.baseUrl}/${id}`
    );
  }
}

```

* In our `app.component` we can choose an item from pets list.


__src/app/app.component.ts__

```html
<ul>
  <li *ngFor="let pet of pets"
    (click)="fetchPet(pet.id)">
    {{pet.name}}
  </li>
</ul>

<hr>

<span>{{selectedPet?.name}}</span>
```

* We have created an entry that is unknown by our backend, it only exists on client.

__src/app/app.component.ts__

```ts
fetchPets() {
  this.petsService.fetchPets()
    .subscribe((result) => {
      this.pets = result;
      this.pets.push({
        id: Date.now(),
        name: 'Unknown',
        species: 'Unknown'
      })
    });
}
```

If we run the code and select an element that does not exist, currently we have an unhandled exception. Let's change that.

> Run the code and access to page on browser to see the error

* Actions on code:
  * We want to deal with the error, right in the `app.component`
  * For that purpose we're going to use `HttpErrorResponse` (the nice thing of this _type_, it's that __comes with all the related information about http error__).

__src/app/app.component.ts__


```diff app.component.ts
import { Component } from '@angular/core';
import { PetsService } from './pets.service';

+import { HttpErrorResponse } from '@angular/common/http';

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
