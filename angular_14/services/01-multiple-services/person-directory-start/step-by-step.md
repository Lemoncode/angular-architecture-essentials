# Step by Step

## 1. Create `person.service`

```bash
npx ng g s person --skip-tests
```

```ts
import { Injectable } from '@angular/core';

@Injectable()
export class PersonService {
  name = 'Jai';

  getPerson() {
    return {
      name: this.name,
      age: 39,
    };
  }

  setPersonName(value: string) {
    this.name = value;
  }
}

```

Update `app.module.ts`

```diff
....
+import { PersonService } from './person.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
- providers: [],
+ providers: [PersonService],
  bootstrap: [AppComponent]
})
```

## 2. Create `child` component

```bash
npx ng g c child --skip-tests --inline-template --inline-style --flat
```

```ts
import { Component, OnInit } from '@angular/core';
import { PersonService } from './person.service';

@Component({
  selector: 'app-child',
  template: `
    <h4>
      child component
    </h4>
    <pre>{{ personService.getPerson() | json }}</pre>
  `,
  styles: [
  ]
})
export class ChildComponent implements OnInit {

  constructor(public personService: PersonService) { }

  ngOnInit(): void {
  }

}

```

## 3. Create `person-edit` component

```bash
npx ng g c person-edit --skip-tests --inline-template --inline-style --flat
```

```ts
import { Component, OnInit } from '@angular/core';
import { PersonService } from './person.service';

@Component({
  selector: 'app-child',
  template: `
    <pre>
      {{ personService.getPerson() | json }}
    </pre>
    <br />
    <input type="text" #personName />
    <button (click)="setPerson(personName.value)">save</button>
  `,
  styles: [
  ]
})
export class ChildComponent implements OnInit {

  constructor(public personService: PersonService) { }

  ngOnInit(): void {
  }

  setPerson(value: string) {
    this.personService.setPersonName(value);
  }
}

```

## 4. Update `app.component.ts`

```bash
rm src/app/app.component.css
rm src/app/app.component.html
rm src/app/app.component.spec.ts
```

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Services<h1>
    <h3>App component</h3>
    <app-person-edit></app-person-edit>

    <app-child></app-child>
  `,
})
export class AppComponent {}

```