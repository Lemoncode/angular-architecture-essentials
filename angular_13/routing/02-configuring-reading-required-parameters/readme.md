# Configuring, Populating And Reading Required Parameters

In this demo we will work over _required parameters_. First of all we have applied some changes to code. We have created a new module _pets_. This module will be eager loaded by the main module on main module bootstrap.

## Before start.

We will start from `pets-start project`. We will talk about some changes that we have applied.

__pets/src/app/app.module.ts__
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

/*routing*/
import { AppRoutingModule } from './app-routing.module';
import { PetsModule } from './pets/pets.module'; // [1]

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PetsModule // [1]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

1. We're importing this module, so it will be eager loaded.

We define its routes in __pets/src/app/app-routing.module.ts__

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome.component';
import { PetsComponent } from './pets/pets.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { PetComponent } from './pets/pet.component';
import { PetsToysComponent } from './pets/pets-toys.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'pets', component: PetsComponent }, // [1]
  { path: 'pets/:id', component: PetComponent }, // [1] [2]
  { path: 'pets/:id/toys', component: PetsToysComponent }, // [1] [2]
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

```

1. These route definitions belongs to pets module. 
2. These routes, consume required parameters.

* We navigate to `PetComponent` from `PetsComponent`

```html
<a [routerLink]="['/pets', pet.name]">{{ pet.name }}</a>
```

* We use `ngOnInit` to get data populated in this component __PetComponent__:

```typescript
ngOnInit() {
  const petName = this.route.snapshot.paramMap.get('id');
  const { name, espicy } = this.petsService.fetchPetByName(petName);
  this.pet  = { name, espicy };
}
```

* From this component we can navigate to __PetsToysComponent__ using:

```html
<a [routerLink]="['/pets', pet.name, 'toys']">Visit my toys</a>
```

* Now in __PetsToysComponent__ we fetch data this way: 

```typescript
ngOnInit() {
  this.pets = this.petsService.fetchPets()
    .map((p) => p.name);
  this.selectedPet = this.route.snapshot.paramMap.get('id');
  this.toys = this.petsService.fetcPetToys(this.selectedPet);
}
```
* What we want is to use the button on each pet to `navigate` to other pet's toys.
* Bear in mind that this implies don't change the displayed component by the outlet. 

## Steps.

### Step 1. Add navigation to Select Pet button

Edit __pets/src/app/pets/pets-toys.component.ts__

```diff pets-toys.component.ts
import { Component, OnInit } from '@angular/core';
import { PetsService } from './pets.service';
+import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pets-toys',
  template: `
    <div
    style="display: flex; justify-content: space-between"
    *ngFor="let pet of pets">
      <p>
        {{pet}}
      </p>
-     <button style="height: 20px;">Select Pet</button>
+     <button style="height: 20px;" (click)="showToys(pet)">Select Pet</button>
    </div>

    <hr>
    <h2>{{selectedPet}}</h2>
    <app-pet-toys [toys]="toys"></app-pet-toys>
  `,
  styles: []
})
export class PetsToysComponent implements OnInit {
  toys;
  pets: string[];
  selectedPet: string;

  constructor(
    private petsService: PetsService,
    private route: ActivatedRoute,
+   private router: Router
  ) { }
+
+  showToys(pet: string): void {
+    this.router.navigate(['/pets', pet, 'toys'])
+      .then(
+        (res) => console.log('you get to your destiny', res)
+      );
+  }
+
  ngOnInit() {
    this.pets = this.petsService.fetchPets()
      .map((p) => p.name);
    this.selectedPet = this.route.snapshot.paramMap.get('id');
    this.toys = this.petsService.fetcPetToys(this.selectedPet);
  }

}

```
* If we run the application again and visit this page we can extract the following conclusions:
  - We can watch the url changes, but our component still displaying the same data. What is going on here?
  - What is happening is that we're consuming the snapshot. The snapshot it's just one time get it in `ngOnInit`.

Lets change the approach and use `Observables`

### Step 2. Refator using Observables

Edit __pets/src/app/pets/pets-toys.component.ts__

```diff pets-toys.component.ts
ngOnInit() {
    this.pets = this.petsService.fetchPets()
      .map((p) => p.name);
-   this.selectedPet = this.route.snapshot.paramMap.get('id');
-   this.toys = this.petsService.fetcPetToys(this.selectedPet);
+    this.route.params.subscribe((params) => {
+      const { id } = params;
+      this.selectedPet = this.petsService.fetchPetByName(id)!.name;
+      this.toys = this.petsService.fetchPetToys(this.selectedPet);
+    })
  }
```

* Now our data is completely sync.
