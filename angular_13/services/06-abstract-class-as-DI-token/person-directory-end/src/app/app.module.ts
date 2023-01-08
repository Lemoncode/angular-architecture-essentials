import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PeopleListComponent } from './people-list.component';
import { PeopleService, AwesomePeopleService } from './people.service';

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
