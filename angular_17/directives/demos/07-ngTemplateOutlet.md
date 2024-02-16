# Create Elements from Template Elements with ngTemplateOutlet in Angular

You can create an `ng-template` and use it as outlet in another element.

- Update `app.component.html`

```html
<ng-template>
    <h1>I'm a template</h1>
</ng-template>

<div></div>

```

If we run see we're not going to see nothing, because `ng-template` isn't rendered. But if we use a ref to the template we get the template rendered.

- Update `app.component.html`

```html
<ng-template #foo>
    <h1>I'm a template</h1>
</ng-template>

<div [ngTemplateOutlet]="foo"></div>

```

We can have multiple of these.

- Update `app.component.html`

```html
<ng-template #foo>
    <h1>I'm a template</h1>
</ng-template>

<ng-template #bar>
    <h1>I'm another template</h1>
</ng-template>

<div [ngTemplateOutlet]="foo"></div>
<div [ngTemplateOutlet]="bar"></div>
<div [ngTemplateOutlet]="foo"></div>
<div [ngTemplateOutlet]="bar"></div>
```

If you want to pass data to those templates, we pass the data using something that is called `context`.

- Update `app.component.html`

```html
<ng-template #foo let-message="message">
  <h1>{{message}}</h1>
</ng-template>

<div
  [ngTemplateOutlet]="foo"
  [ngTemplateOutletContext]="{ message: 'Hello Context' }"
></div>
```

Notice that inside the template, we are using what is asigned to `let-message`, we can change the name of the variable, and this will still working:

- Update `app.component.html`

```diff
-<ng-template #foo let-message="message">
+<ng-template #foo let-whatever="message">
- <h1>{{message}}</h1>
+ <h1>{{whatever}}</h1>
</ng-template>

<div
  [ngTemplateOutlet]="foo"
  [ngTemplateOutletContext]="{ message: 'Hello Context' }"
></div>
```

We can also bind the context into a property inside the container:

- Update `app.component.ts`

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  one = {message: 'Hello one'};
  two = {message: 'Hello two'};
  three = {message: 'Hello three'};
}
```

- Update `app.component.html`

```html
<ng-template #foo let-message="message">
  <h1>{{message}}</h1>
</ng-template>

<div
  [ngTemplateOutlet]="foo"
  [ngTemplateOutletContext]="one"
></div>
<div
  [ngTemplateOutlet]="foo"
  [ngTemplateOutletContext]="two"
></div>
<div
  [ngTemplateOutlet]="foo"
  [ngTemplateOutletContext]="three"
></div>

```
