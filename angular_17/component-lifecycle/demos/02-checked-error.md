# ExpressionChangedAfterItHasBeenCheckedError

Many developers even view it as a bug. But it’s certainly not. This is a cautionary mechanism put in place to prevent inconsistencies between model data and UI so that erroneous or old data are not shown to a user on the page.

## Relevant change detection operations

A running Angular application is a tree of components. During change detection Angular performs checks for each component which consists of the following operations performed in the specified order:

- update bound properties for all child components/directives
- call `ngOnInit`, `OnChanges` and `ngDoCheck` lifecycle hooks on all child components/directives
- update DOM for the current component
- run change detection for a child component
- call `ngAfterViewInit` lifecycle hook for all child components/directives

After each operation Angular remembers what values it used to perform an operation. They are stored in the `oldValues` property of the component view. After the checks have been done for all components Angular then starts the next [digest cycle](https://angularindepth.com/posts/1136/angulars-digest-is-reborn-in-the-newer-version-of-angular) but instead of performing the operations listed above it compares the current values with the ones it remembers from the previous digest cycle:

- check that values passed down to the child components are the same as the values that would be used to update properties of these components now
- check that values used to update the DOM elements are the same as the values that would be used to update these elements now
- perform the same checks for all child components

> Please note that this additional check is only performed in the development mode.

## Example

Update `child.component.ts`

```ts
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-child",
  standalone: true,
  imports: [],
  template: ` <p>I'm a child component, an this is my text: {{ text }}</p> `,
  styles: ``,
})
export class ChildComponent {
  @Input() text = "";
}
```

Create `parent.component`

```bash
ng g c parent -s -t --skip-tests
```

```ts
import { Component } from "@angular/core";
import { ChildComponent } from "../child/child.component";

@Component({
  selector: "app-parent",
  standalone: true,
  imports: [ChildComponent],
  template: `
    <span>{{ name }}</span>
    <app-child [text]="text"></app-child>
  `,
  styles: ``,
})
export class ParentComponent {
  name = "I am Parent component";
  text = "A message for child component";
}
```

Update `app.component.ts`

```diff
import { LifecycleHooksComponent } from './lifecycle-hooks/lifecycle-hooks.component';
+import { ParentComponent } from './parent/parent.component';

