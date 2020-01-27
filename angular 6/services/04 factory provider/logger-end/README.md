# Logger

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

* Imagine that our logger service is more complecated than this:

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

* And has a configuration like this:

``` typescript
import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {

  constructor(private isEnabled: boolean) { }

  log(msg: string) {
    if (this.isEnabled) {
      console.log(`Logger: ${msg}`);
    }
  }
}

```
* Depending on feeding parameters we are enabling or not the service.
* With actual configuration it will comply because no one is injecting the dependecy on constructor

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonComponent } from './person.component';
import { LoggerService } from './service/logger.service';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

* This is a perfect place to use the factory function

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonComponent } from './person.component';
import { LoggerService } from './service/logger.service';

const loggerFactory = () => {
  return new LoggerService(true);
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
    { provide: LoggerService, useFactory: loggerFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
* Now we have full control on the initialization of how the object has been created.
* The variable obviously can came from an enviroment configuration.

* Now lets imagine that our situation it's a little more complecated. Lets say that we have a dependency with another service:

```bash
ng g s service/writer --spec false
```

```typescript
import { Injectable } from '@angular/core';

@Injectable()
export class WriterService {
  write(msg: string) {
    console.log(msg);
  }
}

```

* Regitser into the app.module

```diff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonComponent } from './person.component';
import { LoggerService } from './service/logger.service';
+import { WriterService } from './service/writer.service';

const loggerFactory = () => {
  return new LoggerService(true);
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
+   WriterService,
    { provide: LoggerService, useFactory: loggerFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
* Now lets assume that our logger service is using the writer service

```diff logger.service.ts
import { Injectable } from '@angular/core';
+import { WriterService } from './writer.service';


@Injectable()
export class LoggerService {

- constructor(private isEnabled: boolean) { }
+ constructor(private isEnabled: boolean, private writer: WriterService) { }

  log(msg: string) {
    if (this.isEnabled) {
-     console.log(`Logger: ${msg}`);
+     this.writer.write(msg);
    }
  }
}

```
* We have to extend our factory function because it takes more than just the boolean property.
* We can do something like instante the object into the factory, but again we want to get that from the DI mechanism.

```typescript
const loggerFactory = () => {
  return new LoggerService(true, new WriterService());
};
```

* In order to pass that dependency we feed as paramter to the function and then use `deps` in provider.

```typescript app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    { provide: LoggerService, useFactory: loggerFactory, deps: [WriterService] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

* What Angular does it's get the array of arguments and pass to the factory function. It can be more than one it's an array.
