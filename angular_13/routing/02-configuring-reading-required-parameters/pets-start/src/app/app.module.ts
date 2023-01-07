import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
// import { PetsComponent } from './pets.component';
import { WelcomeComponent } from './welcome.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    // PetsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
