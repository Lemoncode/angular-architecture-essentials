## In this demo we're going to configure populate and read required parameters.

* We have made a refactor, we have created a feature module `pets.module`.
* We have created this routes, that consumes required paramters:

```typescript
{ path: 'pets/:id', component: PetComponent },
{ path: 'pets/:id/toys', component: PetsToysComponent },
```
* We navigate to `PetComponent` from `PetsComponent`

```html
<a [routerLink]="['/pets', pet.name]">{{ pet.name }}</a>
```

* We use `gOnInit` to get data populated in this component __PetComponent__:

```typescript
ngOnInit() {
  const petName = this.route.snapshot.paramMap.get('id');
  const { name, espicy } = this.petsService.fetchPetByName(petName);
  this.pet  = { name, espicy };
}
```

* From this component we can navigate to __PetsToysComponent__ using:

```html
<a [routerLink]="['/pets', pet.name, 'toys']">Visit my toys</a>
```

* Now in __PetsToysComponent__ we fetch data this way: 

```typescript
ngOnInit() {
  this.pets = this.petsService.fetchPets()
    .map((p) => p.name);
  this.selectedPet = this.route.snapshot.paramMap.get('id');
  this.toys = this.petsService.fetcPetToys(this.selectedPet);
}
```

* What we want is to use the button on each pet to `navigate` to other pet's toys.
* Bear on mind that this implies don't change the displayed component by the outlet.  

```diff pets-toys.component.ts
import { Component, OnInit } from '@angular/core';
import { PetsService } from './pets.service';
+import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pets-toys',
  template: `
    <div
    style="display: flex; justify-content: space-between"
    *ngFor="let pet of pets">
      <p>
        {{pet}}
      </p>
      <button style="height: 20px;" (click)="showToys(pet)">Select Pet</button>
    </div>

    <hr>
    <h2>{{selectedPet}}</h2>
    <app-pet-toys [toys]="toys"></app-pet-toys>
  `,
  styles: []
})
export class PetsToysComponent implements OnInit {
  toys;
  pets: string[];
  selectedPet: string;

  constructor(
    private petsService: PetsService,
    private route: ActivatedRoute,
+   private router: Router
  ) { }
+
+  showToys(pet: string): void {
+    this.router.navigate(['/pets', pet, 'toys'])
+      .then(
+        (res) => console.log('you get to your destiny', res)
+      );
+  }
+
  ngOnInit() {
    this.pets = this.petsService.fetchPets()
      .map((p) => p.name);
    this.selectedPet = this.route.snapshot.paramMap.get('id');
    this.toys = this.petsService.fetcPetToys(this.selectedPet);
  }

}

```

* We can wath the url changes, but our component still displaying the same data. What is going on here?

* What is happening is that we're consuming the snapshot. The snapshot it's just one time get it in `ngOnInit`.

* Lets change the approach and use `Observables`

```diff pets-toys.component.ts
ngOnInit() {
    this.pets = this.petsService.fetchPets()
      .map((p) => p.name);
-   this.selectedPet = this.route.snapshot.paramMap.get('id');
-   this.toys = this.petsService.fetcPetToys(this.selectedPet);
+    this.route.params.subscribe((params) => {
+      const { id } = params;
+      this.selectedPet = this.petsService.fetchPetByName(id).name;
+      this.toys = this.petsService.fetcPetToys(this.selectedPet);
+    })
  }
```
* Now our data is completely sync.
