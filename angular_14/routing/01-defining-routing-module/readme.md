# Defining a route module

In this demo we're going to define a route module that will host our routes. We will start this demo from `pets-start project`.

## Steps

### Step 1. Create a new app router module.

```bash
ng g m app-routing --flat
```

A new file __pets-end/src/app/app-routing.module.ts__ is created. We will remove from here Common Module, since we're not going to use it.

```diff
import { NgModule } from '@angular/core';
-import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
-   CommonModule
  ]
})
export class AppRoutingModule { }

```

### Step 2. Remove routes from app module file

Edit as follows __pets-end/src/app/app.module.ts__

```diff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
-import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { PetsComponent } from './pets.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    PetsComponent
  ],
  imports: [
    BrowserModule,
-   RouterModule.forRoot([
-     { path: 'welcome', component: WelcomeComponent },
-     { path: '', redirectTo: 'welcome', pathMatch: 'full' },
-     { path: 'pets', component: PetsComponent },
-     { path: '**', component: PageNotFoundComponent }
-   ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Notice that we have removed the router module import. This import will be re exported from routing module.

### Step 3. Now we're going to move the routes to our app routing module.

Edit as follows __pets-end/src/app/app-routing.module.ts__

```ts
import { NgModule } from '@angular/core';
/*diff*/
import { RouterModule, Routes } from '@angular/router';


import { WelcomeComponent } from './welcome.component';
import { PetsComponent } from './pets.component';
import { PageNotFoundComponent } from './page-not-found.component';
/*diff*/

/*diff*/
const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'pets', component: PetsComponent },
  { path: '**', component: PageNotFoundComponent }
];
/*diff*/

@NgModule({
  declarations: [],
  imports: [
  ],
})
export class AppRoutingModule { }

```

### Step 4. Now that we have declare our routes, we're going to configure the app routing module

```diff
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
...

@NgModule({
- declarations: [],
  imports: [
+   RouterModule.forRoot(routes)
  ],
+ exports: [ RouterModule ]
})
export class AppRoutingModule { }

```

Notice we're rexporting _RouterModule_. This way all it's derectives and components can be consumed from the module who imports this one.

For last we update __pets-end/src/app/app.module.ts__

```diff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { WelcomeComponent } from './welcome.component';
import { PetsComponent } from './pets.component';

+import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    PetsComponent
  ],
  imports: [
    BrowserModule,
+   AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```