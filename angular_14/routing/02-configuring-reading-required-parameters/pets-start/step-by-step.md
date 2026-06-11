# Step by Step

## Create `pets` module

```bash
npx ng g m pets
```

## Create `pet-toys` component

```bash
npx ng g c pets/pet-toys --skip-tests --inline-template --inline-style --flat -m pets
```

```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pet-toys',
  template: `
  <h3>Pet toys</h3>
  <p *ngFor="let toy of toys">
    {{ toy }}
  </p>
  `,
  styles: [],
})
export class PetToysComponent {
  @Input() toys: any;
}

```

## Refactor `pets` service

```bash
mv pets.service.ts ./pets/pets.service.ts
```

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  /*diff*/
  pets = [
    {
      name: 'Frank',
      species: 'dog',
      toys: ['rope', 'ball'],
    },
    {
      name: 'Maui',
      species: 'cat',
      toys: ['teddy bear'],
    },
    {
      name: 'Laika',
      species: 'dog',
      toys: ['cookies'],
    },
  ];
  /*diff*/

  fetchPets() {
    return this.pets;
  }

  /*diff*/
  fetchPetByName(name: string) {
    return this.pets.find((p) => p.name === name);
  }

  fetchPetToys(name: string) {
    const pet = this.fetchPetByName(name);
    return pet ? pet.toys : [];
  }
  /*diff*/
}

```


## Create `pet` component

```bash
npx ng g c pets/pet --skip-tests --inline-template --inline-style --flat -m pets
```

```ts
import { Component, OnInit } from '@angular/core';
import { PetsService } from './pets.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pet',
  template: `
    <div style="display:flex; justify-content:space-between">
      <p>
        {{ pet.name }}
      </p>
      <p>
        {{ pet.species }}
      </p>
      <a [routerLink]="['/pets', pet.name, 'toys']">Visit my toys</a>
    </div>
  `,
  styles: [],
})
export class PetComponent implements OnInit {
  pet: any;

  constructor(
    private petsService: PetsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const petName = this.route.snapshot.paramMap.get('id');
    const { name, species } = this.petsService.fetchPetByName(petName!)!;
    this.pet = { name, species };
  }
}

```

## Create `pets-toys` component

```bash
npx ng g c pets/pets-toys --skip-tests --inline-template --inline-style --flat -m pets
```

```ts
import { Component, OnInit } from '@angular/core';
import { PetsService } from './pets.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pets-toys',
  template: `
   <div
    style="display: flex; justify-content: space-between"
    *ngFor="let pet of pets">
      <p>
        {{pet}}
      </p>
      <button style="height: 20px;">Select Pet</button>
    </div>

    <hr>
    <h2>{{selectedPet}}</h2>
    <app-pet-toys [toys]="toys"></app-pet-toys>
  `,
  styles: [],
})
export class PetsToysComponent implements OnInit {
  toys: any;
  pets: string[] = [];
  selectedPet: string = '';

  constructor(
    private petsService: PetsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.pets = this.petsService.fetchPets().map(({ name }) => name);
    this.selectedPet = this.route.snapshot.paramMap.get('id')!;
    this.toys = this.petsService.fetchPetToys(this.selectedPet);
  }
}

```

## Create `pets` component

```bash
rm app/pets.component.ts
```

```bash
npx ng g c pets/pets --skip-tests --inline-template --inline-style --flat -m pets
```

```ts
import { Component, OnInit } from '@angular/core';
import { PetsService } from './pets.service';

@Component({
  selector: 'app-pets',
  template: `
    <ul>
      <li *ngFor="let pet of pets">
        <a [routerLink]="['/pets', pet.name]">{{ pet.name }}</a>
      </li>
    </ul>
  `,
  styles: [],
})
export class PetsComponent implements OnInit {
  pets: any;
  constructor(private petsService: PetsService) {}

  ngOnInit(): void {
    this.pets = this.petsService.fetchPets();
  }
}

```

## Update `pets` module

```diff
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetToysComponent } from './pet-toys.component';
import { PetComponent } from './pet.component';
import { PetsToysComponent } from './pets-toys.component';
import { PetsComponent } from './pets.component';
+import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PetToysComponent,
    PetComponent,
    PetsToysComponent,
    PetsComponent,
  ],
  imports: [
    CommonModule,
+   RouterModule
  ],
+ exports: [
+   PetsComponent,
+   PetComponent,
+   PetsToysComponent
+ ]
})
export class PetsModule {}

```

Update `app-routing.module.ts`

```diff
....
import { WelcomeComponent } from './welcome.component';
-import { PetsComponent } from './pets.component';
+import { PetsComponent } from './pets/pets.component';
....
```

```ts
const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'pets', component: PetsComponent },
  /* diff */
  { path: 'pets/:id', component: PetComponent },
  { path: 'pets/:id/toys', component: PetsToysComponent },
  /* diff */
  { path: '**', component: PageNotFoundComponent },
];
```

Update `apps.module.ts`

```diff
....
import { WelcomeComponent } from './welcome.component';
-import { PetsComponent } from './pets.component';

import { AppRoutingModule } from './app-routing.module';
+import { PetsModule } from './pets/pets.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    WelcomeComponent,
-   PetsComponent,
  ],
- imports: [BrowserModule, AppRoutingModule],
+ imports: [BrowserModule, AppRoutingModule, PetsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```