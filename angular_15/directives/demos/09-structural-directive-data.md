# Implement Structural Directive Data Binding with Context in Angular

A structural directive like ngFor let us to pass data. If we declare our directive as follows:

```html
<h1 *three="let message">{{message}}</h1>
```

It's the "same" as if we were declaring something like this:

```html
<ng-template let-message></ng-template>
```

- Update `app.component.ts`

```diff
export class AppComponent {
+ message = 'Hola';
  # ....
}
```

- Update `app.component.html`

```html
<h1 *three="message; message as mymessage">
  {{mymessage}}
</h1>
```

- Update `three.directive.ts`

```ts
import {
  Directive,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  Input,
} from '@angular/core';

@Directive({
  selector: '[three]',
})
export class ThreeDirective {
  private readonly context = { message: '' };

  @Input('three') set three(value: any) {
    console.log(value);
    this.context.message = value;
    const ref = this.view.createEmbeddedView(this.template, this.context);
    console.log(ref);
  }

  constructor(
    el: ElementRef,
    private view: ViewContainerRef,
    private template: TemplateRef<any>
  ) {
    console.log(el.nativeElement);
  }
}

```
