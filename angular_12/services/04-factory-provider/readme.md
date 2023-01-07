# Factory Provider

* Imagine that our logger service is more complicated than this:

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


__src/app/service/logger.service.ts__

``` typescript
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class LoggerService {
  /*diff*/
  constructor(@Inject(Boolean) private isEnabled: boolean) { }
  /*diff*/

  log(msg: string) {
    /*diff*/
    if (this.isEnabled) {
      console.log(`Logger: ${msg}`);
    }
    /*diff*/
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

* If we run the application will crash because of this. - *error NG2003: No suitable injection token for parameter 'isEnabled' of class 'LoggerService'.*

* This is a perfect place to use the factory function

__src/app/app.module.ts__

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonComponent } from './person.component';
import { LoggerService } from './service/logger.service';

/*diff*/
const loggerFactory = () => {
  return new LoggerService(true);
};
/*diff*/

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    { provide: LoggerService, useFactory: loggerFactory } /*diff*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
* Now we have full control on the initialization of how the object has been created.
* The variable obviously can came from an enviroment configuration.
* Now lets imagine that our situation it's a little more complicated. Lets say that we have a dependency with another service:

```bash
ng g s service/writer --skip-tests
```

__src/app/service/writer.service.ts__

```typescript
import { Injectable } from '@angular/core';

@Injectable()
export class WriterService {
  write(msg: string) {
    console.log(msg);
  }
}

```

* Register into the app.module

__src/app/app.module.ts__

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

__src/app/service/logger.service.ts__

```diff 
# logger.service.ts
import { Injectable } from '@angular/core';
+import { WriterService } from './writer.service';


@Injectable()
export class LoggerService {

- constructor(private isEnabled: boolean) { }
+ constructor(@Inject(Boolean) private isEnabled: boolean, private writer: WriterService) { }

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

__src/app/app.module.ts__

```typescript app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonComponent } from './person.component';
import { LoggerService } from './service/logger.service';
import { WriterService } from './service/writer.service';

/*diff*/
const loggerFactory = (writer: WriterService) => {
  return new LoggerService(true, writer); /*diff*/
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
