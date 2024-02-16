# Overwrite services in component tree

- How can we scope a service to a particular component subtree? And basically how can we overwrite it?
- Lets create a new component `female`

```bash
ng g c female -s -t --flat --skip-tests
```

- This female component is very similar to person.component.ts

**src/app/female.component.ts**

```typescript female.component.ts
import { Component, OnInit } from "@angular/core";
import { PeopleService } from "./people.service";

@Component({
  selector: "app-female",
  template: `
    <h3>female</h3>
    <pre>{{ person | json }}</pre>
  `,
  styles: [],
})
export class FemaleComponent implements OnInit {
  person: any;

  constructor(private people: PeopleService) {}

  ngOnInit() {
    this.person = this.people.getPerson();
  }
}
```

- Lets go back to the app component, and render this new component.

**src/app/app.component.ts**

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

- If we run our application right now we will see that both components are displaying the same data, both are getting access to the same service.

- Lets now generate a new service female service

```bash
ng g s female --skip-tests
```

**src/app/female.service.ts**

```typescript female.service.ts
import { Injectable } from "@angular/core";
import { PeopleService } from "./people.service";

@Injectable()
export class FemaleService extends PeopleService {
  override getPerson(): { name: string; age: number; } {
    const person = super.getPerson();
    person.name = "lau";
    (person as any).gender = "F";
    return person;
  }
}
```

- The people service is registered into our app module. Let's register globally as well the female service.

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

- Let's register the female service at the component level instead of the module level.

**src/app/female.component.ts**

```diff female.component.ts
import { Component, OnInit } from '@angular/core';
+import { PeopleService } from './people.service';
+import { FemaleService } from './female.service';

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

- If we run this we will notice that we get an object that comes from **female-service** instead **people-service**

- What will happen if we get the **app-person** component, and add it to the female component? Remind that female component is getting an instance of **female-service** and person component is reciving a **people-service**

**src/app/female.component.ts**

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

- We can check out that in this case both components are reciving the same service, and this is because the hierarchical nature of angular injectors.

<pre>

  <app-root> (M) >> PeopleService
    -<app-person>
    -<app-female> >> PeopleService -> FemaleService
      -<app-person>
      
</pre>