@Component({
  selector: 'app-root',
  standalone: true,
- imports: [CommonModule, RouterOutlet, LifecycleHooksComponent],
+ imports: [CommonModule, RouterOutlet, LifecycleHooksComponent, ParentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
}

```

Update `app.component.html`

```html
<app-parent />
```

The parent component has a `name` and `text` properties. In its template it uses the expression that references `name` property, and it also has `Child` component in its template and passes the `text` property through input property binding:

```ts
@Component({
  selector: "app-parent",
  standalone: true,
  imports: [ChildComponent],
  template: `
    <span>{{ name }}</span>
    <app-child [text]="text"></app-child>
  `,
  styles: ``,
})
export class ParentComponent {
  name = "I am Parent component";
  text = "A message for child component";
}
```

So here is what happens when Angular runs change detection. It starts by checking `Parent` component. The first operation in the list is to update bindings so it evaluates `text` expression to _A message for the child component_ and passes it down to the `Child` component.It also stores this value on the view:

```ts
view.oldValues[0] = "A message for the child component";
```

Then it calls the lifecycle hooks mentioned in the list.

Now, it performs the third operation and evaluates the expression `{{name}}` to the text _I am Parent component_. It updates the DOM with this value and puts the evaluated value to the `oldValues`:

```ts
view.oldValues[1] = "I am Parent component";
```

Then Angular performs the next operation and runs the same check for the child `Child` component. Once the `Child` component is checked **the current digest loop is finished**.

> If Angular is running in the development mode it then runs the second digest performing verification operations I listed above.

Now imagine that somehow the property `text` was updated on the `Parent` component to the _updated text_ after Angular passed the value _A message for the child component_ to the `Child` component and stored it. So it now runs the verification digest and the first operation is to check that the property `text` is not changed:

```ts
AComponentView.instance.text === view.oldValues[0]; // false
"A message for the child component" === "updated text"; // false
```

Yet it has and so Angular throws the error `ExpressionChangedAfterItHasBeenCheckedError`.

The same holds for the third operation. If the name property was updated after it was rendered in the DOM and stored we’ll get the same error:

```ts
AComponentView.instance.name === view.oldValues[1]; // false
"I am A component" === "updated name"; // false
```

## Causes of values change

> The culprit is always the child component or a directive.

Update `parent.component.ts`

```diff
@Component({
  selector: 'app-parent',
  standalone: true,
- imports: [ChildComponent],
+ imports: [forwardRef(() => ChildComponent)],
  template: `
    <span>{{ name }}</span>
    <app-child [text]="text"></app-child>
  `,
  styles: ``,
})
export class ParentComponent {
  name = 'I am Parent component';
  text = 'A message for child component';
}

```

Update `child.component.ts`

```ts
import { Component, Input, OnInit, forwardRef } from "@angular/core";
/*diff*/
import { ParentComponent } from "../parent/parent.component";
/*diff*/

@Component({
  selector: "app-child",
  standalone: true,
  /*diff*/
  imports: [ParentComponent],
  /*diff*/
  template: ` <p>I'm a child component, an this is my text: {{ text }}</p> `,
  styles: ``,
})
export class ChildComponent implements OnInit {
  @Input() text = "";
  /*diff*/
  constructor(private parent: ParentComponent) {}

  ngOnInit(): void {
    this.parent.text = "updated text";
  }
  /*diff*/
}
```

And as expected we get the error:

```
Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'A message for the child component'. Current value: 'updated text'.
```

Now, let’s do the same for the property `name` that is used in the template expression of the parent `Parent` component, but this time in `AfterViewInit`:

Update `child.component`

```diff
-export class ChildComponent implements OnInit {
+export class ChildComponent implements OnInit, AfterViewInit {
  @Input() text = '';

  constructor(private parent: ParentComponent) {}

  ngOnInit(): void {
    this.parent.text = 'updated text';
  }
+
+ ngAfterViewInit(): void {
+   this.parent.name = 'updated name';
+ }
}
```

```
ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'I am Parent component'. Current value: 'updated name'.
```

## Fixes

### Asynchronous update

One thing to notice here is that both change detection and verification digests are performed synchronously.It means that if we update properties asynchronously the values will not be updated when the verification loop is running and we should get no error. 

```ts
export class ChildComponent implements OnInit, AfterViewInit {
  @Input() text = "";

  constructor(private parent: ParentComponent) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.parent.text = "updated text";
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.parent.name = "updated name";
    });
  }
}
```

### Forcing change detection

The other possible solution is to force another change detection cycle for the parent A component between the first one and the verification phase. And the best place to do it is inside the ngAfterViewInit lifecycle hook as it’s triggered when change detection for all child components have been performed and so they all had possibility to update parent components property:

Update `child.component`

```ts
export class ChildComponent implements OnInit, AfterViewInit {
  @Input() text = '';

  constructor(private parent: ParentComponent) {}

  ngOnInit(): void {
    this.parent.text = 'updated text';
  }

  ngAfterViewInit(): void {
    this.parent.name = 'updated name';
  }
}

```

Update `parent.component`

```ts
export class ParentComponent implements AfterViewInit {
  name = 'I am Parent component';
  text = 'A message for child component';

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }
}
```

## References

- https://angularindepth.com/posts/1053/everything-you-need-to-know-about-change-detection-in-angular
- https://angularindepth.com/posts/1510/rendering-cycle-in-angular-applications-browser-angular-and-zone-js-interaction
- https://angularindepth.com/posts/1136/angulars-digest-is-reborn-in-the-newer-version-of-angular

> TODO: Use this [article](https://angularindepth.com/posts/1001/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error) for demo
> TODO: Use this [video](https://angular.dev/errors/NG0100)
