# Write a Structural Directive in Angular

Structural directives relies on `ng-template`. Lets create a structural directive.

```bash
ng g d three --skip-tests
```

- Update `three.directive.ts`

```ts
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[three]'
})
export class ThreeDirective {

  constructor(el: ElementRef) { 
    console.log(el.nativeElement);
  }
}

```

- Update `app.component.html`

```html
<h1 three>Hello World!</h1>
```

```bash
npm start
```

We can check now on browser's console that we're getting the `h1` element. 

- Update `app.component.html`

```diff
-<h1 three>Hello World!</h1>
+<h1 *three>Hello World!</h1>
```

We can check that nothing is rendered, and if we have a look into the console using the dev tools, we can check that we have a message like `<!--container-->`. What is happening is that we have something like this:

- Update `app.component.html`

```html
<ng-template three>
    <h1>Hello World!</h1>
</ng-template>
```

The `*` is the short hand to wrapping and element inside `ng-template`.

- Update `app.component.html`

```html
<h1 *three>Hello World!</h1>
```

This is going to allow us to use this node inside our directive.

- Update `three.directive.ts`

```ts
import {
  Directive,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  AfterViewInit
} from '@angular/core';

@Directive({
  selector: '[three]',
})
export class ThreeDirective implements AfterViewInit {
  constructor(
    el: ElementRef,
    private view: ViewContainerRef,
    private template: TemplateRef<any>
  ) {
    console.log(el.nativeElement);
  }

  ngAfterViewInit(): void {
    this.view.createEmbeddedView(this.template);
    this.view.createEmbeddedView(this.template);
    this.view.createEmbeddedView(this.template);
  }
}

```
