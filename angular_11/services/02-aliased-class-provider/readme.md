# Aliased class provider

* We now have a simple service that logs into console a message.
* Imagine that we have a larger application and we define a new logger service

```bash
ng g s service/new-logger --skip--tests
```
* We just copy the same content into this new logger service

```typescript new-logger.service.ts
import { Injectable } from '@angular/core';

@Injectable()
export class NewLoggerService {

  constructor() { }

  log(msg: string) {
    console.log(`New Logger: ${msg}`);
  }
}

```
* We want to refactor our application to use this new logger. Bear in mind that service API stills the same.
* We have to register the service in our provider section in this case in app module.

```diff app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonComponent } from './person.component';
import { LoggerService } from './service/logger.service';
+import { NewLoggerService } from './service/new-logger.service';


@NgModule({
  declarations: [
    AppComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule
  ],
- providers: [LoggerService],
+ providers: [LoggerService, NewLoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
* What we want is that all application uses the new logger instead the old one. There is mechanism call `aliases` that allow us achieve this goal.

```diff app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonComponent } from './person.component';
import { LoggerService } from './service/logger.service';
import { NewLoggerService } from './service/new-logger.service';


@NgModule({
  declarations: [
    AppComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule
  ],
+ providers: [ {provide: LoggerService, useExisting: NewLoggerService}, NewLoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
* Remind that the API of both services is the same, it would be a good idea to define an interface to avoid errors.
* We don't have to change any kind of implementation using this `useExisting`.
* Why do not use `useClass` instead `useExisting`, that will work perfectly, but we will get to different instances for the same service!
