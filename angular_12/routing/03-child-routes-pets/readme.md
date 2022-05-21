# Child Routes

In this example we can watch how child routes work.

* We have created the following components on pets module:
  - pet-info.component
  - pet-info-toys.component
  - pet-edit.component

* We have updated `pets.component` in order to navigate to `pet-edit.component`

```ts
// src/app/pets/pets.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PetsService } from './pets.service';

@Component({
  selector: 'app-pets',
  template: `
    <ul>
      <li *ngFor="let pet of pets">
        <a [routerLink]="['/pets', pet.name]">{{ pet.name }}</a>
        <button style="float; right; clear: both;" (click)="editPet(pet.name)">
          Edit
        </button>
      </li>
    </ul>
  `,
  styles: [],
})
export class PetsComponent implements OnInit {
  pets;
  constructor(private petsService: PetsService, private router: Router) {}

  editPet(petName: string) {
    this.router.navigate(['/pets', petName, 'edit']);
  }

  ngOnInit(): void {
    this.pets = this.petsService.fetchPets();
  }
}

```

From this point we're going to create our child route navigation

### Step 1. We define child route

__pets/src/app/app-routing.module.ts__

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome.component';
import { PetsComponent } from './pets/pets.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { PetComponent } from './pets/pet.component';
import { PetsToysComponent } from './pets/pets-toys.component';
import { PetEditComponent } from './pets/pet-edit.component';
import { PetInfoComponent } from './pets/pet-info.component';
import { PetInfoToysComponent } from './pets/pet-info-toys.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'pets', component: PetsComponent },
  { path: 'pets/:id', component: PetComponent },
  { path: 'pets/:id/toys', component: PetsToysComponent },
  {
    path: 'pets/:id/edit', // [1]
    component: PetEditComponent, // [1]
    children: [ // [2]
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', component: PetInfoComponent },
      { path: 'toys', component: PetInfoToysComponent },
    ],
  },
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
 
1. It's just like any other route that we already has used.
2. We declare the child related routes.

### Step 2. Update pet-edit.component template to expose a new navigation menu

If we open __pets/src/app/pets/pet-edit.component.ts__ and have a look into its template, we can notice a new __router-outlet__ where the child route components will be placed.

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pet-edit',
  template: `
  <ul class="menu">
    <li>
        <a [routerLink]="['info']">Info</a>
    </li>
    <li>
        <a [routerLink]="['toys']">Toys</a>
    </li>
  </ul>
  <router-outlet></router-outlet>
  `,
  styles: [`
    .menu {
      background-color: pink;
      display: flex;
      justify-content: space-between;
    }
    .menu li {
      list-style-type: none;
    }
  `]
})
export class PetEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

```
