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

* If we don't have any depndency we don't have to provide the `Injectable` decorator.
* This is only needed if there are dependencies with other services.
* The best practices told us to use it always on services.
* By providing this decorator we're telling angular that inspect an resolves the dependency.

```typescript people.service.ts
import { Injectable } from "@angular/core";

@Injectable()
export class PeopleService {
  getPeople() {
    return [
      {
        name: 'Jai',
      },
      {
        name: 'Lau',
      },
    ]
  }
}
```

```typescript app.component.ts
import { Component } from '@angular/core';
import { PeopleService } from './people.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>People<h1>
    <pre>{{ people | json }}<pre>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  people;
  constructor() {
    const peopleService = new PeopleService();
    this.people = peopleService.getPeople();
  }
}

```

* The services ar just classes that we can instantiate.
* The matter is that is not so simple the services will have its own dependencies an this is the kind of work that you want to delegate to DI mechanism

```typescript people.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleService } from './people.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    PeopleService
  ],
  declarations: []
})
export class PeopleModule { }

```
* Declaring the services into a providers module, we are registering the service into DI mechanism.
* Now we can inject that service into the app component, Angular will ensure to inject that service in runtime.

```typescript app.componet.ts
import { Component } from '@angular/core';
import { PeopleService } from './people/people.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>People<h1>
    <pre>{{ people | json }}<pre>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  people;
  constructor(private peopleService: PeopleService) {
    this.people = this.peopleService.getPeople();
  }
}

```
* This is the shorcut way of doing this:

```typescript people.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleService } from './people.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    // PeopleService
    {
      provide: PeopleService,
      useClass: PeopleService
    }
  ],
  declarations: []
})
export class PeopleModule { }

```
* Now because we have imported the people.module in the main module this service it's going to be see globally.

```typescript contact-list.component.ts
import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../people/people.service';

@Component({
  selector: 'app-contact-list',
  template: `
    <p>
      contact-list works!
    </p>
  `,
  styles: []
})
export class ContactListComponent implements OnInit {

  constructor(private peopleService: PeopleService) {
    console.log(this.peopleService.getPeople());
  }

  ngOnInit() {
  }

}

```
* Now if we use the component in app component we will see that prinst in conosole the people. Bear on mind that the contact-list component must be exported in order that other modules can use it.

```typescript app.component.ts
import { Component } from '@angular/core';
import { PeopleService } from './people/people.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>People<h1>
    <pre>{{ people | json }}<pre>
    <app-contact-list></app-contact-list>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  people;
  constructor(private peopleService: PeopleService) {
    this.people = this.peopleService.getPeople();
  }
}

```
* We can now watch that the people array is printed into console.
