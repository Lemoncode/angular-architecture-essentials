import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { loggerFactory, LoggerService } from './logger.service';
import { PersonComponent } from './person.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    // {
    //   provide: LoggerService,
    //   useFactory: loggerFactory('AppModule')
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
