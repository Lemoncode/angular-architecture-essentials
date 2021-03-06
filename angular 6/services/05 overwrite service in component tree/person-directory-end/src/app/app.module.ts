import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonComponent } from './person.component';
import { PeopleService } from './people.service';
import { FemaleService } from './female.service';
import { FemaleComponent } from './female.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    FemaleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    PeopleService,
    FemaleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
