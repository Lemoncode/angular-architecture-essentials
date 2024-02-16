# PersonDirectory

## Avoid Multiple Service Instances Lazy Module

- We start with a simple app where people and employees modules are registered in main module (eagerly loaded).

- _employees_ module is a routed module.

- people module exposes people service, this service will be register into the root injector, because is eagerly loaded.

- If we register a new item in home we will see reflected in employees route because there is only one instance of the service.

- Now lets change this so the employees module became a lazy module.

- Modify `employees-routing.module.ts`

**src/app/employees/employees-routing.module.ts**

```diff employees-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees.component';

const routes: Routes = [
  {
-   path: 'employees',
+   path: '',
    component: EmployeesComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class EmployeesRoutingModule { }

```

- Modify as well `app-routing.module.ts`, including a new route.

**src/app/app-routing.module.ts**

```diff
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
+ {
+   path: 'employees',
+   loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
+ }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

- When we end with this we have to remove from `app.module.ts` the lazy loaded module

**src/app/app.module.ts**

```diff app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { AppRoutingModule } from './app-routing.module';
import { PeopleModule } from './people/people.module';
-import { EmployeesModule } from './employees/employees.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PeopleModule,
-   EmployeesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

> Run the application and add a new employee on `Home` and then navigate to `Employees`

- What will happen now if we include a new item? If we introduce a new item in **home** page (eager region loaded), we can check out that now is not reflected in the lazy loaded module.

- The reason for this behavior is that lazy loaded modules, has its own injector.
- The main module has register as well the service.
- So now what we got is this service registered twice. One living in employees module injector and the other one living in the app module injector.

- Lets have a look now over people module, if this is a module intend to be shared across our application, including lazy loaded modules, what we can implement it's what is call `forRoot pattern`.

**src/app/people/people.module.ts**

```diff people.module.ts
-import { NgModule } from '@angular/core';
+import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleListComponent } from './people-list.component';
import { PeopleService } from './people.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PeopleListComponent],
  exports: [PeopleListComponent],
- providers: [PeopleService]
})
export class PeopleModule {
+  static forRoot(): ModuleWithProviders<any> {
+    return {
+      ngModule: PeopleModule,
+      providers: [PeopleService]
+    }
+  }
}

```

- We are exposing this way our providers, making that will be just one instance per application.
- Now we have to invoke forRoot when registering this module, this way will expose the object provided by `forRoot` making the service globally.

**src/app/app.module.ts**

```diff app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { AppRoutingModule } from './app-routing.module';
import { PeopleModule } from './people/people.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
-   PeopleModule,
+   PeopleModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

- employees module, can still importing people module, since it's not invoking in its registretion the method `forRoot`, it's going to use the global instance of service.

- We can run the application now and check that only one instance is running.
