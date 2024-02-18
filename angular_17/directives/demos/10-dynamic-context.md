# Dynamic Context

We can feed the data context of the element that we're feeding into our structural directive. We're going to create our own `ngFor`

```bash
ng g d myFor --skip-tests
```

```ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[myFor][myForOf]',
  standalone: true,
})
export class MyForDirective {
  @Input()
  set myForOf(collection: any[]) {
    console.log(collection);
    this.view.clear();
    collection.forEach((item) => {
      this.view.createEmbeddedView(this.template, { $implicit: item });
    });
  }

  constructor(
    private view: ViewContainerRef,
    private template: TemplateRef<any>
  ) {}
}

```

- Update `app.component.ts`

```diff
# ....
+import { MyForDirective } from './my-for.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FirstDirective,
    BasicComponent,
    TrackDirective,
    OnlineDirective,
    ThreeDirective,
+   MyForDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
# ....
+  items = [
+   {
+     name: 'Foo'
+   }
+ ]
}
```

- Update `app.component.html`

```html
<h1 *three="message; message as mymessage">
  {{mymessage}}
</h1>
<!-- diff -->
<ul>
  <li *myFor="let item of items">
    {{ item.name }}
  </li>
</ul>
<!-- diff -->
```