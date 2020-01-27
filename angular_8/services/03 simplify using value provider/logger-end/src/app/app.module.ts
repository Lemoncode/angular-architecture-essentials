import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonComponent } from './person.component';
import { LoggerService } from './service/logger.service';

const simpleLogger = {
  log(msg: string) {
    console.log(`I am a simple logger: ${msg}`);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{ provide: LoggerService, useValue: simpleLogger }],
  bootstrap: [AppComponent]
})
export class AppModule { }
