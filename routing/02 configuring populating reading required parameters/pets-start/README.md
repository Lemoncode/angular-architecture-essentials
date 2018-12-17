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
