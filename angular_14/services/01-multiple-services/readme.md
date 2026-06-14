# Multiple services instances

- Recap:
  - If we change the name both components reflects the change. They're already in sync.
  - The reason for that is because when we register our service into the app module is globally seen in the application and it's a single instance.
  - What if I want a different behavior for this child component and all its component descendents?

This can be easily achieve by providing in child component the PersonService

**src/app/child.component.ts**

```diff
import { Component, OnInit } from '@angular/core';
import { PersonService } from './person.service';

@Component({
  selector: 'app-child',
  template: `
    <h4>
      child component
    </h4>
-   <pre>{{ personService.getPerson() | json }}</pre>
+   <app-person-edit></app-person-edit>
  `,
  styles: [],
+ providers: [PersonService]
})
export class ChildComponent implements OnInit {
  constructor(public personService: PeorsonService) { }

  ngOnInit() {
  }
}

```

- Now when we introduce a new name is only reflected into the main component and not into its children.

- This is because when the component requires the service first of all will look in its own injector.

- If we change the name in children component edit it will reflect only changes into children component. This means that this services is bound to the children comnponent subtree.

What will happen if we remove the children subtree?

**src/app/app.component.ts**

```diff app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Services<h1>
    <h3>App component</h3>
    <app-person-edit></app-person-edit>

-   <app-child></app-child>
+   <button (click)="childVisible = !childVisible">Toggle</button>
+   <app-child *ngIf="childVisible"></app-child>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
+ childVisible = true;
}

```

- If we set a name into the children input obviously will still working but when we toggle visibility and toggle again to watch children again the lat set value will get lost.
- This is because when we destroy the instance and get a new instance we get as well a fresh instance of service.
