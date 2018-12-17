## We want a better organization of our routes

* For that purpose we're going to group our routes such that the other pet routes are children of the pets route.

* Right now our routes look like this:

```typescript
const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'pets',
    component: PetsComponent,
    children: [
      { path: ':id', component: PetComponent },
      { path: ':id/toys', component: PetsToysComponent },
      {
        path: ':id/edit',
        component: PetEditComponent,
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: PetInfoComponent },
          { path: 'toys', component: PetInfoToysComponent },
        ],
      },
    ]
  },
  { path: '**', component: PageNotFoundComponent }
]

```
* Since child routes extend the path of the parent route, we specify relative paths making our paths shorter and more durable as paths change over time.

* But this not work as we are expecting.

* If we try the application now we will find out that the products children routes are not working, if we try the edit button we wiil found out an error: `Cannot read property 'component' of null`.

* Remind how child routes work? We need a `router-outlet` to display the components, here we don't have that `router-outlet` in the parent component pet list component.

* routes works with herarchies, if the herarchy is right it will now in which outlet has to inject the component.
