# Simplify using value provider

* There are times that can be more easy to provide a predifine object instead a class in Angular.

```typescript
import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {

  constructor() { }

  log(msg: string) {
    console.log(`Logger: ${msg}`);
  }
}
```

__src/app/app.module.ts__

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonComponent } from './person.component';
import { LoggerService } from './service/logger.service';

const simpleLogger = {
  log(msg: string) {
    console.log(`I am a simple logger: ${msg}`);
  }
};

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

```
* Obviuosly we can define this function in a separate file. 
