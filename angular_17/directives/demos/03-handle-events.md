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
} from "@angular/core";

@Directive({
  selector: "[first]",
  standalone: true,
})
export class FirstDirective implements OnChanges {
  @Input() first!: string;
  @HostBinding() innerText = "";
  /*diff*/
  @HostListener("click") onClick() {
    console.log("click");
  }
  /*diff*/

  ngOnChanges(changes: SimpleChanges): void {
    this.innerText = changes["first"].currentValue;
  }
}
```

If we want to get the DOM event we can do it by updating the `@HostListener`

- Update `@HostListener`

```ts
export class FirstDirective implements OnChanges {
  @Input() first!: string;
  @HostBinding() innerText = "";

  /*diff*/
  @HostListener("click", ["$event"])
  onClick($event: Event) {
    console.log($event);
  }
  /*diff*/

  ngOnChanges(changes: SimpleChanges): void {
    this.innerText = changes["first"].currentValue;
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

## Exercise:

Instead of using `innerText` refactor the code to use `innerHtml`. The rendering of the directive must show, the following structure:

```html
<!-- angular template -->
<app-basic [first]="'Something'"></app-basic>
```

HTML rendered:

```html
<app-basic
  _ngcontent-ng-c2838339502=""
  _nghost-ng-c2780848130=""
  ng-reflect-first="Third"
>
  <p>Third</p>
</app-basic>
```

When the user clicks on `p` the result must be:

```html
<app-basic
  _ngcontent-ng-c2838339502=""
  _nghost-ng-c2780848130=""
  ng-reflect-first="Third"
>
  <p>Clicked</p>
</app-basic>
```

### Solution

```ts
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

@Directive({
  selector: "[first]",
  standalone: true,
})
export class FirstDirective implements OnChanges {
  @Input() first!: string;
  @HostBinding() innerHtml = "";

  constructor(private elementRef: ElementRef) {}

  @HostListener("click", ["$event"]) onClick($event: Event) {
    console.log($event);
    const p = this.elementRef.nativeElement.querySelector("p");
    p.innerText = "Foo";
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.innerHtml = `<p>${changes["first"].currentValue}</p>`;
  }
}
```
