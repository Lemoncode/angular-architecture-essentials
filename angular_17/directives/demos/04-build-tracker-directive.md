# Build a Directive that Tracks User Events in a Service in Angular

```bash
ng g d track --skip-tests
```

- Update `track.directive.ts`

```ts
import { Directive, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[track]",
  standalone: true,
})
export class TrackDirective {
  @Input() track!: string;

  @HostListener("click")
  onClick() {
    console.log(this.track);
  }
}
```

- Update `app.component.ts`

```diff
# ....
+import { TrackDirective } from './track.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FirstDirective,
    BasicComponent,
+   TrackDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'directives-lab';
}

```

- Update `app.component.html`

```html
<button [track]="'One Button'">One</button>
<button>Two</button>
<button>Three</button>
```

We can added to the other buttons:

```html
<button [track]="'One Button'">One</button>
<!-- diff -->
<button [track]="'Two Button'">Two</button>
<button [track]="'Three Button'">Three</button>
<!-- diff -->
```

We can create a service to track these buttons:

```bash
ng g s tracking --skip-tests
```

Now we're going to update the service to register the tracking events:

- Update `tracking.service.ts`

```ts
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TrackingService {
  logs: string[] = [];

  log(trackingEvent: string) {
    this.logs.push(trackingEvent);
    console.log(this.logs);
  }
}
```

And now we can inject it into our directive:

- Update `track.directive.ts`

```diff
export class TrackDirective {
  @Input() track!: string;

  @HostListener('click')
  onClick() {
    console.log(this.track);
  }

+ constructor(private trackService: TrackingService) {}
}
```

Once is injected we can start to use it:

- Update `track.directive.ts`

```diff
@HostListener('click')
  onClick() {
-   console.log(this.track);
+   this.trackService.log(
+     JSON.stringify({ event: 'click', message: this.track })
+   );
  }
```

With this directive and service we can track any kind of event:

> Exercise: Try to track mouse over events.

```ts
export class TrackDirective {
  @Input() track!: string;

  @HostListener("click")
  onClick() {
    this.trackService.log(
      JSON.stringify({ event: "click", message: this.track })
    );
  }
  /*diff*/
  @HostListener("mouseover")
  onMouseover() {
    this.trackService.log(
      JSON.stringify({ event: "mouseover", message: this.track })
    );
  }
  /*diff*/
  constructor(private trackService: TrackingService) {}
}
```
