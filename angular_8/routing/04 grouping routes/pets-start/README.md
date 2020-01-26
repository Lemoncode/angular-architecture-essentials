# Child Routes

In this example we can watch how child routes work.

__pets\src\app\app-routing.module.ts__

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
2. We declare the child realted routes.

If we open __pets\src\app\pets\pet-edit.component.ts__ and have a look into its template, we can notice a new __router-outlet__ where the child route components will be placed.

```html
<ul class="menu">
  <li>
      <a [routerLink]="['info']">Info</a>
  </li>
  <li>
      <a [routerLink]="['toys']">Toys</a>
  </li>
</ul>
<router-outlet></router-outlet>
```

