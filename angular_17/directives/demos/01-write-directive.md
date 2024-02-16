```bash
ng g d first --skip-tests
```

- Update `app.component.html`

```html
<h1>Hello, Angular</h1>
```

- Update `./app/first.directive.ts`

```ts
import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'h1'
})
export class FirstDirective {
  @HostBinding() innerText = `I'm a directive`;
}

```

```bash
npm start
```

We're using tag selector, we usually use attribute selector

- Update `./app/first.directive.ts`

```diff
@Directive({
- selector: 'h1'
+ selector: '[first]'
})
```

- Update `app.component.html`

```html
<h1 first>Hello, Angular</h1>
<h2>No first here</h2>
<h3 first>This will be gone</h3>

```
