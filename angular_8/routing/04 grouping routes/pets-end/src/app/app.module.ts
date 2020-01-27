import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';


/*routing*/
import { AppRoutingModule } from './app-routing.module';
import { PetsModule } from './pets/pets.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PetsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
