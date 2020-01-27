* Create an angular app as follows

```bash
ng new sneakers --routing --style scss
```

* Start from an existing application.

* Angular-cli can set a poject as universal.

```bash
ng g universal --clientProject sneakers
```

* In `angular.json` we have a new entry call server:

```json
{
  ....
  "server": {
    "builder": "@angular-devkit/build-angular:server",
    "options": {
      "outputPath": "dist/sneakers-server",
      "main": "src/main.server.ts",
      "tsConfig": "src/tsconfig.server.json"
    }
  }
  ....
}
```

* We have to modify this entry with production configurtaions

```diff angular.json
"server": {
          "builder": "@angular-devkit/build-angular:server",
          "options": {
            "outputPath": "dist/sneakers-server",
            "main": "src/main.server.ts",
            "tsConfig": "src/tsconfig.server.json"
          },
+          "configurations": {
+            "production": {
+              "fileReplacements": [
+                {
+                  "replace": "src/environments/environment.ts",
+                  "with": "src/environments/environment.prod.ts"
+                }
+              ]
+            }
+          }
        }
```

* The tsconfig.server.json

```json
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {
    "outDir": "../out-tsc/app-server",
    "baseUrl": ".",
    "module": "commonjs"
  },
  "angularCompilerOptions": {
    "entryModule": "app/app.server.module#AppServerModule"
  }
}

```

* The module resolution points to commonjs the node way.
* `angularCompilerOptions` this points to a new server module.
* We can navigate to `main.server.ts`. 

```typescript main.server.ts
import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from './app/app.server.module';

```
* It is bootstrapping app from server module.
* This is a good place to import `zone.js/dist/zone-node`.

```diff main.server.ts
import { enableProdMode } from '@angular/core';
+import 'zone.js/dist/zone-node';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from './app/app.server.module';

```

* The `AppServerModule` is a simple module that imports the `AppModule` and `ServerModule`, and bootstraps `AppComponent`.

```typescript
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}

```

* Because we're using lazy loading we have to install: `@nguniversal/module-map-ngfactory-loader`, and then we're going to use node, to server our app.

```bash
npm i @nguniversal/module-map-ngfactory-loader @nguniversal/express-engine -S
```

* Once installed we have to moduify `app.server.module.ts`

```diff
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
+import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
+   ModuleMapLoaderModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}

```

* In `package.json` we can create a new entry to run production.

```diff
...
"scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
+   "build:prod": "ng build sneakers --prod && ng run sneakers:server:production",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
...
```

* ng universal requires a web server so lets implement that with node and express.
* Run the following command against bash, we will need the binaries later on server.

```bash
ng run sneakers:server
```

* Create a new file `server.ts` 

```bash
touch server.ts
```

```typescript server.ts
import * as express from 'express';
import { join } from 'path';

import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

const PORT = process.env.PORT || 8080;
const staticRoot = join(process.cwd(), 'dist', 'sneakers');
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/sneakers-server/main');

const app = express();

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', staticRoot);

app.get('*.*', express.static(staticRoot));
app.get('*', (req, res) => res.render('index', { req }));

app.listen(PORT, () => console.log(`Listen on http://localhost:${PORT}`));

```
* Lets create new entries in our `package.json` so we can run code in our local environament.

```diff
"scripts": {
    "ng": "ng",
    "start": "ng serve",
+   "start:server": "ts-node ./server",
    "build": "ng build",
    "build:prod": "ng build sneakers --prod && ng run sneakers:server:production",
+   "build:local": "ng build sneakers && ng run sneakers:server",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
```
* Now it's time to run our server and check that application works.
* In local mode start before the `sneakers-api` before. 

* To improve social media crawlers lets define a service that will define some tags so twitter can create a good looking card of our application

```bash
ng g s ui/services/ui 
```

```typescript
import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private appColor = '#343a40';
  private appImage = 'logo'; //TODO: Save log in assets
  private appTitle = 'Sneakers';
  private appDescription = 'Online sneakers';

  constructor(private meta: Meta, private title: Title) { }

  setMetaData(config) {
    const description = config.description || this.appDescription;
    const image = config.image || this.appImage;
    const title = config.title ? `${config.title} - ${this.appTitle}` : this.appTitle;

    this.title.setTitle(title);

    const tags = [
      { name: 'description', content: description },
      { name: 'theme-color', content: this.appColor },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:image', content: image },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'apple-mobile-web-app-title', content: title },
      { name: 'apple-touch-startup-image', content: image },
      { poperty: 'og:title', content: title},
      { poperty: 'og:description', content: description},
      { poperty: 'og:image', content: image},
    ];

    tags.forEach(tag => this.meta.updateTag(tag));
  }
}

```
* In order to use this meta tag services lets edit `product-list.component.ts`

```typescript containers/product-list.component
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
// import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators'; // diff
import { UiService } from '../../../ui/services/ui.service';

@Component({
  selector: 'app-product-list',
  template: `
    <app-products [products]="products"></app-products>
  `,
  styles: []
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private route: ActivatedRoute,
    private uiService: UiService // diff
  ) { }

  ngOnInit() {
    // this.service.getProducts()
    //   .subscribe(res => this.products = res);
    this.route.data.pipe(
      map(data => data['products']),
      tap(products => this.metaData(products))
    ).subscribe(
      (res) => this.products = res
    )
  }
  // diff
  metaData(products: Product[]) {
    this.uiService.setMetaData({
      title: 'Products',
      description: 'Check out our sneakers'
    })
  }

}

```
* We can check now that the meta tags are added to our page.

