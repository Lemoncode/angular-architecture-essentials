# Dynamic component loader

The [NgComponentOutlet]() directive can be used to instantiate components and insert them into the current view. This directive allows you to provide a component class that should be rendered, as well as component inputs to be used during initialization.

```bash
ng new app
```

```bash
cd app
```

```bash
ng g c person-profile --skip-tests --inline-style
```

Update `src/app/person-profile/person-profile.component.ts`

```ts
import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-person-profile",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./person-profile.component.html",
  styles: ``,
})
export class PersonProfileComponent {
  @Input() name!: string;
  @Input() bio!: string;
}
```

Update `src/app/person-profile/person-profile.component.html`

```html
<div>
  <h3>Featured Person Profile</h3>
  <h4>{{ name }}</h4>
  <p>{{ bio }}</p>
  <strong>Date this person today!</strong>
</div>
```

```bash
ng g c person-date-ad --skip-tests --inline-style
```

Update `src/app/person-date-ad/person-date-ad.component.ts`

```ts
import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-person-date-ad",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./person-date-ad.component.html",
  styles: ``,
})
export class PersonDateAdComponent {
  @Input() headline!: string;
  @Input() body!: string;
}
```

Update `src/app/person-date-ad/person-date-ad.component.html`

```html
<div>
  <h4>{{ headline }}</h4>
  {{ body }}
</div>
```

We create now a service that will return a set of components and properties.

```bash
ng g s ad --skip-tests
```

Update `src/app/ad.service.ts`

```ts
import { Injectable, Type } from "@angular/core";
import { PersonProfileComponent } from "./person-profile/person-profile.component";
import { PersonDateAdComponent } from "./person-date-ad/person-date-ad.component";

@Injectable({
  providedIn: "root",
})
export class AdService {
  getAds() {
    return [
      {
        component: PersonProfileComponent,
        inputs: { name: "Jane", bio: "Smart as they come" },
      },
      {
        component: PersonProfileComponent,
        inputs: { name: "Joe", bio: "Very nice dude" },
      },
      {
        component: PersonDateAdComponent,
        inputs: {
          headline: "Date and relax!",
          body: "Submit your resume today!",
        },
      },
      {
        component: PersonDateAdComponent,
        inputs: {
          headline: "All kind of plans",
          body: "Apply today",
        },
      },
    ] as { component: Type<any>; inputs: Record<string, unknown> }[];
  }
}
```

Now we are ready to add the dynamic component.

```bash
ng g c ad-banner --skip-tests --inline-style
```

Update `src/app/ad-banner/ad-banner.component.html`

```html
<div>
  <h3>Advertisements</h3>
  <ng-container
    *ngComponentOutlet="currentAd.component; inputs: currentAd.inputs"
  />
  <button (click)="displayNextAd()">Next</button>
</div>
```

Update `src/app/ad-banner/ad-banner.component.ts`

```ts
import { Component, inject } from "@angular/core";
import { AdService } from "../ad.service";
import { NgComponentOutlet } from "@angular/common";

@Component({
  selector: "app-ad-banner",
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: "./ad-banner.component.html",
  styles: ``,
})
export class AdBannerComponent {
  private adList = inject(AdService).getAds();

  private currentAdIndex = 0;

  get currentAd() {
    return this.adList[this.currentAdIndex];
  }

  displayNextAd() {
    this.currentAdIndex++;
    // Reset the current ad index back to `0` when we reach the end of an array.
    if (this.currentAdIndex === this.adList.length) {
      this.currentAdIndex = 0;
    }
  }
}
```

Update `src/styles.css`

```css
/* Global Styles */
* {
  font-family: Arial, Helvetica, sans-serif;
}
h1 {
  color: #264d73;
  font-size: 2.5rem;
}
h2,
h3 {
  color: #444;
  font-weight: lighter;
}
h3 {
  font-size: 1.3rem;
}
body {
  padding: 0.5rem;
  max-width: 1000px;
  margin: auto;
}
@media (min-width: 600px) {
  body {
    padding: 2rem;
  }
}
body,
input[text] {
  color: #333;
  font-family: Cambria, Georgia, serif;
}
a {
  cursor: pointer;
}
button {
  background-color: #eee;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: black;
  font-size: 1.2rem;
  padding: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
button:hover {
  background-color: black;
  color: white;
}
button:disabled {
  background-color: #eee;
  color: #aaa;
  cursor: auto;
}

/* Navigation link styles */
nav a {
  padding: 5px 10px;
  text-decoration: none;
  margin-right: 10px;
  margin-top: 10px;
  display: inline-block;
  background-color: #e8e8e8;
  color: #3d3d3d;
  border-radius: 4px;
}

nav a:hover {
  color: white;
  background-color: #42545c;
}
nav a.active {
  background-color: black;
  color: white;
}
hr {
  margin: 1.5rem 0;
}
input[type="text"] {
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem;
}

```

Update `src/app/app.component.ts`

```diff
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
+import { AdBannerComponent } from './ad-banner/ad-banner.component';

@Component({
  selector: 'app-root',
  standalone: true,
- imports: [CommonModule],
+ imports: [CommonModule, AdBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
```

Update `src/app/app.component.html`

```html
<app-ad-banner></app-ad-banner>
```

```bash
npm start
```