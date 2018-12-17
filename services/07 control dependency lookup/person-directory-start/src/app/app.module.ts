import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonComponent } from './person.component';
import { LoggerService, loggerFactory } from './logger.service'

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {
      provide: LoggerService,
      useFactory: loggerFactory('AppModule'),
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
