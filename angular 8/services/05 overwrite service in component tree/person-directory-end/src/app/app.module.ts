import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonComponent } from './person.component';
import { PeopleService } from './people.service';
import { FemalComponent } from './femal.component';
import { FemalService } from './femal.service';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    FemalComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    PeopleService,
    FemalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
