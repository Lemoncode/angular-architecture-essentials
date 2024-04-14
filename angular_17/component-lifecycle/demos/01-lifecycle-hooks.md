# Lifecycle Hooks

```bash
ng g c child -s -t --skip-tests
```

Update `child`

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-child",
  standalone: true,
  imports: [],
  template: ` <p>I'm a child component, an this is my name: {{ myName }}</p> `,
  styles: ``,
})
export class ChildComponent {
  myName = "Foo";
}
```

```bash
ng g c lifecycle-hooks -s -t --skip-tests
```

Update `lifecycle-hooks`

```ts
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { ChildComponent } from "../child/child.component";

@Component({
  selector: "app-lifecycle-hooks",
  standalone: true,
  imports: [ChildComponent],
  template: `
    <h2>Lifecycle Hooks</h2>
    <app-child></app-child>
  `,
  styles: ``,
})
export class LifecycleHooksComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked
{
  innerState = 0;
  constructor() {
    setInterval(() => {
      this.innerState += 1;
    }, 3_000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.runningTime("ngOnChanges");
  }

  ngOnInit(): void {
    this.runningTime("ngOnInit");
  }

  ngDoCheck(): void {
    this.runningTime("ngDoCheck");
  }

  ngAfterContentInit(): void {
    this.runningTime("ngAfterContentInit");
  }

  ngAfterContentChecked(): void {
    this.runningTime("ngAfterContentChecked");
  }

  ngAfterViewInit(): void {
    this.runningTime("ngAfterViewInit");
  }

  ngAfterViewChecked(): void {
    this.runningTime("ngAfterViewChecked");
  }

  private runningTime(hook: string): void {
    console.log(`${hook}`, Date.now());
  }
}
```

Update `app.component.ts`

```diff
.....
+import { LifecycleHooksComponent } from './lifecycle-hooks/lifecycle-hooks.component';

@Component({
  selector: 'app-root',
  standalone: true,
- imports: [CommonModule, RouterOutlet],
+ imports: [CommonModule, RouterOutlet, LifecycleHooksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
}
```

Update `app.component.html`

```html
<app-lifecycle-hooks />
```

```bash
npm start
```

Open developer tools
