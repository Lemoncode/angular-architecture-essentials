# In this demo we're going to build a service that will work with Promises, and then use it on a clssical (then/catch) way and with new ES7 fetaures (async/await).

* To deal with server we will use a local proxy.
* The technology for server will be express running over node.

* Create a model for pets, for simpolicity will be the same structure as repository server entity model.

__src\app\pet.model.ts__

```typescript
export interface PetModel {
  id: number;
  name: string;
  spicies: string;
}

```

* Lets create a service that relies on promises, this is whenever gets a result it will return a promise.

```
$ ng g s pets --skipTests
```

__src\app\pets.service.ts__

```typescript
import { Injectable } from '@angular/core';
import { PetModel } from './pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private baseUrl = '/api/v1/pets';

  fetchPets(): Promise<PetModel> {
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

* Now edit as follows `app.component.ts`

__src\app\app.component.ts__

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
