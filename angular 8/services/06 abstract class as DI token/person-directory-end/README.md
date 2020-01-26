# Abstract class as DI token

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

__src\app\people.service.ts__

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

__src\app\app.module.ts__

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
