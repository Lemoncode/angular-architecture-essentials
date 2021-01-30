# In this demo we're going to build a service that will work with Promises, and then use it on a clssical (then/catch) way and with new ES7 fetaures (async/await).

* To deal with server we will use a local proxy.
* The technology for server will be express running over node.


## Create a API server

* Create `./server` directory on root, and place the following files

* `./server/pets.repository.js`

```js
const pets = [
    {
        id: 1,
        name: 'lax',
        spicies: 'dog',
    },
    {
        id: 2,
        name: 'sax',
        spicies: 'dog',
    },
    {
        id: 3,
        name: 'snowball',
        spicies: 'cat',
    },
];

const delayResolver = (delay) => (resolve, result) =>
(setTimeout(() => {
    resolve(result);
}, delay));

module.exports = (delay = 1000) => {
    const delayResolverInit = delayResolver(delay);
    return {
        getAllPets: () => (
            new Promise(
                (res, _) => delayResolverInit(res, pets)
            )
        ),
        getPetById: (id) => (
            new Promise((res, _) => {
                const result = pets.find(p => p.id === id);
                delayResolverInit(res, result);
            })
        ),
        getPetsBySpicies: (spicies) => (
            new Promise((res, _) => {
                const result = pets.filter(p => p.spicies === spicies);
                delayResolverInit(res, result);
            })
        ),
        addPet: (pet) => (
            new Promise((res, _) => {
                pet.id = Date.now();
                pets.push(pet);
                delayResolverInit(pet, res)
            })
        ),
    };
};

```

* `./server/index.js`

```js
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  repo = require('./pets.repository')();

app.use(bodyParser.urlencoded({ extended: true }));

// TODO: Handle errors
app.get('/api/v1/pets', async (_, res, next) => {
  const result = await repo.getAllPets();
  res.json(result);
  next();
});

app.get('/api/v1/pets/:id', async (req, res, next) => {
  const result = await repo.getPetById(req.params.id);
  if (!result) {
    res.status(404);
  } else {
    res.json(result);
  }
  next();
});

app.get('/api/v1/pets/spicies/:name', async (req, res, next) => {
  const result = await repo.getPetsBySpicies(req.params.name);
  if (!result) {
    res.status(404);
  } else {
    res.json(result);
  }
  next();
});

app.post('/api/v1/pets', async (req, res, next) => {
  const pet = req.body; // TODO: Validate pet
  const result = await repo.addPet(pet);
  res.json(result);
  next();
});

const port = 3000;
app.listen(port);
console.log(`Server running on: ${port}`);

```

Create `./proxy.conf.json`

```json
{
  "/api": {
      "target": "http://localhost:3000",
      "secure": false
  }
}

```

Install `express` and `body-parser` as dev dependencies

```bash
$ npm i express body-parser -D
```

Update `package.json` as follows

```diff
"scripts": {
    "ng": "ng",
-   "start": "ng serve",
+   "start": "node ./server/index.js | ng serve --proxy-config proxy.conf.json",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
```


## Create the API server client 

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
$ ng g s pets --skip-tests
```

__src\app\pets.service.ts__

```typescript
import { Injectable } from '@angular/core';
import { PetModel } from './pet.model';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  private baseUrl = '/api/v1/pets';

  fetchPets(): Promise<PetModel[] | null> {
    return fetch(this.baseUrl).then((response) => {
      if (response.ok) {
        return response.json();
      }

      return null;
    });
  }
}



```
* Remove `app.component.html` and `app.component.css`.

* Now edit as follows `app.component.ts`: 

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
