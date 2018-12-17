# PersonDirectory

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

* Angular has dependency herarchical injection, in result if we go to __person-component__, in order to resolve the depndency ity will go walk up the component tree, first start by the component metadata itself, in this case will not find such provider for this particular service, that means that will go to the next level, in this case __app-component__, here there isn't as well a provider for this service so it get to the top level where is really define it.

```typescript app.module
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

```
* If we run the application we will find out that the printed prefix will be 'AppModule'
* Notice that in our component __person-component__ we're handling, that the injected service was not define.

```typescript person.component.ts
import { Component, OnInit } from '@angular/core';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-person',
  template: `
    <div style="border:1px;">
      <p *ngIf="logger === null">No logger</p>
      <button (click)="doLog()">write log</button>
    </div>
  `,
})
export class PersonComponent implements OnInit {

  constructor(public logger: LoggerService) { }

  ngOnInit() {}

  doLog() {
    if (this.logger) {
      this.logger.log('Message from person component');
    } else {
      console.log('no logger available');
    }
  }

}

```

* What will happen if we remove the root providers? We will get an error that no provider has been define, but we're prepare in our component for such situation, what we can do?

```diff app.module.ts
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
-    {
-      provide: LoggerService,
-      useFactory: loggerFactory('AppModule'),
-    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
* We can use a decorator to mark this service as optional.

```diff person.component.ts
-import { Component, OnInit } from '@angular/core';
+import { Component, OnInit, Optional } from '@angular/core';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-person',
  template: `
    <div style="border:1px;">
      <p *ngIf="logger === null">No logger</p>
      <button (click)="doLog()">write log</button>
    </div>
  `,
})
export class PersonComponent implements OnInit {

- constructor(public logger: LoggerService) { }
+ constructor(@Optional() public logger: LoggerService) { }

  ngOnInit() {}

  doLog() {
    if (this.logger) {
      this.logger.log('Message from person component');
    } else {
      console.log('no logger available');
    }
  }

}

```
* What `@Optional` does is push null value whenever the requested service is not registered.
* Now if we run the app we will get a different message.

* We have said that the DI is hirerchical so lets define the provider at __app-component__

```diff app.componet.ts
import { Component } from '@angular/core';
+import { LoggerService, loggerFactory } from './logger.service';

@Component({
  selector: 'app-root',
  template: `
    <h2>
      Logger service
    </h2>
    <app-person></app-person>
  `,
+  providers: [
+    {
+      provide: LoggerService,
+      useFactory: loggerFactory('AppComponent'),
+    }
+  ]
})
export class AppComponent {}

```
* And do the same at __person-componet__

```diff person.component.ts
import { Component, OnInit, Optional } from '@angular/core';
-import { LoggerService } from './logger.service';
+import { LoggerService, loggerFactory } from './logger.service';

@Component({
  selector: 'app-person',
  template: `
    <div style="border:1px;">
      <p *ngIf="logger === null">No logger</p>
      <button (click)="doLog()">write log</button>
    </div>
  `,
+ providers: [
+    {
+      provide: LoggerService,
+      useFactory: loggerFactory('PersonComponent'),
+    }
+ ]
})
export class PersonComponent implements OnInit {
  constructor(@Optional() public logger: LoggerService) { }

  ngOnInit() {}

  doLog() {
    if (this.logger) {
      this.logger.log('Message from person component');
    } else {
      console.log('no logger available');
    }
  }

}

```
* Now if we click in our application button Angular will provide the first service in the hierarchy in this case __person-component__, the host itself, if we don't wnat this behavior we can use `@SkipSelf()` decorator that will jump in chain the host.

```diff
-import { Component, OnInit, Optional } from '@angular/core';
+import { Component, OnInit, Optional, SkipSelf } from '@angular/core';
import { LoggerService, loggerFactory } from './logger.service';

@Component({
  selector: 'app-person',
  template: `
    <div style="border:1px;">
      <p *ngIf="logger === null">No logger</p>
      <button (click)="doLog()">write log</button>
    </div>
  `,
  providers: [
     {
       provide: LoggerService,
       useFactory: loggerFactory('PersonComponent'),
     }
  ]
})
export class PersonComponent implements OnInit {
+ constructor(@SkipSelf() @Optional() public logger: LoggerService) { }
- constructor(@Optional() public logger: LoggerService) { }

  ngOnInit() {}

  doLog() {
    if (this.logger) {
      this.logger.log('Message from person component');
    } else {
      console.log('no logger available');
    }
  }

}

```
* We can make as well that only look at the host component using `@Host()` decorator instead `@SkipSelf()`

```diff person.component.ts
-import { Component, OnInit, Optional, SkipSelf } from '@angular/core';
+import { Component, OnInit, Optional, SkipSelf, Host } from '@angular/core';
import { LoggerService, loggerFactory } from './logger.service';

@Component({
  selector: 'app-person',
  template: `
    <div style="border:1px;">
      <p *ngIf="logger === null">No logger</p>
      <button (click)="doLog()">write log</button>
    </div>
  `,
  providers: [
     {
       provide: LoggerService,
       useFactory: loggerFactory('PersonComponent'),
     }
  ]
})
export class PersonComponent implements OnInit {
-constructor(@SkipSelf() @Optional() public logger: LoggerService) { }
+constructor(@Host() @Optional() public logger: LoggerService) { }

  ngOnInit() {}

  doLog() {
    if (this.logger) {
      this.logger.log('Message from person component');
    } else {
      console.log('no logger available');
    }
  }

}

```
