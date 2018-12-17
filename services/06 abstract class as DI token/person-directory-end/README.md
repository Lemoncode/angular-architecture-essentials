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

* Lets asume that we have a service that is use through out our application and with different kind of implementations. In the case of people service an implementation for male people another one for female people...

* In this case we will want to generalize the DI of the people-service more, basically have a base class from the other implementations inherit.

```typescript people.service.ts
import { Injectable } from '@angular/core';

@Injectable()
export class PeopleService {
  people = [
    { name: 'A' },
    { name: 'B' }
  ];

  getPeople() {
    return this.people;
  }
}

```

* The first thing that we can think about it is to use an interface

```diff people.service.ts
import { Injectable } from '@angular/core';

+export interface PeopleService {
+  getPeople();
+}

@Injectable()
-export class PeopleService {
+export class AwesomePeopleService implements PeopleService {
  people = [
    { name: 'A' },
    { name: 'B' }
  ];

  getPeople() {
    return this.people;
  }
}

```
* The next step is go to the app module, and import the new created service.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PeopleService, AwesomePeopleService } from './people.service';
import { PeopleListComponent } from './people-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PeopleListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{
    provide: PeopleService,
    useClass: AwesomePeopleService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
* This will prompt a TS error that provide expecs a value and it's getting a type. This is because interfaces in TS don't transpile to anything, they only got sense on typing time.

* What we can do is define a class instead an interface.

```diff people.service.ts
import { Injectable } from '@angular/core';

-export interface PeopleService {
-  getPeople();
-}
+export abstract class PeopleService {
+  abstract getPeople();
+}

@Injectable()
-export class AwesomePeopleService implements PeopleService {
+export class AwesomePeopleService extends PeopleService {
  people = [
    { name: 'A' },
    { name: 'B' }
  ];

  getPeople() {
    return this.people;
  }
}

```

* Now the TS compiler will be happy.
