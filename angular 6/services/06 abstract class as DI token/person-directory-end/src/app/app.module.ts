import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PeopleService, AwesomePeopleService } from './people.service';
import { PeopleListComponent } from './people-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PeopleListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{
    provide: PeopleService,
    useClass: AwesomePeopleService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
