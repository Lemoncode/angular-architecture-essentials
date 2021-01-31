import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PersonComponent } from './person.component';
import { LoggerService } from './service/logger.service';
import { WriterService } from './service/writer.service';

const loggerFactory = (writer: WriterService) => {
  return new LoggerService(true, writer);
};

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    WriterService,
    { provide: LoggerService, useFactory: loggerFactory, deps: [WriterService] }, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
