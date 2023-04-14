import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PeopleService } from './people.service';
import { PersonComponent } from './person.component';
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
  providers: [PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
