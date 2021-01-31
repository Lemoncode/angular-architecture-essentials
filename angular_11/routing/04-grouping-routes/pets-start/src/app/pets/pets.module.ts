import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PetsComponent } from './pets.component';
import { PetComponent } from './pet.component';
import { PetsToysComponent } from './pets-toys.component';
import { PetToysComponent } from './pet-toys.component';
import { PetInfoComponent } from './pet-info.component';
import { PetInfoToysComponent } from './pet-info-toys.component';
import { PetEditComponent } from './pet-edit.component';


@NgModule({
  declarations: [
    PetsComponent,
    PetComponent,
    PetsToysComponent,
    PetToysComponent,
    PetInfoComponent,
    PetInfoToysComponent,
    PetEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    PetsComponent,
    PetComponent,
    PetsToysComponent
  ]
})
export class PetsModule { }
