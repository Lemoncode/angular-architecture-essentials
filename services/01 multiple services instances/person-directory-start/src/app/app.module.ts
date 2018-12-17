import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PeorsonService } from './person.service';
import { PersonEditComponent } from './person-edit.component';
import { ChildComponent } from './child.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonEditComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [PeorsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
