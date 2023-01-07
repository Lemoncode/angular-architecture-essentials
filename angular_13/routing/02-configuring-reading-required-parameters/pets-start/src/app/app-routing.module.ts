import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';
import { PetComponent } from './pets/pet.component';
import { PetsComponent } from './pets/pets.component';
import { WelcomeComponent } from './welcome.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'pets', component: PetsComponent },
  { path: 'pets/:id', component: PetComponent },
  { path: '' },
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
