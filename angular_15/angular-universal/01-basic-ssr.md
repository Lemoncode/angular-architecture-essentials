# Basic SSR

In this demo we're going to update an Angular client rendered application into a server side rendered application

## Steps

### 1. Adding SSR support

To add support for SSR we need to add a new package.

```bash
cd sneakers
```

```bash
ng add @nguniversal/express-engine
```

We will be asked to proceed with the compatible package installation, after a while, we will see the following input:

```
CREATE src/main.server.ts (60 bytes)
CREATE src/app/app.server.module.ts (318 bytes)
CREATE tsconfig.server.json (272 bytes)
CREATE server.ts (2025 bytes)
UPDATE package.json (1456 bytes)
UPDATE angular.json (4662 bytes)
UPDATE src/app/app.module.ts (574 bytes)
UPDATE src/app/app-routing.module.ts (675 bytes)
✔ Packages installed successfully.
```

Lets review the changes that has introduced.

`src/app/app-routing.module.ts`

```ts
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: "enabledBlocking",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

- [initialNavigation](https://angular.io/api/router/InitialNavigation)

'enabledBlocking' - The initial navigation starts before the root component is created. The bootstrap is blocked until the initial navigation is complete. This value is required for server-side rendering to work.

`csrc/app/app.module.ts`

```ts
imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    UiModule
  ],
```

- `withServerTransition`: Configures a browser-based app to transition from a server-rendered app, if one is present on the page.

`angular.json`

```json
{
  "serve-ssr": {
    "builder": "@nguniversal/builders:ssr-dev-server",
    "configurations": {
      "development": {
        "browserTarget": "sneakers:build:development",
        "serverTarget": "sneakers:server:development"
      },
      "production": {
        "browserTarget": "sneakers:build:production",
        "serverTarget": "sneakers:server:production"
      }
    },
    "defaultConfiguration": "development"
  },
  "prerender": {
    "builder": "@nguniversal/builders:prerender",
    "options": {
      "routes": ["/"]
    },
    "configurations": {
      "production": {
        "browserTarget": "sneakers:build:production",
        "serverTarget": "sneakers:server:production"
      },
      "development": {
        "browserTarget": "sneakers:build:development",
        "serverTarget": "sneakers:server:development"
      }
    },
    "defaultConfiguration": "production"
  }
}
```

`package.json`

```json
{
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "dev:ssr": "ng run sneakers:serve-ssr",
    "serve:ssr": "node dist/sneakers/server/main.js",
    "build:ssr": "ng build && ng run sneakers:server",
    "prerender": "ng run sneakers:prerender"
  }
}
```


`server.ts`

- [Universal template engine](https://angular.io/guide/universal#universal-engine)

```ts
import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

import { AppServerModule } from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/sneakers/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
```

`src/main.server.ts`

```ts
export { AppServerModule } from './app/app.server.module';
```

`src/app/app.server.module.ts`

```ts
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

`tsconfig.server.json`

```json
/* To learn more about this file see: https://angular.io/config/tsconfig. */
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {
    "outDir": "./out-tsc/server",
    "types": [
      "node"
    ]
  },
  "files": [
    "src/main.server.ts",
    "server.ts"
  ]
}
```

### 2. Start the server

In order to have data recall to start the data API server

```bash
# From sneakers-api
npm start
```

```bash
npm run dev:ssr
```