# Combine HostBinding with Services in Angular Directives

We are going to create a directive that checks if a service is offline.

- Update `app.component.ts`

```diff
import { Component } from '@angular/core';
+import { TrackingService } from './tracking.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FirstDirective,
    BasicComponent,
    TrackDirective,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
- title = 'directives-lab';
+
+ constructor(public  tracking: TrackingService) {}
}

```

Update `app.component.html`

```html
<button [track]="'One Button'">One</button>
<button [track]="'Two Button'">Two</button>
<button [track]="'Three Button'">Three</button>
<!-- diff -->
<div *ngFor="let log of tracking.logs">
    {{ log | json }}
</div>
<!-- diff -->
```

```bash
ng g d online --skip-tests
```

- Update `online.directive.ts`

```ts
import { Directive } from '@angular/core';

@Directive({
  selector: '[online]',
  standalone: true
})
export class OnlineDirective {}


```

```bash
ng g s online --skip-tests
```

- Update `online.service.ts`

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OnlineService {
  online = true;
  constructor() {
    setInterval(() => {
      this.online = Math.random() > 0.5;
    }, 1000);
  }
}

```


Now what we have to do is listen to this event inside the directive. 

- Update `online.directive.ts`

```ts
/*diff*/
import { Directive, HostBinding } from '@angular/core';
import { OnlineService } from './online.service';
/*diff*/

@Directive({
  selector: '[online]',
  standalone: true
})
export class OnlineDirective {
  /*diff*/
  @HostBinding('disabled') get disabled() {
    return this.online.online;
  }

  constructor(private online: OnlineService) {}
  /*diff*/
}
```

Now to see this in action, we have to use the new directive.

- Update `app.component.ts`

```diff
# ....
+import { OnlineDirective } from './online.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FirstDirective,
    BasicComponent,
    TrackDirective,
+   OnlineDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
```

- Update `app.component.html`

```diff
-<button [track]="'One Button'">One</button>
+<button online [track]="'One Button'">One</button>
<button [track]="'Two Button'">Two</button>
<button [track]="'Three Button'">Three</button>

<div *ngFor="let log of tracking.logs">
    {{ log | json }}
</div>
```

```bash
npm start
```

Now we can see how the button gets disbaled. We can also add an style.

- Update `styles.css`

```css
.offline {
    color: red;
}

```

- Update `online.directive.ts`

```ts
import { Directive, HostBinding } from '@angular/core';
import { OnlineService } from './online.service';

@Directive({
  selector: '[online]',
})
export class OnlineDirective {
  @HostBinding('disabled') get disabled() {
    return this.online.online;
  }
  /*diff*/
  @HostBinding('class.offline') get offline() {
    return this.online.online;
  }
  /*diff*/
  constructor(private online: OnlineService) {}
}

```
