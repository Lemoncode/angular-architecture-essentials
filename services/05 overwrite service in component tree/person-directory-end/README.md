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


* How we can scope a service to a particular component subtree? And basically how we can overwrite it.
* Lets create a new component `female`

```bash
ng g c female --is --it --flat --spec false
```

* This female component is very similar to  person.component.ts

```typescript female.component.ts
import { Component, OnInit } from '@angular/core';
import { PeopleService } from './people.service';

@Component({
  selector: 'app-female',
  template: `
    <h3>
      female
    </h3>
    <pre>{{ person | json }}</pre>
  `,
  styles: []
})
export class FemaleComponent implements OnInit {
  person;

  constructor(private people: PeopleService) { }

  ngOnInit() {
    this.person = this.people.getPerson();
  }

}

```
* Lets go back to the app component, and render this new component.

```diff app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Services</h1>
    <h3>App component</h3>
    <app-person></app-person>
+   <app-female></app-female>
  `
})
export class AppComponent {}

```
* If we run our application right now we will see that both components are didplaying the same data, both are getting access to the same service.

* Lets now generate a new service female service

```bash
ng g s female --spec false -m=app
```

```typescript female.service.ts
import { Injectable } from '@angular/core';
import { PeopleService } from './people.service';

@Injectable()
export class FemaleService extends PeopleService {
  getPerson() {
    const person = super.getPerson();
    person.name = 'lau';
    person.gender = 'F';
    return person;
  }
}

```
* Javascript complains because new property gender the easiest way to solve this is go ahead and rturn any from parent service __people-service__

```diff people.service.ts
import { Injectable } from '@angular/core';

@Injectable()
export class PeopleService {
  name = 'J'
- getPerson() {
+ getPerson(): any {
    return {
      name: this.name,
      age: 38,
    }
  }
}

```
* The people service is register into our module. Lets register globally as well the female service.

```diff app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonComponent } from './person.component';
import { PeopleService } from './people.service';
+import { FemaleService } from './female.service';
import { FemaleComponent } from './female.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    FemaleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    PeopleService,
+   FemaleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
* Lets register the female service at the component level instead of the module level.

```diff female.component.ts 
import { Component, OnInit } from '@angular/core';
import { PeopleService } from './people.service';
import { FemaleService } from './female.service';

@Component({
  selector: 'app-female',
  template: `
    <h3>
      female
    </h3>
    <pre>{{ person | json }}</pre>
  `,
  styles: [],
+ providers: [
+   { provide: PeopleService, useClass: FemaleService }
+ ]
})
export class FemaleComponent implements OnInit {
  person;

  constructor(private people: PeopleService) { }

  ngOnInit() {
    this.person = this.people.getPerson();
  }

}

```

* If we run this we will notice that we get an object that comes from __female-service__ instead __people-service__ 

* What will happen if we get the __app-person__ component, and added to the female component? Remind that female component is getting an instance of __female-service__ and person component is reciving a __people-service__ 

```diff female.component.ts
import { Component, OnInit } from '@angular/core';
import { PeopleService } from './people.service';
import { FemaleService } from './female.service';

@Component({
  selector: 'app-female',
  template: `
    <h3>
      female
    </h3>
    <pre>{{ person | json }}</pre>

+   <app-person></app-person>
  `,
  styles: [],
  providers: [
    { provide: PeopleService, useClass: FemaleService }
  ]
})
export class FemaleComponent implements OnInit {
  person;

  constructor(private people: PeopleService) { }

  ngOnInit() {
    this.person = this.people.getPerson();
  }

}

```
* We can check out that in this case both components are reciving the same service, and this is because the hierarchical nature of angular injectors.

<pre>

  <app-root> (M) >> PeopleService
    -<app-person>
    -<app-female> >> PeopleService -> WomanService
      -<app-person>
      
</pre>
