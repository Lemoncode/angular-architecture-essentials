# Handle Events in Angular Directives

We can listen to events using the decorator `@HostListener`

- Update `first.directive.ts`

```ts
import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[first]',
})
export class FirstDirective implements OnChanges {
  @Input() first!: string;
  @HostBinding() innerText = '';
  /*diff*/
  @HostListener('click') onClick() {
    console.log('click');
  }
  /*diff*/

  ngOnChanges(changes: SimpleChanges): void {
    this.innerText = changes['first'].currentValue;
  }
}

```

If we want to get the DOM event we can do it by updating the `@HostListener`

- Update `@HostListener`

```ts
export class FirstDirective implements OnChanges {
  @Input() first!: string;
  @HostBinding() innerText = '';

  /*diff*/
  @HostListener('click', ['$event']) 
  onClick($event: Event) {
    console.log($event);
  }
  /*diff*/

  ngOnChanges(changes: SimpleChanges): void {
    this.innerText = changes['first'].currentValue;
  }
}
```

We can use this events to update the inners in our directives:

```diff
@HostListener('click', ['$event']) 
onClick($event: Event) {
-   console.log($event);
+   this.innerText = 'clicked';
}
```
