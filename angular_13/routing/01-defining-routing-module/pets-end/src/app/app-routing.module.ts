import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';
import { PetsComponent } from './pets.component';
import { WelcomeComponent } from './welcome.component';
// import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'pets', component: PetsComponent },
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
