# Grouping Routes

We want a better organization of our routes. 

## Steps.

### Step 1. Lets make a refactor to group pets module routes all together.

```diff
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
- { path: 'pets', component: PetsComponent },
- { path: 'pets/:id', component: PetComponent },
- { path: 'pets/:id/toys', component: PetsToysComponent },
- {
-   path: 'pets/:id/edit',
-   component: PetEditComponent,
-   children: [
-     { path: '', redirectTo: 'info', pathMatch: 'full' },
-     { path: 'info', component: PetInfoComponent },
-     { path: 'toys', component: PetInfoToysComponent },
-   ],
- },
+ {
+   path: 'pets',
+   component: PetsComponent,
+   children: [
+     { path: ':id', component: PetComponent },
+     { path: ':id/toys', component: PetsToysComponent },
+     {
+       path: ':id/edit',
+       component: PetEditComponent,
+       children: [
+         { path: '', redirectTo: 'info', pathMatch: 'full' },
+         { path: 'info', component: PetInfoComponent },
+         { path: 'toys', component: PetInfoToysComponent },
+       ],
+     },
+   ]
+ },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```
* Since child routes extend the path of the parent route, we specify relative paths making our paths shorter and more durable as paths change over time.

* But this not work as we are expecting.

* If we try the application now we will find out that the pets children routes are not working, if we try the edit button we will found out an error: `Cannot read property 'component' of null`.

* Remind how child routes work? We need a `router-outlet` to display the components, here we don't have that `router-outlet` in the parent component pet list component.

* routes works with herarchies, if the herarchy is right it will now in which outlet has to inject the component.

### Step 2. We can use a techniche to avoid this issue component less route

> From version 11, there's no error, the routing just stop working.

* Move `PetsComponent` as a child as well.
* Now the parent route has no component.
* It's called a component-less route.
* Now although there is not an outlet on the component, the router will get the elder outlet to inject the template. 

Edit __pets/src/app/app-routing.module.ts__

```diff 
const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'pets',
-   component: PetsComponent,
    children: [
+     { path: '', component: PetsComponent },
      { path: ':id', component: PetComponent },
      { path: ':id/toys', component: PetsToysComponent },
      {
        path: ':id/edit',
        component: PetEditComponent,
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: PetInfoComponent },
          { path: 'toys', component: PetInfoToysComponent },
        ],
      },
    ]
  },
  { path: '**', component: PageNotFoundComponent }
]
```
* Lets give it a try. Now our app works nicely.