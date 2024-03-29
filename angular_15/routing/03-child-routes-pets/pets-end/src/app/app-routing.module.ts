import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';
import { PetComponent } from './pets/pet.component';
import { PetsToysComponent } from './pets/pets-toys.component';
import { PetsComponent } from './pets/pets.component';
import { WelcomeComponent } from './welcome.component';
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
    path: 'pets/:id/edit',
    component: PetEditComponent,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', component: PetInfoComponent },
      { path: 'toys', component: PetInfoToysComponent }
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
