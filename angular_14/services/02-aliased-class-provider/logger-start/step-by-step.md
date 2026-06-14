# Step by Step

## 1. Create `logger` service

```bash
npx ng g s service/logger --skip-tests
```

```ts
import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  constructor() {}

  log(msg: string) {
    console.log(`logger: ${msg}`);
  }
}
```

Update `app.module.ts`

```diff
....
+import { LoggerService } from './service/logger.service';

@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    PersonEditComponent
  ],
  imports: [
    BrowserModule
  ],
- providers: [PersonService],
+ providers: [PersonService, LoggerService],
  bootstrap: [AppComponent]
})
```

## 2. Create `person` component

```bash
npx ng g c person --inline-template --inline-style --skip-tests  --flat
```

```ts
import { Component, OnInit } from '@angular/core';
import { LoggerService } from './service/logger.service';

@Component({
  selector: 'app-person',
  template: `
    <div>person works!</div>
    <button (click)="doLog()">Log to console</button>
  `,
  styles: [],
})
export class PersonComponent implements OnInit {
  constructor(private logger: LoggerService) {}

  ngOnInit(): void {}

  doLog() {
    this.logger.log('Message from component');
  }
}
```

## 3. Update `app.component.ts`

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-person></app-person>
  `,
})
export class AppComponent {}
```