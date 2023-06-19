# Enable Client Hydration

> NOTE: Chack minimal version 16? 

Hydration is the process that restores the server side rendered application on the client. This includes things like reusing the server rendered DOM structures, persisting the application state, transferring application data that was retrieved already by the server, and other processes. 

To enable `hydration` we need to import the [provideClientHydration](https://angular.io/api/platform-browser/provideClientHydration) into root module providers.

- Update `src/app/app.module.ts`

```ts
import {provideClientHydration} from '@angular/platform-browser';
// ...

@NgModule({
  // ...
  providers: [ provideClientHydration() ],  // add this line
  bootstrap: [ AppComponent ]
})
export class AppModule {
  // ...
}
```