# Use Template Elements in Angular

In Angular we can declare a `template` and this template by default is not rendered:

- Update `./app/basic/basic.component.ts`

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-basic',
  template: `
    <ng-template>
     This is content inside a template
    </ng-template>
  `,
  styles: [
  ]
})
export class BasicComponent {}

```

- Update `app.component.html`

```html
<app-basic></app-basic>

```

```bash
npm start
```

We can check that nothing is rendered on browser. We can grab a reference to this template and use it inside the component.

- Update `./app/basic/basic.component.ts`

```ts
import {
  Component,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-basic',
  standalone: true,
  imports: [],
  template: ` <ng-template #foo> This is content inside a template </ng-template> `,
  styles: [],
})
export class BasicComponent implements AfterViewInit {
  @ViewChild('foo') template!: any;
  constructor(private view: ViewContainerRef) {}

  ngAfterViewInit(): void {
    this.view.createEmbeddedView(this.template);
  }
}

```

We can use it, as many times as we want:

```diff
ngAfterViewInit(): void {
    this.view.createEmbeddedView(this.template);
+   this.view.createEmbeddedView(this.template);
+   this.view.createEmbeddedView(this.template);
}
```
